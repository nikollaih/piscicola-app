import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Constants} from '../../util';
import Theme from '../../theme/theme';
import Ionicon from 'react-native-vector-icons/Ionicons';

export const Breadcrumb = ({
  navigation,
  data = {},
  onPressRight = () => {},
}) => {
  return (
    <View style={Style.user_container}>
      <View>
        <Text style={Style.text_user}>{data.subtitle}</Text>
        <Text style={Style.name_user}>{data.title}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
        onPress={() => {
          data.screen ? navigation.navigate(data.screen) : onPressRight();
        }}>
        <Ionicon name={data.icon} size={30} color={Constants.COLORS.DARK} />
      </TouchableOpacity>
    </View>
  );
};

const Style = StyleSheet.create({
  ...Theme,
});
