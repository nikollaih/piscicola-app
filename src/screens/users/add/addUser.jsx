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
import { UsersServices, ProductiveUnitsServices } from "../../../services";
import { Utilities, LocalStorage, Constants, Texts, UtilServices } from "../../../util";

export const AddUser = (props) => {
  const User = props.route.params?.user;
  const productiveUnit = props.route.params?.productive_unit;
  const { getAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { dataForm, isValidated, setDataForm, setCheckRequired } = useForm();

  const breadcrumb = {
    title: User?.id ? "Modificar Usuario" : "Nuevo Usuario",
    subtitle: "Usuarios",
  };

  useEffect(() => {
    setInitialData(User);
  }, []);

  /**
   * It sets the initial data for the form.
   */
  const setInitialData = async (User) => {
    FormInputs["structure"] = User ? {
      "id": User?.id,
      "document": User.document,
      "name": User.name,
      "email": User.email,
      "mobile_phone": User.mobile_phone,
      "role_id": User?.role_id
    } : userStructure;
    setSaving(false);
    setCheckRequired({ [FormInputs.form_name]: false });
    setDataForm({ ...dataForm, [FormInputs.form_name]: FormInputs });
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
        ...dataForm[FormInputs.form_name].structure,
      };

      // Create new productive unit
      let response = await UsersServices.create(loggedUser.token, sendDataForm, productiveUnit?.id);
      if (response.status === 200) {
        onSuccessSave();
      } else {
        Utilities.showAlert({});
      }
    } catch (error) {
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
