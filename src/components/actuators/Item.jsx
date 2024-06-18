import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Switch, Alert
} from "react-native";
import { ActuatorDetails } from "./Details";
import { useState } from "react";
import { Constants } from "../../util";
import { CustomModal } from "../customModal/customModal";
import Theme from "../../theme/theme";
import moment from "moment";
import {act} from "react-test-renderer";
const { height } = Dimensions.get("window");

export const ActuatorItem = ({ navigation, actuator, onDelete = () => {}, onChangeState = (state) => {} }) => {
    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);

    const onRemove = () => {
        setShowModal(false);
        onDelete()
    }

    const changeState = () => {
        let stateText = (open) ? "apagar" : "encender";
        Alert.alert(
            "¿Está seguro?",
            "Desea " + stateText + " el actuador",
            [
                {
                    text: "Cancelar",
                    onPress: () => {},
                    style: "cancel",
                },
                {
                    text: "Si, continuar",
                    onPress: async () => {
                        let newOpen = (!open);
                        setOpen(newOpen);
                        onChangeState(newOpen);
                    },
                },
            ],
            { cancelable: true }
        );
    }

    return (
        <TouchableOpacity
            activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
            style={Style.container}
            onPress={() => {
                setShowModal(true);
            }}
        >
            <View>
                <View style={[Style.inside, Style.row_between]}>
                    <View>
                        <Text style={Style.text_name}>{actuator.name}</Text>
                        <Text style={Style.text_actuator}>{actuator.pond.name}</Text>
                        <Text style={Style.text_actuator}>MQTT ID: {actuator.mqtt_id}</Text>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text style={[Style.text_actuator, {marginBottom: 5}]}>{(open) ? 'Encendido' : 'Apagado'}</Text>
                        <Switch value={open} onChange={() => { changeState() }} />
                    </View>

                </View>
            </View>
            <CustomModal
                height={height - 500}
                title={actuator.name}
                showModal={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
            >
                <ActuatorDetails
                    onClose={() => setShowModal(false)}
                    onDelete={() => onRemove()}
                    navigation={navigation}
                    actuator={actuator}
                />
            </CustomModal>
        </TouchableOpacity>
    );
};

const Style = StyleSheet.create({
    ...Theme,
    container: {
        marginBottom: 10,
    },
    text_actuator: {
        color: Constants.COLORS.DARK,
        fontSize: 14,
        fontFamily: "RobotoCondensed-Regular",
    },
    text_name: {
        color: Constants.COLORS.DARK,
        fontFamily: "RobotoCondensed-Bold",
        fontSize: 17,
    },
    inside: {
        ...Theme.row,
        backgroundColor: Constants.COLORS.WHITE,
        borderRadius: 20,
        padding: 15,
    },
    product_title: {
        color: Constants.COLORS.DARK,
        marginTop: 5,
        fontFamily: "RobotoCondensed-Regular",
    },
    fish: {
        width: 70,
        height: 70,
    },
    container_image: {
        backgroundColor: Constants.COLORS.WHITE,
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        marginRight: 20,
    },
});
