import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Speedometer from './Speedometer';
class ClassBasedSpeedometer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<Speedometer {...this.props}>
        {this.props.children}
      </Speedometer>);
    }
}
const ASpeedometer = Animated.createAnimatedComponent(ClassBasedSpeedometer);
export default function AnimatedSpeedometer({ duration = 300, easing = Easing.out(Easing.ease), preFill = 0, useNativeDriver = false, onFillChange = () => { }, onAnimationComplete = () => { }, value = 0, ...rest }) {
    const fillAnimation = useRef(new Animated.Value(preFill));
    useEffect(() => {
        animate(value);
    }, []);
    useEffect(() => {
        animate(value);
    }, [value]);
    function animate(toVal) {
        const toValue = toVal >= 0 ? toVal : value;
        const anim = Animated.timing(fillAnimation.current, {
            useNativeDriver,
            toValue,
            easing,
            duration,
        });
        anim.start(onAnimationComplete);
        return anim;
    }
    return (<ASpeedometer {...rest} value={fillAnimation.current}/>);
}
