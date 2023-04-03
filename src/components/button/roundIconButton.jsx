import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Constants} from '../../util';
import Theme from '../../theme/theme';

export const RoundIconButton = ({
  title,
  icon,
  fill = Constants.COLORS.PRIMARY,
  size = 50,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      style={{width: size + 40, alignItems: "center"}}
      activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
      onPress={() => {
        onPress();
      }}>
      <View
        style={[
          Style.container,
          {
            backgroundColor: fill,
            borderRadius: size / 2,
            width: size,
            height: size,
          },
        ]}>
        <Ionicon
          style={Style.icon}
          name={icon}
          color={Constants.COLORS.WHITE}
          size={24}
        />
      </View>
      <Text style={Style.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inside: {},
  title: {
    color: Constants.COLORS.DARK,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});
