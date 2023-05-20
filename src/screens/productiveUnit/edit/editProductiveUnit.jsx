import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Layout } from "../../Layout";
import { useState, useEffect } from "react";
import { FillIconButton } from "../../../components/button/fillIconButton";
import FormInputs from "../../../json/forms/editProductiveUnit";
import productiveUnitStructure from "../../../json/formsStructure/productiveUnit";
import { useAuth } from "../../../hooks/useAuth";
import Style from "./style";
import { Constants, LocalStorage, Texts, Utilities } from "../../../util";
import { CustomForm } from "../../../components/form/customForm";
import { useForm } from "../../../hooks/useForm";
import { ProductiveUnitsServices } from "../../../services";
import { showMessage } from "react-native-flash-message";

export const EditProductiveUnit = (props) => {
  const productiveUnit = props.route.params?.productive_unit;
  const { getAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { dataForm, isValidated, setDataForm, setCheckrequired } = useForm();

  useEffect(() => {
    setInitialData(productiveUnit);
  }, []);

  /**
   * It sets the initial data for the form.
   */
  const setInitialData = async (productiveUnit) => {
    let loggeduser = await getAuth();
    let managers = await Utilities.getUsersByType(loggeduser.token, 2);
    FormInputs["fields"]["manager_id"]["items"] = managers.data;
    FormInputs["structure"] = productiveUnit
      ? productiveUnit
      : productiveUnitStructure;
    setSaving(false);
    setCheckrequired({ [FormInputs.form_name]: false });
    setDataForm({ [FormInputs.form_name]: FormInputs });
    setLoading(false);
  };

  /**
   * If the form is not saving, then set the checkrequired state to true, and if the form is validated,
   * then set the saving state to true and save the form
   */
  const checkForm = () => {
    if (!saving) {
      setCheckrequired({ [FormInputs.form_name]: true });
      if (isValidated(FormInputs.form_name)) {
        setCheckrequired({ [FormInputs.form_name]: false });
        setSaving(true);
        saveForm();
      }
    }
  };

  const saveForm = async () => {
    try {
      let loggeduser = await getAuth();
      let sendDataForm = {
        ...dataForm[FormInputs.form_name].structure
      };

      // Create new productive unit
      let response = await ProductiveUnitsServices.create(
        loggeduser.token,
        sendDataForm
      );

      if (response.status == 200) {
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
    let pruductiveUnitID = dataForm[FormInputs.form_name]?.structure?.id;
    setSaving(false);
    LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "home");
    showMessage({
      message: Texts.success.title,
      description: pruductiveUnitID
        ? Texts.success.porductive_unit.update
        : Texts.success.porductive_unit.create,
      duration: 3000,
      type: "success",
    });

    if (!pruductiveUnitID) setDataForm({ [FormInputs.form_name]: FormInputs });
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
                    title="Cancelar"
                    icon="ios-arrow-back"
                    fill={Constants.COLORS.GRAY}
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
