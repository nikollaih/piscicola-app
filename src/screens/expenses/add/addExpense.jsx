import {View, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Layout} from '../../Layout';
import {useState, useEffect} from 'react';
import { FormButtons } from '../../../components/button/formButtons';
import {Breadcrumb} from '../../../components/breadcrumb/Breadcrumb';
import FormInputs from '../../../json/forms/Expenses';
import Style from '../style';
import {Constants} from '../../../util';
import {CustomForm} from '../../../components/form/customForm';
import {useForm} from '../../../hooks/useForm';

export const AddExpense = props => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const {dataForm, isValidated, setDataForm, setCheckrequired} = useForm();

  const breadcrumb = {
    title: 'Nuevo Gasto',
    subtitle: 'Gastos',
  };

  useEffect(() => {
    setInitialData();
  }, []);

  /**
   * It sets the initial data for the form.
   */
  const setInitialData = () => {
    setSaving(false);
    setCheckrequired({[FormInputs.form_name]: false});
    setDataForm({...dataForm, [FormInputs.form_name]: FormInputs});
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
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={Style.scrollview}>
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
