import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Constants} from '../../util';
import Ionicon from 'react-native-vector-icons/Ionicons';

export const Alert = ({data, onClose = () => {}}) => {
  return data.show ? (
    <View style={Style.container}>
      <Text style={Style.text}>
        {data?.text}
      </Text>
      <TouchableOpacity
        activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
        onPress={() => {
          onClose();
        }}
        style={Style.icon}>
        <Ionicon
          name="ios-close"
          color={Constants.COLORS.WHITE}
          size={20}
        />
      </TouchableOpacity>
    </View>
  ) : null;
};

const Style = StyleSheet.create({
  container: {
    backgroundColor: Constants.COLORS.RED,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  text: {
    flex: 1,
    color: Constants.COLORS.WHITE,
  },
  icon: {
    width: 30,
    alignItems: "flex-end"
  },
});
