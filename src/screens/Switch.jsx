import {Image, Text, SafeAreaView, StyleSheet} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import {useEffect} from 'react';
import Theme from '../theme/theme';
import Fish from '../assets/images/fish2.gif';
import { Constants } from '../util';

export const Switch = (props) => {
  const {getAuth} = useAuth();

  /**
   * If the user is logged in, then navigate to the Home screen, otherwise navigate to the Login screen
   */
  const getLoggedUser = async () => {
    const responseUser = await getAuth();
    setTimeout(() => {
      (!responseUser || !responseUser?.profile) ? props.navigation.replace("Login") : props.navigation.replace("Home");
    }, 3000)
  };

  useEffect(() => {
    getLoggedUser();
  }, []);
  return (
    <SafeAreaView style={Style.container}>
      <Image style={Style.fish}  source={Fish} />
      <Text style={Style.text}>Cargando</Text>
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  container: {
    backgroundColor: Constants.COLORS.PRIMARY,
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  fish: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  text: {
    ...Theme.font_roboto_bold,
    marginTop: 15,
    color: Constants.COLORS.WHITE
  }
})