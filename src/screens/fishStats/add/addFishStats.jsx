import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { Layout } from "../../Layout";
import { useState, useEffect } from "react";
import { FillIconButton } from "../../../components/button/fillIconButton";
import FormInputs from "../../../json/forms/fishStats";
import fishStatsStructure from "../../../json/formsStructure/fishStatsStructure";
import { useAuth } from "../../../hooks/useAuth";
import Style from "../style";
import { Constants, LocalStorage, Texts, UtilServices } from "../../../util";
import { CustomForm } from "../../../components/form/customForm";
import { useForm } from "../../../hooks/useForm";
import { FishStatsServices } from "../../../services";
import { showMessage } from "react-native-flash-message";
import { Breadcrumb } from "../../../components/breadcrumb/Breadcrumb";

export const AddFishStats = (props) => {
  const { getAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { dataForm, isValidated, setDataForm, setCheckrequired } = useForm();
  const fishStats = props.route.params?.fishStats;
  const fish = props.route.params?.fish;
  const breadcrumb = {
    title: "Parametro",
    subtitle: fishStats?.id ? "Modificar" : "Agregar",
    right_content: null,
  };

  useEffect(() => {
    setInitialData();
  }, []);

  /**
   * It sets the initial data for the form.
   */
  const setInitialData = async () => {
    FormInputs["structure"] = fishStats
      ? getFishStatsStructureUpdate(fishStats)
      : { ...fishStatsStructure, fish_step_id: fish.id };
    setSaving(false);
    setCheckrequired({ [FormInputs.form_name]: false });
    setDataForm({ [FormInputs.form_name]: FormInputs });
    setLoading(false);
  };

  const getFishStatsStructureUpdate = (fishStats) => {
    return {
      ...fishStats,
      id: fishStats?.id,
      value_minimum: fishStats?.value_minimum,
      value_maximum: fishStats?.value_maximum,
      fish_step_id: fishStats.fish_step_id ? fishStats.fish_step_id : fish.id,
    };
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
        ...dataForm[FormInputs.form_name].structure,
      };

      // Create new productive unit
      let response = await FishStatsServices.create(
        loggeduser.token,
        sendDataForm
      );
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
    let fishStatsID = dataForm[FormInputs.form_name]?.structure?.id;
    setSaving(false);
    LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "fishStats");
    showMessage({
      message: Texts.success.title,
      description: fishStatsID
        ? Texts.success.fishStats.update
        : Texts.success.fishStats.create,
      duration: 3000,
      type: "success",
    });

    if (!fishStatsID) setDataForm({ [FormInputs.form_name]: FormInputs });
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
