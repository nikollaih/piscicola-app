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
import FormInputs from "../../../json/forms/editProductiveUnit";
import productiveUnitStructure from "../../../json/formsStructure/productiveUnitStructure";
import { useAuth } from "../../../hooks/useAuth";
import Style from "./style";
import { Constants, LocalStorage, Texts, Utilities } from "../../../util";
import { CustomForm } from "../../../components/form/customForm";
import { useForm } from "../../../hooks/useForm";
import { ProductiveUnitsServices } from "../../../services";
import { showMessage } from "react-native-flash-message";

export const EditProductiveUnit = (props) => {
  const productiveUnit = props.route.params?.productive_unit;
  const association = props.route.params?.association;
  const { getAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { dataForm, isValidated, setDataForm, setCheckRequired } = useForm();

  useEffect(() => {
    setInitialData(productiveUnit);
  }, []);

  /**
   * It sets the initial data for the form.
   */
  const setInitialData = async (productiveUnit) => {

    FormInputs["structure"] = productiveUnit
      ? {
          "id": productiveUnit.id,
          "name": productiveUnit.name,
          "phone": productiveUnit.phone,
          "email": productiveUnit.email,
          "mobile_phone": productiveUnit.mobile_phone,
          "address": productiveUnit.address,
          "mqtt_id": productiveUnit.mqtt_id,
        }
      : productiveUnitStructure;
    FormInputs["structure"]["association_id"] = (productiveUnit) ? productiveUnit.association_id : association.id;

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

      // Create new productive unit
      let response = await ProductiveUnitsServices.create(
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
  };

  const onSuccessSave = () => {
    let productiveUnitID = dataForm[FormInputs.form_name]?.structure?.id;
    setSaving(false);
    LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "home");
    showMessage({
      message: Texts.success.title,
      description: productiveUnitID
        ? Texts.success.porductive_unit.update
        : Texts.success.porductive_unit.create,
      duration: 3000,
      type: "success",
    });

    if (!productiveUnitID) setDataForm({ [FormInputs.form_name]: FormInputs });
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
                <Text style={Style.text_user}>Unidad Productiva</Text>
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
                    fill={Constants.COLORS.DARK}
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
