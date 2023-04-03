import {ScrollView, Text, View, StyleSheet} from 'react-native';
import Theme from '../../theme/theme';

export const FoodDetails = () => {
  return (
    <ScrollView>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Fecha de compra</Text>
        <Text style={Style.text}>2023/02/24</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Cantidad comprada</Text>
        <Text style={Style.text}>60Kg</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Cantidad actual</Text>
        <Text style={Style.text}>25Kg</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Precio</Text>
        <Text style={Style.text}>$100.000</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Descripción</Text>
        <Text style={Style.text}>
          Lorem ipsun dolor sit amet Lorem ipsun dolor sit amet Lorem ipsun
          dolor sit amet Lorem ipsun dolor sit amet Lorem ipsun dolor sit amet
          Lorem ipsun dolor sit amet Lorem ipsun dolor sit amet Lorem ipsun
          dolor sit amet Lorem ipsun dolor sit amet Lorem ipsun dolor sit amet
          Lorem ipsun dolor sit amet Lorem ipsun dolor sit amet Lorem ipsun
          dolor sit amet Lorem ipsun dolor sit amet Lorem ipsun dolor sit amet
          Lorem ipsun dolor sit amet Lorem ipsun dolor sit amet
        </Text>
      </View>
    </ScrollView>
  );
};

const Style = StyleSheet.create({
    ...Theme
})