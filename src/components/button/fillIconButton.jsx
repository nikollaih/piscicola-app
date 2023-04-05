import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Constants} from '../../util';

export const FillIconButton = ({
  title,
  icon,
  saving = false,
  fill = Constants.COLORS.PRIMARY,
  style = {},
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
      style={[
        Style.container,
        {
          backgroundColor: fill,
          ...style,
        },
      ]}
      onPress={() => {
        onPress();
      }}>
      {saving ? (
        <ActivityIndicator style={Style.icon} color={Constants.COLORS.WHITE} />
      ) : (
        <Ionicon
          style={Style.icon}
          name={icon}
          color={Constants.COLORS.WHITE}
          size={20}
        />
      )}
      <Text style={Style.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 45
  },
  title: {
    color: Constants.COLORS.WHITE,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});
