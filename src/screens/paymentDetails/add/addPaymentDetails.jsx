import {
  View,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Layout } from "../../Layout";
import { useState, useEffect } from "react";
import { FormButtons } from "../../../components/button/formButtons";
import FormInputs from "../../../json/forms/paymentDetails";
import paymentDetailsStructure from "../../../json/formsStructure/paymentDetailsStructure";
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
import { PaymentDetailsServices } from "../../../services";
import { showMessage } from "react-native-flash-message";
import { Breadcrumb } from "../../../components/breadcrumb/Breadcrumb";

export const AddPaymentDetail = ({ route, navigation }) => {
  const { getAuth, refreshToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { dataForm, isValidated, setDataForm, setCheckrequired } = useForm();
  const [loadedData, setLoadedData] = useState(false);
  const [tasksLogs, setTasksLogs] = useState([]);
  const paymentDetail = route.params?.paymentDetail;

  const breadcrumb = {
    title: "Tipo de pago",
    subtitle: paymentDetail?.id ? "Modificar" : "Agregar",
    right_content: null,
  };

  useEffect(() => {
    if (!loadedData) setInitialData();
    else getTasksLogs();
  }, [dataForm[FormInputs.form_name]?.structure?.employee_id]);

  /**
   * It sets the initial data for the form.
   */
  const setInitialData = async () => {
    const loggedUser = await getAuth();

    const PAYMENT_TYPES = await UtilServices.getPaymentTypes(loggedUser);
    const EMPLOYEES = await UtilServices.getEmployees(loggedUser);
    const TASKS = await UtilServices.getTasksLogs(loggedUser);

    FormInputs["structure"] = paymentDetail
      ? paymentDetail
      : paymentDetailsStructure;
    FormInputs["structure"]["productive_unit_id"] =
      loggedUser.productive_unit.id;
    FormInputs["fields"]["payment_concept_id"]["items"] = PAYMENT_TYPES.data;
    FormInputs["fields"]["employee_id"]["items"] = EMPLOYEES.data;
    FormInputs["fields"]["task_logs_id"]["items"] = TASKS.data;

    setTasksLogs(TASKS.data);
    setSaving(false);
    setCheckrequired({ [FormInputs.form_name]: false });
    setDataForm({ [FormInputs.form_name]: FormInputs });
    setLoading(false);
    setLoadedData(true);
  };

  const getTasksLogs = () => {
    const EMPLOYEE_ID = dataForm[FormInputs.form_name]?.structure?.employee_id;
    FormInputs["fields"]["task_logs_id"]["items"] = [];
    let tempEmployeeTasksLogs = handlerTasksLogsName(tasksLogs);

    let employeeTasksLogs = tempEmployeeTasksLogs.filter(
      (task) => task.employee_id == EMPLOYEE_ID
    );

    FormInputs["fields"]["task_logs_id"]["items"] = employeeTasksLogs;
    setDataForm({
      [FormInputs.form_name]: {
        ...dataForm[FormInputs.form_name],
        structure: {
          ...dataForm[FormInputs.form_name].structure
        },
      },
    });
  };

  const handlerTasksLogsName = (tasksLogs) => {
    return tasksLogs.map((task) => {
      return { ...task, name: task.task.name };
    });
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
      let response = await PaymentDetailsServices.create(
        loggeduser.token,
        sendDataForm
      );
      let jsonResponse = await response.json();
      if (response.status == 200) {
        onSuccessSave();
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken({ force: true, navigation: navigation });
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
      let paymentDetailID = dataForm[FormInputs.form_name]?.structure?.id;
      setSaving(false);
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "paymentDetails");
      showMessage({
        message: Texts.success.title,
        description: paymentDetailID
          ? Texts.success.payment_details.update
          : Texts.success.payment_details.create,
        duration: 3000,
        type: "success",
      });

      if (!paymentDetailID) setDataForm({ [FormInputs.form_name]: FormInputs });
    } catch (error) {}
  };

  return (
    <Layout navigation={navigation} route={route}>
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
              <Breadcrumb navigation={navigation} data={breadcrumb} />
              <View style={Style.white_container}>
                {!loading && dataForm[FormInputs.form_name] ? (
                  <CustomForm formName={FormInputs.form_name} />
                ) : null}
              </View>
              <FormButtons
                navigation={navigation}
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
