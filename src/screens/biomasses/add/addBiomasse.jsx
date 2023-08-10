import {
  View,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Layout } from "../../Layout";
import { useState, useEffect } from "react";
import { FormButtons } from "../../../components/button/formButtons";
import FormInputs from "../../../json/forms/Biomasse";
import biomasseStructure from "../../../json/formsStructure/biomasseStructure";
import { useAuth } from "../../../hooks/useAuth";
import Style from "../style";
import {
  Constants,
  Texts,
  LocalStorage,
  Utilities,
  UtilServices,
} from "../../../util";
import { CustomForm } from "../../../components/form/customForm";
import { useForm } from "../../../hooks/useForm";
import { BiomassesServices } from "../../../services";
import { showMessage } from "react-native-flash-message";
import { Breadcrumb } from "../../../components/breadcrumb/Breadcrumb";

export const AddBiomasse = (props) => {
  const { getAuth, refreshToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { dataForm, isValidated, setDataForm, setCheckrequired } = useForm();
  const biomasse = props.route.params?.biomasse;
  const sowing = props.route.params?.sowing;

  const breadcrumb = {
    title: "Biomasa",
    subtitle: biomasse?.id ? "Modificar" : "Agregar",
    right_content: null,
  };

  useEffect(() => {
    setInitialData();
  }, []);

  /**
   * It sets the initial data for the form.
   */
  const setInitialData = async () => {
    try {
      const loggedUser = await getAuth();
      const UNIT_TYPES = await UtilServices.getUnitTypes(loggedUser, {
        type: "peso",
      });
      console.log(UNIT_TYPES);
      FormInputs["structure"] = biomasse ? biomasse : biomasseStructure;
      FormInputs["structure"]["productive_unit_id"] =
        loggedUser.productive_unit.id;
        FormInputs["structure"]["sowing_id"] =
        sowing.id;
      FormInputs["fields"]["unit_type_id"]["items"] = UNIT_TYPES;

      setSaving(false);
      setCheckrequired({ [FormInputs.form_name]: false });
      setDataForm({ [FormInputs.form_name]: FormInputs });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
      let sendDataForm = dataForm[FormInputs.form_name].structure;
      let response = await BiomassesServices.create(
        loggeduser.token,
        sendDataForm
      );
      let jsonResponse = await response.json();
        console.log(jsonResponse)
      if (response.status == 200) {
        onSuccessSave();
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken({ force: true, navigation: props.navigation });
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
    let biomasseID = dataForm[FormInputs.form_name]?.structure?.id;
    setSaving(false);
    LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "biomasses");
    showMessage({
      message: Texts.success.title,
      description: biomasseID
        ? Texts.success.biomasse.update
        : Texts.success.biomasse.create,
      duration: 3000,
      type: "success",
    });

    if (!biomasseID) setDataForm({ [FormInputs.form_name]: FormInputs });
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {loading ? (
          <ActivityIndicator color={Constants.COLORS.PRIMARY} />
        ) : (
          <View style={Style.main_page}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={Style.scrollview}
            >
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
            </ScrollView>
          </View>
        )}
      </KeyboardAvoidingView>
    </Layout>
  );
};
