import { View, Text, StyleSheet } from "react-native";
import Theme from "../../theme/theme";
import moment from "moment";
import { Constants } from "../../util";

export const ProductCompleteDetails = ({sowing}) => {
  const getDays = () => {
    return moment().diff(sowing.created_at, "days");
  }
  
  return (
    <View>
      <Text style={Style.subtitle}>Detalles</Text>
      <View style={Style.white_container}>
      <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Producto</Text>
          <Text style={Style.text}>{sowing.fish_step.fish.name}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Etapa</Text>
          <Text style={Style.text}>{sowing.fish_step.name}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Cantidad de peces</Text>
          <Text style={Style.text}>{sowing.total_fish}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Estanque</Text>
          <Text style={Style.text}>{sowing.pond.name}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Fecha de creación</Text>
          <Text style={Style.text}>{moment(sowing.created_at).format(Constants.DATETIME_FORMATS.DATETIME)}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>
            Días de producción (Hasta hoy)
          </Text>
          <Text style={Style.text}>{getDays()}</Text>
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
