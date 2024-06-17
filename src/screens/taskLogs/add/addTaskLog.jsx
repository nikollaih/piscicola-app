import {
  View,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Layout } from "../../Layout";
import { useState, useEffect } from "react";
import { FormButtons } from "../../../components/button/formButtons";
import FormInputs from "../../../json/forms/taskLog";
import taskLogStructure from "../../../json/formsStructure/taskLogStructure";
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
import { TaskLogsServices } from "../../../services";
import { showMessage } from "react-native-flash-message";
import { Breadcrumb } from "../../../components/breadcrumb/Breadcrumb";

export const AddTaskLog = (props) => {
  const { getAuth, refreshToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { dataForm, isValidated, setDataForm, setCheckRequired } = useForm();
  const taskLog = props.route.params?.taskLog;

  const breadcrumb = {
    title: "Registro de tareas",
    subtitle: taskLog?.id ? "Modificar" : "Agregar",
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
    const Employess = await UtilServices.getEmployees(loggedUser);
    const Tasks = await UtilServices.getTasks(loggedUser);

    FormInputs["structure"] = taskLog ? taskLog : taskLogStructure;
    FormInputs["structure"]["productive_unit_id"] =
      loggedUser.productive_unit.id;

    FormInputs["fields"]["task_id"]["items"] = Tasks.data;
    FormInputs["fields"]["employee_id"]["items"] = Employess.data;

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
      let sendDataForm = dataForm[FormInputs.form_name].structure;
      let response = await TaskLogsServices.create(
        loggedUser.token,
        sendDataForm
      );
      let jsonResponse = await response.json();
      if (response.status == 200) {
        onSuccessSave();
      } else {
        if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
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
    try {
      let taskLogID = dataForm[FormInputs.form_name]?.structure?.id;
      setSaving(false);
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "taskLogs");
      showMessage({
        message: Texts.success.title,
        description: taskLogID
          ? Texts.success.task_log.update
          : Texts.success.task_log.create,
        duration: 3000,
        type: "success",
      });

      if (!taskLogID) setDataForm({ [FormInputs.form_name]: FormInputs });
    } catch (error) {

    }
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
