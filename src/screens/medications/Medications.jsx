import {View, ScrollView} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import {MedicationsList} from '../../components/medications/List';
import FormFields from '../../json/forms/Medication';
import medicationStructure from '../../json/formsStructure/medicationStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const Medications = props => {
  const {dataForm, setDataForm} = useForm();
  const sowing = props.route.params.sowing;

  const breadcrumb = {
    title: 'Historial de medicamentos',
    subtitle: 'Cosecha',
    icon: 'ios-add'
  };

  /**
   * It opens the AddMedicine screen.
   */
  const openAddMedication = () => {
    FormFields["structure"] = medicationStructure;
    setDataForm({ ...dataForm, [FormFields.form_name]: FormFields });
    props.navigation.navigate("AddMedication", {sowing: sowing});
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <ScrollView style={Style.scrollview}>
        <View style={Style.main_page}>
          <Breadcrumb
            onPressRight={() => {
              openAddMedication();
            }}
            navigation={props.navigation}
            data={breadcrumb}
          />
          <MedicationsList navigation={props.navigation} sowing={sowing} />
        </View>
      </ScrollView>
    </Layout>
  );
};
