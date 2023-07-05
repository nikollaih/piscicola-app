import {
    View,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
  } from "react-native";
  import { Layout } from "../../Layout";
  import { useState, useEffect } from "react";
  import { FormButtons } from "../../../components/button/formButtons";
  import FormInputs from "../../../json/forms/paymentType";
  import paymentTypeStructure from "../../../json/formsStructure/paymentTypeStructure";
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
  import { PaymentTypesServices } from "../../../services";
  import { showMessage } from "react-native-flash-message";
  import { Breadcrumb } from "../../../components/breadcrumb/Breadcrumb";
  
  export const AddPaymentType = (props) => {
    const { getAuth, refreshToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { dataForm, isValidated, setDataForm, setCheckrequired } = useForm();
    const paymentType = props.route.params?.paymentType;
  
    const breadcrumb = {
      title: "Tipo de pago",
      subtitle: paymentType?.id ? "Modificar" : "Agregar",
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
  
      FormInputs["structure"] = paymentType ? paymentType : paymentTypeStructure;
      FormInputs["structure"]["productive_unit_id"] =
        loggedUser.productive_unit.id;
  
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
        let sendDataForm = dataForm[FormInputs.form_name].structure;
        let response = await PaymentTypesServices.create(
          loggeduser.token,
          sendDataForm
        );
        let jsonResponse = await response.json();
        console.log("response", jsonResponse)
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
      try {
        let paymentTypeID = dataForm[FormInputs.form_name]?.structure?.id;
        setSaving(false);
        LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "paymentTypes");
        showMessage({
          message: Texts.success.title,
          description: paymentTypeID
            ? Texts.success.payment_type.update
            : Texts.success.payment_type.create,
          duration: 3000,
          type: "success",
        });
  
        if (!paymentTypeID) setDataForm({ [FormInputs.form_name]: FormInputs });
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
  