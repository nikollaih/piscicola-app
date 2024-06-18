import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import { Layout } from "../../Layout";
import { useState, useEffect } from "react";
import { FormButtons } from "../../../components/button/formButtons";
import supplyStructure from "../../../json/formsStructure/supplyStructure";
import { Breadcrumb } from "../../../components/breadcrumb/Breadcrumb";
import FormInputs from "../../../json/forms/Supply";
import Style from "../style";
import {
  Constants,
  UtilServices,
  Texts,
  Utilities,
  LocalStorage,
} from "../../../util";
import { CustomForm } from "../../../components/form/customForm";
import { useForm } from "../../../hooks/useForm";
import { useAuth } from "../../../hooks/useAuth";
import { SuppliesServices } from "../../../services";
import { showMessage } from "react-native-flash-message";

export const AddSupply = (props) => {
  const supply = props.route.params?.supply;
  const { getAuth, refreshToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { dataForm, isValidated, setDataForm, setCheckRequired } = useForm();

  const breadcrumb = {
    title: `${supply ? "Modificar" : "Nuevo"} Insumo`,
    subtitle: "Insumos",
  };

  useEffect(() => {
    setInitialData(supply);
  }, []);

  /**
   * It sets the initial data for the form.
   */
  const setInitialData = async (supply) => {
    const loggedUser = await getAuth();
    const UNIT_TYPES = await UtilServices.getUnitTypes(loggedUser);

    FormInputs["structure"] = supply?.id ? {
      id: supply?.id,
      name: supply?.name,
      use_type: supply?.use_type,
      measurement_unit_id: supply?.measurement_unit_id,
      notes: supply?.notes
    } : supplyStructure;
    FormInputs["structure"]["productive_unit_id"] =
      loggedUser.productive_unit.id;
    FormInputs["fields"]["measurement_unit_id"]["items"] = UNIT_TYPES.payload;

    if (supply) {
      FormInputs["fields"]["total_price"]["is_visible"] = false;
      FormInputs["fields"]["quantity"]["is_visible"] = false;
      FormInputs["fields"]["manual_created_at"]["is_visible"] = false;
    }

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
      if (isValidated([FormInputs.form_name])) {
        setSaving(true);
        saveForm();
      }
    }
  };

  const saveForm = async () => {
    try {
      let loggedUser = await getAuth();
      let sendDataForm = dataForm[FormInputs.form_name].structure;
      let response = await SuppliesServices.create(
          loggedUser.token,
        sendDataForm
      );
      let jsonResponse = await response.json();

      if (response.status === 200) {
        onSuccessSave();
      } else {
        if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
          await refreshToken({ force: true, navigation: props.navigation });
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
    let supplyID = dataForm[FormInputs.form_name]?.structure?.id;
    setSaving(false);
    LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "supply");
    showMessage({
      message: Texts.success.title,
      description: supplyID
        ? Texts.success.supply.update
        : Texts.success.supply.create,
      duration: 3000,
      type: "success",
    });

    setCheckRequired({ [FormInputs.form_name]: false });
    if (!supplyID) setDataForm({ [FormInputs.form_name]: FormInputs });
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
