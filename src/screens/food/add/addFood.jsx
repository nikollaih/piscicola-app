import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import { Layout } from "../../Layout";
import { useState, useEffect } from "react";
import { FormButtons } from "../../../components/button/formButtons";
import foodStructure from "../../../json/formsStructure/foodStructure";
import { Breadcrumb } from "../../../components/breadcrumb/Breadcrumb";
import FormInputs from "../../../json/forms/Food";
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
import { FoodServices } from "../../../services";
import { showMessage } from "react-native-flash-message";

export const AddFood = (props) => {
  const food = props.route.params?.food;
  const sowing = props.route.params.sowing;
  const { getAuth, refreshToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadedData, setLoadedData] = useState(false);
  const [aliments, setAliments] = useState([]);
  const { dataForm, isValidated, setDataForm, setCheckrequired } = useForm();

  const breadcrumb = {
    title: `${food ? "Modificar" : "Nueva"} Alimentación`,
    subtitle: "Suministros",
  };

  useEffect(() => {
    if (!loadedData) setInitialData(food);
    else setMaxQuantity();
  }, [dataForm[FormInputs.form_name]?.structure?.supply_id]);

  /**
   * It sets the initial data for the form.
   */
  const setInitialData = async (food) => {
    const loggedUser = await getAuth();
    const ALIMENTS = await UtilServices.getSupplies(loggedUser, "/aliments");
    FormInputs["structure"]["sowing_id"] = sowing.id;

    if (!food) FormInputs["structure"]["supply_id"] = null;
    FormInputs["fields"]["quantity"]["title"] = `Cantidad`;
    FormInputs["fields"]["supply_id"]["items"] = ALIMENTS.data;
    FormInputs["structure"] = food ? food : foodStructure;
    if (food)
      FormInputs["fields"]["quantity"]["validate"]["max"] =
        food.quantity + food.supply.stock;

    setSaving(false);
    setCheckrequired({ [FormInputs.form_name]: false });
    setDataForm({ [FormInputs.form_name]: FormInputs });
    setAliments(ALIMENTS.data);
    setLoadedData(true);
    setLoading(false);
  };

  const setMaxQuantity = () => {
    const SUPPLY_ID = dataForm[FormInputs.form_name]?.structure?.supply_id;
    if (SUPPLY_ID != null && SUPPLY_ID != undefined) {
      const SELECTED_SUPPLY = aliments.filter((s) => s.id == SUPPLY_ID)[0];
      let max_stock = SELECTED_SUPPLY?.stock;
      FormInputs["structure"]["sowing_id"] = sowing.id;
      FormInputs["structure"]["supply_id"] = SUPPLY_ID;
      FormInputs["fields"]["quantity"][
        "title"
      ] = `Cantidad (${SELECTED_SUPPLY?.unit_type?.name})`;

      if (food && food.supply.id == SUPPLY_ID)
        max_stock = food.quantity + food.supply.stock;

      FormInputs["fields"]["quantity"]["validate"]["max"] = max_stock;
      setDataForm({ [FormInputs.form_name]: FormInputs });
    }
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
      let response = await FoodServices.create(loggeduser.token, sendDataForm);
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
    let foodID = dataForm[FormInputs.form_name]?.structure?.id;
    setSaving(false);
    LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "food");
    showMessage({
      message: Texts.success.title,
      description: foodID
        ? Texts.success.food.update
        : Texts.success.food.create,
      duration: 3000,
      type: "success",
    });

    setCheckrequired({ [FormInputs.form_name]: false });
    if (!foodID) setDataForm({ [FormInputs.form_name]: FormInputs });
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