import { ScrollView, Text, View, StyleSheet } from "react-native";
import Theme from "../../theme/theme";
import moment from "moment";
import { Constants } from "../../util";
import { DetailsActions } from "../detailsActions/detailsActions";

export const StepDetails = ({ step, navigation, onClose = () => {} }) => {
  const onEdit = () => {
    onClose();
    navigation.navigate("AddStep", { step: step });
  };

  return (
    <View style={Style.full_flex}>
      <ScrollView style={Style.full_flex}>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Fecha de creación</Text>
          <Text style={Style.text}>
            {moment(step.created_at).format(Constants.DATETIME_FORMATS.DATE)}
          </Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Descripción</Text>
          <Text style={Style.text}>{step.description} </Text>
        </View>
      </ScrollView>
      <DetailsActions onEdit={onEdit} />
    </View>
  );
};

const Style = StyleSheet.create({
  ...Theme,
});
