import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { MedicationsList } from '../../components/medications/List';
import Style from './style';
import {Constants} from '../../util';

export const Medications = props => {
  const breadcrumb = {
    title: 'Medicamentos',
    subtitle: 'Unidad Productiva',
    icon: 'ios-add',
    screen: 'AddMedication',
  };
  return (
    <Layout navigation={props.navigation} route={props.route}>
      <ScrollView style={Style.scrollview}>
        <View style={Style.main_page}>
          <Breadcrumb navigation={props.navigation} data={breadcrumb} />
          <MedicationsList navigation={props.navigation} />
        </View>
      </ScrollView>
    </Layout>
  );
};
