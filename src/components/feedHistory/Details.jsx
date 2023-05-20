import {ScrollView, Text, View, StyleSheet} from 'react-native';
import Theme from '../../theme/theme';

export const FeedDetails = () => {
  return (
    <ScrollView>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Fecha de alimentación</Text>
        <Text style={Style.text}>2023/02/24 03:43 p.m.</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Cantidad suministrada</Text>
        <Text style={Style.text}>10Kg</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Costo aproximado</Text>
        <Text style={Style.text}>$12000</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Descripción</Text>
        <Text style={Style.text}>
          Lorem ipsun dolor sit amet Lorem ipsun dolor sit amet Lorem ipsun
          dolor sit amet Lorem ipsun dolor sit amet Lorem ipsun dolor sit amet
          Lorem ipsun dolor sit amet Lorem ipsun dolor sit amet Lorem ipsun
          dolor sit amet Lorem ipsun dolor sit amet Lorem ipsun dolor sit amet
        </Text>
      </View>
    </ScrollView>
  );
};

const Style = StyleSheet.create({
    ...Theme
})