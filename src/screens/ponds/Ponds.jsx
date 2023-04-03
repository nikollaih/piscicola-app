import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { PondsList } from '../../components/ponds/List';
import FormFields from '../../json/forms/Pond';
import pondStructure from '../../json/formsStructure/pondStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const Ponds = props => {
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Estanques',
    subtitle: 'Lista',
    icon: 'ios-add'
  };

  /**
   * It opens the AddPond screen.
   */
  const openAddPond = () => {
    FormFields['structure'] = pondStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddPond');
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddPond();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <PondsList navigation={props.navigation} />
      </View>
    </Layout>
  );
};
