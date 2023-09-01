import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { MortalitiesList } from '../../components/mortalities/List';
import FormFields from '../../json/forms/Mortality';
import mortalityStructure from '../../json/formsStructure/mortalityStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const Mortalities = props => {
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Mortalidad',
    subtitle: 'Lista',
    icon: 'ios-add'
  };

  /**
   * It opens the AddMortality screen.
   */
  const openAddMortality = () => {
    FormFields['structure'] = mortalityStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddMortality', {sowing: props.route.params.sowing});
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddMortality();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <MortalitiesList navigation={props.navigation} sowing={props.route.params.sowing}/>
      </View>
    </Layout>
  );
};
