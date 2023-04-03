import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import {EquipmentList} from '../../components/equipment/List';
import FormFields from '../../json/forms/Pond';
import pondStructure from '../../json/formsStructure/pondStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const Equipment = props => {
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Equipos',
    subtitle: 'Lista',
    icon: 'ios-add',
  };

  /**
   * It opens the AddTank screen.
   */
  const openAddEquipment = () => {
    FormFields['structure'] = pondStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddEquipment');
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddEquipment();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <EquipmentList navigation={props.navigation} />
      </View>
    </Layout>
  );
};
