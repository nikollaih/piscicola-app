import {View, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Layout} from '../../Layout';
import {useState, useEffect} from 'react';
import {FillIconButton} from '../../../components/button/fillIconButton';
import FormInputs from '../../../json/forms/editProductiveUnit';
import Style from './style';
import {Constants} from '../../../util';
import {CustomForm} from '../../../components/form/customForm';
import {useForm} from '../../../hooks/useForm';

export const EditProductiveUnit = props => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const {dataForm, isValidated, setDataForm, setCheckrequired} = useForm();

  useEffect(() => {
    setInitialData();
  }, []);

  /**
   * It sets the initial data for the form.
   */
  const setInitialData = () => {
    setSaving(false);
    setCheckrequired({[FormInputs.form_name]: false});
    setDataForm({[FormInputs.form_name]: FormInputs});
    setLoading(false);
  };

  /**
   * If the form is not saving, then set the checkrequired state to true, and if the form is validated,
   * then set the saving state to true and save the form
   */
  const checkForm = () => {
    if (!saving) {
      setCheckrequired({[FormInputs.form_name]: true});
      if (isValidated([FormInputs.form_name])) {
        setSaving(true);
        saveForm();
      }
    }
  };

  const saveForm = () => {};

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={Style.main_page}>
          <ScrollView style={Style.scrollview}>
            <View style={Style.user_container}>
              <View>
                <Text style={Style.text_user}>Unidad Productiva</Text>
                <Text style={Style.name_user}>Modificar</Text>
              </View>
            </View>
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
