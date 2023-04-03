import {View, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Constants} from '../../util';
import Style from './style';

export const Header = ({navigation, onMenu = () => {}}) => {
  return (
    <View style={[Style.container]}>
      {navigation.canGoBack() ? (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicon
            name="ios-arrow-back"
            color={Constants.COLORS.DARK}
            size={30}
          />
        </TouchableOpacity>
      ) : <View/>}
      <TouchableOpacity
        onPress={() => {
          onMenu();
        }}>
        <Ionicon
          name="md-ellipsis-horizontal"
          color={Constants.COLORS.DARK}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};
