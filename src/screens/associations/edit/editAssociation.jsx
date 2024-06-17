import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator, Platform,
} from "react-native";
import { Layout } from "../../Layout";
import { useState, useEffect } from "react";
import { FillIconButton } from "../../../components/button/fillIconButton";
import FormInputs from "../../../json/forms/Association";
import associationStructure from "../../../json/formsStructure/associationStructure";
import { useAuth } from "../../../hooks/useAuth";
import Style from "./style";
import {Constants, LocalStorage, Texts, Utilities} from "../../../util";
import { CustomForm } from "../../../components/form/customForm";
import { useForm } from "../../../hooks/useForm";
import { AssociationsServices } from "../../../services";
import { showMessage } from "react-native-flash-message";

export const EditAssociation = (props) => {
    const association = props.route.params?.association;
    const { getAuth } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { dataForm, isValidated, setDataForm, setCheckRequired } = useForm();

    useEffect(() => {
        setInitialData(association);
    }, []);

    /**
     * It sets the initial data for the form.
     */
    const setInitialData = async (association) => {
        FormInputs["structure"] = association
            ?
                {
                    "id": association.id,
                    "name": association.name,
                    "phone": association.phone,
                    "email": association.email,
                    "mobile_phone": association.mobile_phone,
                    "address": association.address
                }
            : associationStructure;

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
            if (isValidated(FormInputs.form_name)) {
                setCheckRequired({ [FormInputs.form_name]: false });
                setSaving(true);
                saveForm();
            }
        }
    };

    const saveForm = async () => {
        try {
            let loggedUser = await getAuth();
            let sendDataForm = {
                ...dataForm[FormInputs.form_name].structure
            };

            // Create new association
            let response = await AssociationsServices.create(
                loggedUser.token,
                sendDataForm
            );

            if (response.status === 200) {
                onSuccessSave();
            } else {
                showErrorMessage();
            }
        } catch (error) {
            showErrorMessage();
        }
    };

    const showErrorMessage = (description = null) => {
        showMessage({
            message: Texts.error.title,
            description: description ? description : Texts.error.common,
            duration: 3000,
            type: "danger",
        });
        setSaving(false);
    };

    const onSuccessSave = () => {
        let associationID = dataForm[FormInputs.form_name]?.structure?.id;
        setSaving(false);
        LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "home");
        showMessage({
            message: Texts.success.title,
            description: associationID
                ? Texts.success.associations.update
                : Texts.success.associations.create,
            duration: 3000,
            type: "success",
        });

        if (!associationID) setDataForm({ [FormInputs.form_name]: FormInputs });
    };

    return (
        <Layout navigation={props.navigation} route={props.route}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={Style.main_page}>
                    <ScrollView style={Style.scrollview}>
                        <View style={Style.user_container}>
                            <View>
                                <Text style={Style.text_user}>Asociación</Text>
                                <Text style={Style.name_user}>
                                    {dataForm[FormInputs.form_name]?.structure?.id
                                        ? "Modificar"
                                        : "Agregar"}
                                </Text>
                            </View>
                        </View>
                        {loading ? (
                            <ActivityIndicator color={Constants.COLORS.PRIMARY}/>
                        ) : (
                            <View>
                                <View style={Style.white_container}>
                                    <CustomForm formName={FormInputs.form_name} />
                                </View>
                                <View style={Style.buttons_container}>
                                    <FillIconButton
                                        title="Regresar"
                                        icon="ios-arrow-back"
                                        fill={Constants.COLORS.SECONDARY}
                                        style={Style.left_button}
                                        onPress={() => {
                                            props.navigation.goBack();
                                        }}
                                    />
                                    <FillIconButton
                                        title="Guardar"
                                        icon="ios-save"
                                        saving={saving}
                                        style={Style.right_button}
                                        onPress={() => {
                                            checkForm();
                                        }}
                                    />
                                </View>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Layout>
    );
};
