import { View, Text, StyleSheet } from "react-native";
import Theme from "../../theme/theme";

export const ProductCompleteDetails = ({}) => {
  return (
    <View>
      <Text style={Style.subtitle}>Detalles</Text>
      <View style={Style.white_container}>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Etapa</Text>
          <Text style={Style.text}>Alevinaje</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Cantidad de peces</Text>
          <Text style={Style.text}>2000</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Estanque</Text>
          <Text style={Style.text}>Estanque 1</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Producto</Text>
          <Text style={Style.text}>Mojarra Roja</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Fecha de creación</Text>
          <Text style={Style.text}>2023/02/21 04:35 PM</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>
            Días de producción (Hasta hoy)
          </Text>
          <Text style={Style.text}>32</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Última Alimentación</Text>
          <Text style={Style.text}>2023/02/21 04:35 PM</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Último Medicamento</Text>
          <Text style={Style.text}>2023/02/21 04:35 PM - Acetaminofen</Text>
        </View>
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  ...Theme,
});
