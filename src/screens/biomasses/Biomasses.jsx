import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { BiomassesList } from '../../components/biomasses/List';
import FormFields from '../../json/forms/Biomasse';
import biomasseStructure from '../../json/formsStructure/biomasseStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const Biomasses = props => {
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Biomasas',
    subtitle: 'Lista',
    icon: 'ios-add'
  };

  /**
   * It opens the AddBiomasse screen.
   */
  const openAddBiomasse = () => {
    FormFields['structure'] = biomasseStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddBiomasse', {sowing: props.route.params.sowing});
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddBiomasse();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <BiomassesList navigation={props.navigation} sowing={props.route.params.sowing}/>
      </View>
    </Layout>
  );
};
