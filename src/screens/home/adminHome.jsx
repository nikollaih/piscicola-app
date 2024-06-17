import { View, Text, TouchableOpacity } from "react-native";
import { Constants } from "../../util";
import Ionicon from "react-native-vector-icons/Ionicons";
import Theme from "../../theme/theme";
import {AssociationsList} from "../../components/associations/List";

export const AdminHome = ({
  navigation,
  refresh,
  setFinishRefresh = () => {},
}) => {
  
  return (
    <View>
      <View style={Theme.row_between}>
        <Text style={Theme.subtitle}>Asociaciones</Text>
        <TouchableOpacity
          activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
          onPress={() => {
            navigation.navigate("EditAssociation");
          }}
        >
          <Ionicon name="ios-add" color={Constants.COLORS.DARK} size={30} />
        </TouchableOpacity>
      </View>
      <AssociationsList
        setFinishRefresh={() => {
          setFinishRefresh();
        }}
        refresh={refresh}
        navigation={navigation}
      />
    </View>
  );
};
