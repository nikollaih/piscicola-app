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
  const { dataForm, isValidated, setDataForm, setCheckrequired } = useForm();

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
    FormInputs["structure"] = supply ? supply : supplyStructure;
    FormInputs["structure"]["productive_unit_id"] =
      loggedUser.productive_unit.id;
    FormInputs["fields"]["unit_type_id"]["items"] = UNIT_TYPES;

    if (supply) {
      FormInputs["structure"]["quantity"] = getQuantity(supply);
      FormInputs["structure"]["cost_unity"] = getPrice(supply);
      FormInputs["fields"]["unit_type_id"]["is_editable"] = false;
      FormInputs["fields"]["use_type"]["is_editable"] = false;
      FormInputs["fields"]["cost_unity"]["is_editable"] = false;
      FormInputs["fields"]["quantity"]["is_editable"] = false;
    }

    setSaving(false);
    setCheckrequired({ [FormInputs.form_name]: false });
    setDataForm({ [FormInputs.form_name]: FormInputs });
    setLoading(false);
  };

  const getQuantity = (supply) => {
    const STOCK_LENGTH = supply.stock_details.length;
    return supply.stock_details[STOCK_LENGTH - 1].quantity;
  };

  const getPrice = (supply) => {
    const STOCK_LENGTH = supply.stock_details.length;
    return supply.stock_details[STOCK_LENGTH - 1].cost_unity;
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
      let response = await SuppliesServices.create(
        loggeduser.token,
        sendDataForm
      );
      let jsonResponse = await response.json();
      console.log(jsonResponse);
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

    setCheckrequired({ [FormInputs.form_name]: false });
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
