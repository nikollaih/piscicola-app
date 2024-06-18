import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import { Layout } from "../../Layout";
import { useState, useEffect } from "react";
import { FormButtons } from "../../../components/button/formButtons";
import actuatorStructure from "../../../json/formsStructure/actuatorStructure";
import { Breadcrumb } from "../../../components/breadcrumb/Breadcrumb";
import FormInputs from "../../../json/forms/Actuator";
import Style from "../style";
import {
    Constants,
    UtilServices,
    Texts,
    Utilities,
    LocalStorage,
} from "../../../util";
import { CustomForm } from "../../../components/form/customForm";
import { useForm } from "../../../hooks/useForm";
import { useAuth } from "../../../hooks/useAuth";
import { ActuatorsServices } from "../../../services";
import { showMessage } from "react-native-flash-message";

export const AddActuator = (props) => {
    const actuator = props.route.params?.actuator;
    const { getAuth, refreshToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { dataForm, isValidated, setDataForm, setCheckRequired } = useForm();

    const breadcrumb = {
        title: `${actuator ? "Modificar" : "Nuevo"} Actuador`,
        subtitle: "Actuadores",
    };

    useEffect(() => {
        setInitialData(actuator);
    }, []);

    /**
     * It sets the initial data for the form.
     */
    const setInitialData = async (actuator) => {
        const loggedUser = await getAuth();
        let response = await ActuatorsServices.getFormData(loggedUser.token);
        let jsonResponse = await response.json();

        FormInputs["structure"] = actuator?.id ? {
            id: actuator?.id,
            name: actuator?.name,
            actuator_type_id: actuator?.actuator_type_id,
            pond_id: actuator?.pond_id,
            description: actuator?.description,
            mqtt_id: actuator?.mqtt_id,
            cost_by_minute: actuator?.cost_by_minute
        } : actuatorStructure;

        FormInputs["fields"]["pond_id"]["items"] = jsonResponse.payload.ponds.data;
        FormInputs["fields"]["actuator_type_id"]["items"] = jsonResponse.payload.actuatorTypes;


        setSaving(false);
        setCheckRequired({ [FormInputs.form_name]: false });
        setDataForm({ [FormInputs.form_name]: FormInputs });
        setLoading(false);
    };


    /**
     * If the form is not saving, then set the checkrequired state to true, and if the form is validated,
     * then set the saving state to true and save the form
     */
    const checkForm = () => {
        if (!saving) {
            setCheckRequired({ [FormInputs.form_name]: true });
            if (isValidated([FormInputs.form_name])) {
                setSaving(true);
                saveForm();
            }
        }
    };

    const saveForm = async () => {
        try {
            let loggedUser = await getAuth();
            let sendDataForm = dataForm[FormInputs.form_name].structure;
            let response = await ActuatorsServices.create(
                loggedUser.token,
                sendDataForm
            );
            let jsonResponse = await response.json();

            if (response.status === 200) {
                onSuccessSave();
            } else {
                if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
                    await refreshToken({ force: true, navigation: props.navigation });
                    saveForm();
                } else Utilities.showErrorFecth(jsonResponse);
                setSaving(false);
            }
        } catch (error) {
            Utilities.showAlert({});
            setSaving(false);
        }
    };

    const onSuccessSave = () => {
        let actuatorID = dataForm[FormInputs.form_name]?.structure?.id;
        setSaving(false);
        LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "actuators");

        showMessage({
            message: Texts.success.title,
            description: actuatorID
                ? Texts.success.actuator.update
                : Texts.success.actuator.create,
            duration: 3000,
            type: "success",
        });

        setCheckRequired({ [FormInputs.form_name]: false });
        if (!actuatorID) setDataForm({ [FormInputs.form_name]: FormInputs });
    };

    return (
        <Layout navigation={props.navigation} route={props.route}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    style={Style.scrollview}
                >
                    <View style={Style.main_page}>
                        <Breadcrumb navigation={props.navigation} data={breadcrumb} />
                        <View style={Style.white_container}>
                            {!loading && dataForm[FormInputs.form_name] ? (
                                <CustomForm formName={FormInputs.form_name} />
                            ) : null}
                        </View>
                        <FormButtons
                            navigation={props.navigation}
                            saving={saving}
                            onSave={() => {
                                checkForm();
                            }}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Layout>
    );
};
