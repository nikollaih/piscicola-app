import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import { Layout } from "../../Layout";
import { useState, useEffect } from "react";
import { FormButtons } from "../../../components/button/formButtons";
import supplyStockStructure from "../../../json/formsStructure/supplyStockStructure";
import { Breadcrumb } from "../../../components/breadcrumb/Breadcrumb";
import FormInputs from "../../../json/forms/supplyStock";
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
import { SuppliesStockServices } from "../../../services";
import { showMessage } from "react-native-flash-message";

export const AddSupplyStock = (props) => {
  const supplyStock = props.route.params?.supplyStock;
  const supply = props.route.params?.supply;
  const { getAuth, refreshToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { dataForm, isValidated, setDataForm, setCheckrequired } = useForm();

  const breadcrumb = {
    title: `${supplyStock ? "Modificar" : "Nuevo"} Stock "${supply?.name}"`,
    subtitle: "Insumos",
  };

  useEffect(() => {
    setInitialData(supplyStock);
  }, []);

  /**
   * It sets the initial data for the form.
   */
  const setInitialData = async (supplyStock) => {
    const loggedUser = await getAuth();
    FormInputs["structure"] = supplyStock ? supplyStock : supplyStockStructure;
    FormInputs["structure"]["productive_unit_id"] =
      loggedUser.productive_unit.id;
    FormInputs["structure"]["supply_id"] = supplyStock?.supply_id;

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
      if (isValidated([FormInputs.form_name])) {
        setSaving(true);
        saveForm();
      }
    }
  };

  const saveForm = async () => {
    try {
      let loggeduser = await getAuth();
      let sendDataForm = dataForm[FormInputs.form_name].structure;
      let response = await SuppliesStockServices.create(
        loggeduser.token,
        sendDataForm
      );
      let jsonResponse = await response.json();
      if (response.status == 200) {
        onSuccessSave();
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
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
    let supplyStockID = dataForm[FormInputs.form_name]?.structure?.id;
    setSaving(false);
    LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "supplyStock");
    showMessage({
      message: Texts.success.title,
      description: supplyStockID
        ? Texts.success.supplyStock.update
        : Texts.success.supplyStock.create,
      duration: 3000,
      type: "success",
    });

    setCheckrequired({ [FormInputs.form_name]: false });
    if (!supplyStockID) setDataForm({ [FormInputs.form_name]: FormInputs });
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
