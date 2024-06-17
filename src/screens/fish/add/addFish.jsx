import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { Layout } from "../../Layout";
import { useState, useEffect } from "react";
import { FillIconButton } from "../../../components/button/fillIconButton";
import FormInputs from "../../../json/forms/Fish";
import fishStructure from "../../../json/formsStructure/fishStructure";
import { useAuth } from "../../../hooks/useAuth";
import Style from "../style";
import { Constants, LocalStorage, Texts, UtilServices } from "../../../util";
import { CustomForm } from "../../../components/form/customForm";
import { useForm } from "../../../hooks/useForm";
import { FishServices } from "../../../services";
import { showMessage } from "react-native-flash-message";
import { Breadcrumb } from "../../../components/breadcrumb/Breadcrumb";

export const AddFish = (props) => {
  const { getAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { dataForm, isValidated, setDataForm, setCheckRequired } = useForm();
  const fish = props.route.params?.fish;
  const breadcrumb = {
    title: "Producto",
    subtitle: fish?.id ? "Modificar" : "Agregar",
    right_content: null,
  };

  useEffect(() => {
    setInitialData();
  }, []);

  /**
   * It sets the initial data for the form.
   */
  const setInitialData = async () => {
    const loggedUser = await getAuth();
    const productTypes = await UtilServices.getProductType(loggedUser.token);
    const productiveUnits = await UtilServices.getProductiveUnit(
      loggedUser.token
    );

    FormInputs["structure"] = fish
      ? getFishStructureUpdate(fish)
      : fishStructure;
    FormInputs["fields"]["fish_id"]["items"] = productTypes.data;
    FormInputs["fields"]["productive_unit_id"]["items"] = productiveUnits.data;
    setSaving(false);
    setCheckRequired({ [FormInputs.form_name]: false });
    setDataForm({ [FormInputs.form_name]: FormInputs });
    setLoading(false);
  };

  const getFishStructureUpdate = (fish) => {
    return {
      id: fish?.id,
      fish_id: fish.fish.id,
      productive_unit_id: (fish?.productive_unit_id) ? fish.productive_unit_id : fish.productive_unit.id,
      name: fish.name,
      description: fish.description,
    };
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
        ...dataForm[FormInputs.form_name].structure,
      };

      // Create new productive unit
      let response = await FishServices.create(loggedUser.token, sendDataForm);
      let jsonResponse = await response.json();
      if (response.status == 200) {
        onSuccessSave();
      } else {
        Utilities.showErrorFecth(jsonResponse);
        setSaving(false);
      }
    } catch (error) {
      showErrorMessage();
      setSaving(false);
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
    let fishID = dataForm[FormInputs.form_name]?.structure?.id;
    setSaving(false);
    LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "fish");
    showMessage({
      message: Texts.success.title,
      description: fishID
        ? Texts.success.fish.update
        : Texts.success.fish.create,
      duration: 3000,
      type: "success",
    });

    if (!fishID) setDataForm({ [FormInputs.form_name]: FormInputs });
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={Style.main_page}>
          <ScrollView
            keyboardShouldPersistTaps="always"
            style={Style.scrollview}
          >
            <Breadcrumb navigation={props.navigation} data={breadcrumb} />
            {loading ? (
              <ActivityIndicator color={Constants.COLORS.PRIMARY} />
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
