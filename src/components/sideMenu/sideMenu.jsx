import {
  View,
  Alert,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {FillIconButton} from '../button/fillIconButton';
import Fish from '../../assets/images/fish.png';
import Ionicon from 'react-native-vector-icons/Ionicons';
import menuItems from './menuItems';
import Style from './style';
import {Constants} from '../../util';
import {useAuth} from '../../hooks/useAuth';

export const SideMenuDom = ({navigation, route, onOpenLink = () => {}}) => {
  const {logout} = useAuth();

  const openLink = linkData => {
    onOpenLink();
    navigation.navigate(linkData.screen);
  };

  /**
   * If the current route is the same as the item's screen, return the primary color, otherwise return
   * the secondary color
   * @returns The color of the item.
   */
  const getItemColor = (item, secondaryColor = Constants.COLORS.GRAY) => {
    return route.name == item.screen
      ? Constants.COLORS.PRIMARY
      : secondaryColor;
  };

  /**
   * A function that asks the user if he wants to log out.
   */
  const doLogout = () => {
    Alert.alert(
      '¿Está seguro?',
      'Desea cerrar la sesión',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          onPress: () => {
            logout(navigation);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const keyExtractor = item => item.title.toString();

  const renderRow = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          Style.item_container,
          {borderLeftColor: getItemColor(item, Constants.COLORS.WHITE)},
        ]}
        onPress={() => {
          openLink({screen: item.screen});
        }}>
        <Ionicon
          size={24}
          color={getItemColor(item)}
          name={item.icon}
          style={Style.item_icon}
        />
        <Text style={[Style.item_text, {color: getItemColor(item)}]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={Style.container}>
      <View style={Style.top_container}>
        <View style={Style.logo_container}>
          <Image source={Fish} style={Style.logo} />
        </View>
        <View style={Style.name_container}>
          <Text style={Style.name}>Asorobles</Text>
          <TouchableOpacity
            activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
            onPress={() => {
              openLink({screen: 'ProductiveUnit'});
            }}>
            <Ionicon name="ios-cog" color={Constants.COLORS.DARK} size={22} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        data={menuItems}
        initialNumToRender={5}
        windowSize={10}
        removeClippedSubviews={false}
        keyExtractor={keyExtractor}
        renderItem={renderRow}
      />
      <View style={Style.bottom_container}>
        <FillIconButton
          fill={Constants.COLORS.PRIMARY}
          title="Cerrar Sesión"
          icon="ios-log-out-outline"
          onPress={() => {
            doLogout();
          }}
        />
      </View>
    </SafeAreaView>
  );
};
