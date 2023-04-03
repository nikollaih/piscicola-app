import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import {FoodList} from '../../components/food/List';
import Style from './style';
import {Constants} from '../../util';

export const Food = props => {
  const breadcrumb = {
    title: 'Alimentos',
    subtitle: 'Unidad Productiva',
    icon: 'ios-add',
    screen: 'AddFood',
  };
  return (
    <Layout navigation={props.navigation} route={props.route}>
      <ScrollView style={Style.scrollview}>
        <View style={Style.main_page}>
          <Breadcrumb navigation={props.navigation} data={breadcrumb} />
          <FoodList navigation={props.navigation} />
        </View>
      </ScrollView>
    </Layout>
  );
};
