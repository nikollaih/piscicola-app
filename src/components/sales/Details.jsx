import {ScrollView, Text, View, StyleSheet} from 'react-native';
import Theme from '../../theme/theme';

export const SaleDetails = () => {
  return (
    <ScrollView>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Fecha de gasto</Text>
        <Text style={Style.text}>2023/02/24</Text>
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
        </Text>
      </View>
    </ScrollView>
  );
};

const Style = StyleSheet.create({
    ...Theme
})