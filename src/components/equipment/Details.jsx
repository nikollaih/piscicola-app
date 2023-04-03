import {ScrollView, Text, View, StyleSheet} from 'react-native';
import Theme from '../../theme/theme';

export const EquipmentDetails = () => {
  return (
    <ScrollView>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Fecha de compra</Text>
        <Text style={Style.text}>2023/02/24</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Vida útil (días)</Text>
        <Text style={Style.text}>790</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Utilizado (días)</Text>
        <Text style={Style.text}>32 ($81.012)</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Costo por día</Text>
        <Text style={Style.text}>$2.531</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Precio</Text>
        <Text style={Style.text}>$2.000.000</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Estado</Text>
        <Text style={Style.text}>Activo</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Último mantenimiento</Text>
        <Text style={Style.text}>2023/01/14</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Descripción</Text>
        <Text style={Style.text}>
          Lorem ipsun dolor sit amet Lorem ipsun dolor sit amet Lorem ipsun
          dolor sit amet Lorem ipsun dolor sit amet Lorem ipsun dolor sit amet
        </Text>
      </View>
    </ScrollView>
  );
};

const Style = StyleSheet.create({
  ...Theme,
});
