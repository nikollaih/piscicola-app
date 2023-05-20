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
  import FormInputs from "../../json/forms/Feed";
  import feedStructure from "../../json/formsStructure/feedStructure";
  import { useAuth } from "../../hooks/useAuth";
  import Style from "./style";
  import { Constants, LocalStorage, Texts, Utilities } from "../../util";
  import { CustomForm } from "../../components/form/customForm";
  import { useForm } from "../../hooks/useForm";
  import { FeedsServices } from "../../services";
  import { showMessage } from "react-native-flash-message";
  import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
  
  export const AddFeed = (props) => {
    const breadcrumb = {
      title: "Alimentación",
      subtitle: "Agregar",
      icon: "ios-add",
      right_content: null,
    };
  
    const feed = props.route.params?.feed;
    const { getAuth } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { dataForm, isValidated, setDataForm, setCheckrequired } = useForm();
  
    useEffect(() => {
      setInitialData(feed);
    }, []);
  
    /**
     * It sets the initial data for the form.
     */
    const setInitialData = async (feed) => {
      try {
        FormInputs["structure"] = feed
          ? feed
          : feedStructure;
        setSaving(false);
        setCheckrequired({ [FormInputs.form_name]: false });
        setDataForm({ [FormInputs.form_name]: FormInputs });
        setLoading(false);
      } catch (error) {}
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
          productive_unit_id: loggeduser.productive_unit.id,
        };
  
        // Create new productive unit
        let response = await FeedsServices.create(
          loggeduser.token,
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
          description: description ? description : Texts.error.common,
          duration: 3000,
          type: "danger",
        });
        setSaving(false);
      }
    };
  
    const onSuccessSave = () => {
      let feedID = dataForm[FormInputs.form_name]?.structure?.id;
      setSaving(false);
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "feed");
      showMessage({
        message: Texts.success.title,
        description: feedID
          ? Texts.success.feed.update
          : Texts.success.feed.create,
        duration: 3000,
        type: "success",
      });
  
      if (!feedID) setDataForm({ [FormInputs.form_name]: FormInputs });
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
  