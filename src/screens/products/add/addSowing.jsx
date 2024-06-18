import {
  View,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView, Platform,
} from "react-native";
import { Layout } from "../../Layout";
import { useState, useEffect } from "react";
import { FormButtons } from "../../../components/button/formButtons";
import FormInputs from "../../../json/forms/Sowing";
import sowingStructure from "../../../json/formsStructure/sowingStructure";
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
import { SowingsServices } from "../../../services";
import { showMessage } from "react-native-flash-message";
import { Breadcrumb } from "../../../components/breadcrumb/Breadcrumb";
import {getSowingCreateData} from "../../../services/Sowings";
import {changeDateFormatForAPI} from "../../../util/utilities";

export const AddSowing = (props) => {
  const { getAuth, refreshToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [wasSaved, setWasSaved] = useState(false);
  const { dataForm, isValidated, setDataForm, setCheckRequired } = useForm();
  const sowing = props.route.params?.sowing;

  const breadcrumb = {
    title: "Cosecha",
    subtitle: sowing?.id ? "Modificar" : "Agregar",
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
      const response = await SowingsServices.getSowingCreateData(loggedUser.token);
      let jsonResponse = await response.json();

      if (response.status === 200) {
        FormInputs["structure"] = sowing ? sowing : sowingStructure;
        FormInputs["fields"]["pond_id"]["items"] = jsonResponse.payload.ponds;
        FormInputs["fields"]["step_id"]["items"] = jsonResponse.payload.steps;
        FormInputs["fields"]["fish_id"]["items"] = jsonResponse.payload.fish;

        setSaving(false);
        setCheckRequired({ [FormInputs.form_name]: false });
        setDataForm({ [FormInputs.form_name]: FormInputs });
        setLoading(false);
      }
      else {
        if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken({force:true, navigation: props.navigation});
          setInitialData();
        } else Utilities.showErrorFecth(jsonResponse);
        setLoading(false);
      }
    } catch (error) {
    }
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
      let sendDataForm = dataForm[FormInputs.form_name].structure;

      let response = await SowingsServices.create(
          loggedUser.token,
        sendDataForm
      );
      let jsonResponse = await response.json();

      if (response.status === 200) {
        onSuccessSave();
      } else {
        if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken({force:true, navigation: props.navigation});
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
    let sowingID = dataForm[FormInputs.form_name]?.structure?.id;
    setSaving(false);
    setWasSaved(true);
    LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "sowings");
    showMessage({
      message: Texts.success.title,
      description: sowingID
        ? Texts.success.sowing.update
        : Texts.success.sowing.create,
      duration: 3000,
      type: "success",
    });

    if (!sowingID) setDataForm({ [FormInputs.form_name]: FormInputs });
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
                backTimes={(wasSaved) ? 2 : 1}
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
