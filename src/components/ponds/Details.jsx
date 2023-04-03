import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {Constants} from '../../util';
import Theme from '../../theme/theme';

export const PondDetails = () => {
  return (
    <ScrollView>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Fecha de creación</Text>
        <Text style={Style.text}>2023/02/24</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Tamaño</Text>
        <Text style={Style.text}>2.000L</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Medidas</Text>
        <Text style={Style.text}>3x5mts</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Estado</Text>
        <Text style={Style.text}>Mantenimiento</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Producto</Text>
        <Text style={Style.text}>Cosecha 1</Text>
      </View>
    </ScrollView>
  );
};

const Style = StyleSheet.create({
  ...Theme,
});
