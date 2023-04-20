import {View, Text, SafeAreaView} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import {useEffect} from 'react';

export const Switch = (props) => {
  const {getAuth} = useAuth();

  /**
   * If the user is logged in, then navigate to the Home screen, otherwise navigate to the Login screen
   */
  const getLoggedUser = async () => {
    const responseUser = await getAuth();
    (!responseUser || !responseUser?.profile) ? props.navigation.replace("Login") : props.navigation.replace("Home");
  };

  useEffect(() => {
    getLoggedUser();
  }, []);
  return (
    <SafeAreaView>
      <Text>Cargando</Text>
    </SafeAreaView>
  );
};
