import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { Constants } from "../../util";
import Theme from '../../theme/theme';

export const RightButtonsBiomasses = ({navigation, sowing, onFilter = () => {}}) => {
    return (
        <View style={[Style.row_between, { width: 75 }]}>
            <TouchableOpacity
                activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
                onPress={() => {
                    navigation.navigate("ChartsBiomasses", {sowing: sowing});
                }}
            >
                <Ionicon
                    name={"analytics"}
                    size={30}
                    color={Constants.COLORS.DARK}
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
                onPress={() => {
                    navigation.navigate("AddBiomasse", {sowing: sowing});
                }}
            >
                <Ionicon name={"ios-add"} size={32} color={Constants.COLORS.DARK} />
            </TouchableOpacity>
        </View>
    );
};

const Style = StyleSheet.create({
    ...Theme
})
