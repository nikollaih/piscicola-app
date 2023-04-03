import {View, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import {useState} from 'react';
import SideMenu from 'react-native-side-menu-updated';
import {SideMenuDom} from '../components/sideMenu/sideMenu';
import {Header} from '../components/header/header';
import {Constants} from '../util';

export const Layout = ({navigation, children, route}) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
      <SafeAreaView style={Style.container}>
        <SideMenu
          navigation={navigation}
          menuPosition="right"
          overlayColor={Constants.COLORS.SOFT_BLACK_TRANSPARENT}
          onChange={status => {
            setShowMenu(status);
          }}
          isOpen={showMenu}
          menu={
            <SideMenuDom
              navigation={navigation}
              route={route}
              onOpenLink={() => {
                setShowMenu(false);
              }}
            />
          }>
          <View style={Style.container}>
            <Header
              navigation={navigation}
              onMenu={() => {
                setShowMenu(!showMenu);
              }}
            />
            {children}
          </View>
        </SideMenu>
      </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.COLORS.IOS_BACKGROUND_GRAY,
    alignSelf: "stretch"
  },
});
