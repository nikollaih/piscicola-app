import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { StepList } from '../../components/steps/List';
import FormFields from '../../json/forms/Steps';
import stepsStructure from '../../json/formsStructure/stepsStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const Steps = props => {
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Etapas',
    subtitle: 'Lista',
    icon: 'ios-add'
  };

  /**
   * It opens the AddSteps screen.
   */
  const openAddSteps = () => {
    FormFields['structure'] = stepsStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddStep');
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddSteps();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <StepList navigation={props.navigation} />
      </View>
    </Layout>
  );
};
