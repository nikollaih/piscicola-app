import { View, Text, TouchableOpacity } from "react-native";
import { Constants, Utilities } from "../../util";
import { useEffect } from "react";
import { ProductiveUnitsList } from "../../components/productiveUnits/List";
import Ionicon from "react-native-vector-icons/Ionicons";
import Theme from "../../theme/theme";

export const AdminHome = ({
  navigation,
  refresh,
  setFinishRefresh = () => {},
}) => {
  
  return (
    <View>
      <View style={Theme.row_between}>
        <Text style={Theme.subtitle}>Unidades Productivas</Text>
        <TouchableOpacity
          activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
          onPress={() => {
            navigation.navigate("EditProductiveUnit");
          }}
        >
          <Ionicon name="ios-add" color={Constants.COLORS.DARK} size={30} />
        </TouchableOpacity>
      </View>
      <ProductiveUnitsList
        setFinishRefresh={() => {
          setFinishRefresh();
        }}
        refresh={refresh}
        navigation={navigation}
      />
    </View>
  );
};
