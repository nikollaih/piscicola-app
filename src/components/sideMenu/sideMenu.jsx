import {
  View,
  Alert,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { FillIconButton } from "../button/fillIconButton";
import Fish from "../../assets/images/fish.png";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import menuItems from "./menuItems";
import Style from "./style";
import { Constants } from "../../util";
import { useAuth } from "../../hooks/useAuth";

export const SideMenuDom = ({ navigation, route, onOpenLink = () => {} }) => {
  const { logout, getAuth } = useAuth();
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    setInitialData();
  }, [setLoggedUser]);

  const setInitialData = async () => {
    let loggedUser = await getAuth();
    setLoggedUser({ ...loggedUser });
  };

  const openLink = (linkData) => {
    onOpenLink();
    navigation.navigate(linkData.screen, {productive_unit: loggedUser?.productive_unit});
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
      "¿Está seguro?",
      "Desea cerrar la sesión",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Cerrar Sesión",
          onPress: () => {
            logout(navigation);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const getIcon = (itemMenu) => {
    switch (itemMenu.iconLibrary) {
      case "material":
        return (
          <MaterialIcon
            size={24}
            color={getItemColor(itemMenu)}
            name={itemMenu.icon}
            style={Style.item_icon}
          />
        );
        break;

      default:
        return (
          <Ionicon
            size={24}
            color={getItemColor(itemMenu)}
            name={itemMenu.icon}
            style={Style.item_icon}
          />
        );
        break;
    }
  };

  const keyExtractor = (item) => item.title.toString();

  const renderRow = ({ item }) => {
    if (
      !item?.users_type ||
      item?.users_type.includes(loggedUser?.profile?.user_type_id)
    )
      return (
        <TouchableOpacity
          activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
          style={[
            Style.item_container,
            { borderLeftColor: getItemColor(item, Constants.COLORS.WHITE) },
          ]}
          onPress={() => {
            openLink({ screen: item.screen });
          }}
        >
          {getIcon(item)}
          <Text style={[Style.item_text, { color: getItemColor(item) }]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    else return null;
  };

  return (
    <SafeAreaView style={Style.container}>
      <View style={Style.top_container}>
        <View style={Style.logo_container}>
          <Image source={Fish} style={Style.logo} />
        </View>
        <View style={Style.name_container}>
          <Text style={Style.name}>{loggedUser?.productive_unit?.name}</Text>
          {loggedUser?.profile?.user_type_id ==
          Constants.USERS_TYPES.UNIT_MANAGER ? (
            <TouchableOpacity
              activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
              onPress={() => {
                openLink({ screen: "ProductiveUnit" });
              }}
            >
              <Ionicon name="ios-cog" color={Constants.COLORS.DARK} size={22} />
            </TouchableOpacity>
          ) : <Text style={Style.name}>Menú</Text>}
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
