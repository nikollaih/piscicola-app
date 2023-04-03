import React, { Component } from 'react'
import { Dimensions, Modal } from 'react-native'
import PropTypes from 'prop-types'
import { View, initializeRegistryWithDefinitions } from 'react-native-animatable'
import * as ANIMATION_DEFINITIONS from './Animation'

import styles from './style'

initializeRegistryWithDefinitions(ANIMATION_DEFINITIONS)

export default class NativeModal extends Component {
    static propTypes = {
        animationIn: PropTypes.string,
        animationInTiming: PropTypes.number,
        animationOut: PropTypes.string,
        animationOutTiming: PropTypes.number,
        backdropColor: PropTypes.string,
        backdropOpacity: PropTypes.number,
        backdropTransitionInTiming: PropTypes.number,
        backdropTransitionOutTiming: PropTypes.number,
        children: PropTypes.node.isRequired,
        isVisible: PropTypes.bool.isRequired,
        onModalShow: PropTypes.func,
        onModalHide: PropTypes.func,
        hideOnBack: PropTypes.bool,
        onBackButtonPress: PropTypes.func,
        style: PropTypes.any
    }

    static defaultProps = {
        animationIn: 'slideInUp',
        animationInTiming: 300,
        animationOut: 'slideOutDown',
        animationOutTiming: 300,
        backdropColor: 'black',
        backdropOpacity: 0.70,
        backdropTransitionInTiming: 300,
        backdropTransitionOutTiming: 300,
        onModalShow: () => null,
        onModalHide: () => null,
        isVisible: false,
        hideOnBack: true, 
        onBackButtonPress: () => null
    }

    state = {
        isVisible: false,
        deviceWidth: Dimensions.get('window').width,
        deviceHeight: Dimensions.get('window').height
    }

    componentWillReceiveProps (nextProps) {
        if (!this.state.isVisible && nextProps.isVisible) {
            this.setState({ isVisible: true })
        }
    }

    componentWillMount () {
        if (this.props.isVisible) {
            this.setState({ isVisible: true })
        }
    }

    componentDidMount () {
        if (this.state.isVisible) {
            this._open()
        }
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.state.isVisible && !prevState.isVisible) {
            this._open()
        } else if (!this.props.isVisible && prevProps.isVisible) {
            this._close()
        }
    }

    _open = () => {
        this.backdropRef.transitionTo(
            { opacity: this.props.backdropOpacity },
            this.props.backdropTransitionInTiming,
        )
        this.contentRef[this.props.animationIn](this.props.animationInTiming).then(() => {
            this.props.onModalShow()
        })
    }

    _close = async () => {
        this.backdropRef.transitionTo({ opacity: 0 }, this.props.backdropTransitionOutTiming)
        this.contentRef[this.props.animationOut](this.props.animationOutTiming).then(() => {
            this.setState({ isVisible: false })
            this.props.onModalHide()
        })
    }

    _closeOnBack = () => {
        if (this.props.hideOnBack) {
            this._close()
        }
        this.props.onBackButtonPress()
    }

    _handleLayout = () => {
        const deviceWidth = Dimensions.get('window').width
        const deviceHeight = Dimensions.get('window').height
        if (deviceWidth !== this.state.deviceWidth || deviceHeight !== this.state.deviceHeight) {
            this.setState({ deviceWidth, deviceHeight })
        }
    }

    render () {
        const {
            animationIn,
            animationInTiming,
            animationOut,
            animationOutTiming,
            backdropColor,
            backdropOpacity,
            backdropTransitionInTiming,
            backdropTransitionOutTiming,
            children,
            isVisible,
            onModalShow,
            onModalHide,
            style,
            ...otherProps
        } = this.props
        const { deviceWidth, deviceHeight } = this.state

        return (
            <Modal
                onPressOut = { this.props.callBack }
                transparent
                animationType={ 'none' } 
                visible={ this.state.isVisible }
                onRequestClose={ this.props.onBack ? this._closeOnBack : this.props.callBack }
                { ...otherProps }>
                <View
                    onLayout={ this._handleLayout }
                    ref={ ref => (this.backdropRef = ref) }
                    style={ [
                        styles.backdrop,
                        { backgroundColor: backdropColor, width: deviceWidth, height: deviceHeight }
                    ] }/>
                <View
                    ref={ ref => (this.contentRef = ref) }
                    style={ [{ margin: deviceWidth * 0.05 }, styles.content, style] }
                    { ...otherProps }>
                    { children }
                </View>
            </Modal>
        )
    }
}
