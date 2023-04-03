import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Layout} from '../Layout';
import { Breadcrumb } from '../../components/breadcrumb/Breadcrumb';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Style from './style';
import {Constants} from '../../util';

export const ProductiveUnit = props => {
  const breadcrumb = {
    title: "Asorobles",
    subtitle: "Unidad Productiva",
    icon: "ios-create",
    screen: "EditProductiveUnit"
  }

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <ScrollView style={Style.main_page}>
        <Breadcrumb navigation={props.navigation} data={breadcrumb} />
        <View style={Style.white_container}>
          <View style={Style.list_container}>
            <Text style={Style.inside_subtitle}>Descripción</Text>
            <Text style={Style.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              sollicitudin egestas nisl, vitae feugiat neque auctor at. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              quis ante sit amet dui euismod sodales et vel tortor. Quisque
              consectetur, odio vel vulputate tincidunt, turpis velit fringilla
              nibh, in bibendum est mauris in sem. Aliquam gravida neque est.
              Aenean rutrum augue a tellus dapibus, ullamcorper malesuada risus
              facilisis.
            </Text>
          </View>
          <View style={Style.list_container}>
            <Text style={Style.inside_subtitle}>Ubicación</Text>
            <Text style={Style.text}>
              Vereda fulanita finca la pepita, La Tebaida, Quindio
            </Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};
