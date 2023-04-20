import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Layout } from "../../Layout";
import { useState, useEffect } from "react";
import { FormButtons } from "../../../components/button/formButtons";
import { Breadcrumb } from "../../../components/breadcrumb/Breadcrumb";
import userStructure from "../../../json/formsStructure/userStructure";
import FormInputs from "../../../json/forms/User";
import Style from "../../../theme/theme";
import { CustomForm } from "../../../components/form/customForm";
import { useForm } from "../../../hooks/useForm";
import { useAuth } from "../../../hooks/useAuth";
import { UsersServices } from "../../../services";
import { Utilities } from "../../../util";

export const AddUser = (props) => {
  const User = props.route.params?.user;
  const { getAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { dataForm, isValidated, setDataForm, setCheckrequired } = useForm();

  const breadcrumb = {
    title: "Nuevo Usuario",
    subtitle: "Usuarios",
  };

  useEffect(() => {
    setInitialData(User);
  }, []);

  /**
   * It sets the initial data for the form.
   */
  const setInitialData = (User) => {
    FormInputs["structure"] = User ? User : userStructure;
    setSaving(false);
    setCheckrequired({ [FormInputs.form_name]: false });
    setDataForm({ ...dataForm, [FormInputs.form_name]: FormInputs });
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
        ...dataForm[FormInputs.form_name].structure,
      };

      // Create new productive unit
      let response = await UsersServices.create(loggeduser.token, sendDataForm);
      let jsonResponse = await response.json();
      console.log(jsonResponse)
      console.log(response);
      if (response.status == 200) {
        console.log("creado");
        onSuccessSave();
      } else {
        Utilities.showAlert({});
      }
    } catch (error) {
      console.log(error);
      Utilities.showAlert({});
    }
  };

  const onSuccessSave = () => {
    let userID = dataForm[FormInputs.form_name]?.structure?.id;
    setSaving(false);
    LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "users");
    Utilities.showAlert({
      title: Texts.success.title,
      text: userID ? Texts.success.user.update : Texts.success.user.create,
      type: "success",
    });

    if (!userID) setDataForm({ [FormInputs.form_name]: FormInputs });
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={Style.scrollview}
        >
          <View style={Style.main_page}>
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};
