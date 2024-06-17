import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Layout } from "../Layout";
import { useState, useEffect } from "react";
import { FillIconButton } from "../../components/button/fillIconButton";
import FormInputs from "../../json/forms/productTypes";
import productTypeStructure from "../../json/formsStructure/productTypesStructure";
import { useAuth } from "../../hooks/useAuth";
import Style from "./style";
import { Constants, LocalStorage, Texts, Utilities } from "../../util";
import { CustomForm } from "../../components/form/customForm";
import { useForm } from "../../hooks/useForm";
import { ProductTypesServices } from "../../services";
import { showMessage } from "react-native-flash-message";
import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";

export const AddProductType = (props) => {
  const breadcrumb = {
    title: "Tipo de producto",
    subtitle: "Agregar",
    icon: "ios-add",
    right_content: null,
  };

  const productType = props.route.params?.productType;
  const { getAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { dataForm, isValidated, setDataForm, setCheckRequired } = useForm();

  useEffect(() => {
    setInitialData(productType);
  }, []);

  /**
   * It sets the initial data for the form.
   */
  const setInitialData = async (productType) => {
      FormInputs["structure"] = productType
        ? productType
        : productTypeStructure;
      setSaving(false);
      setCheckRequired({ [FormInputs.form_name]: false });
      setDataForm({ [FormInputs.form_name]: FormInputs });
      setLoading(false);
  }

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
      let response = await ProductTypesServices.create(
        loggedUser.token,
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
      showMessage({
        message: Texts.error.title,
        description: Texts.error.common,
        duration: 3000,
        type: "danger",
      });
      setSaving(false);
    }
  };

  const onSuccessSave = () => {
    let productTypeID = dataForm[FormInputs.form_name]?.structure?.id;
    setSaving(false);
    LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "productTypes");
    showMessage({
      message: Texts.success.title,
      description: productTypeID
        ? Texts.success.productType.update
        : Texts.success.productType.create,
      duration: 3000,
      type: "success",
    });

    if (!productTypeID) setDataForm({ [FormInputs.form_name]: FormInputs });
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
            showsVerticalScrollIndicator={false}
          >
            <Breadcrumb navigation={props.navigation} data={breadcrumb} />
            <View style={Style.white_container}>
              {!loading ? <CustomForm formName={FormInputs.form_name} /> : null}
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
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
};
