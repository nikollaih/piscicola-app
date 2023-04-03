import {View, Text, Image, ScrollView} from 'react-native';
import {Layout} from '../Layout';
import {useEffect, useState} from 'react';
import Avatar from '../../assets/images/avatar.png';
import {ProductsList} from '../../components/products/List';
import {ExpensesList} from '../../components/expenses/List';
import {useAuth} from '../../hooks/useAuth';
import Style from './style';

export const Home = props => {
  const {getAuth} = useAuth();
  const [loggedUser, setLoggedUser] = useState({});

  /**
   * GetLoggedUser() is an async function that calls getAuth() and sets the response to the state of
   * loggedUser
   */
  const getLoggedUser = async () => {
    const responseUser = await getAuth();
    setLoggedUser(responseUser);
  };

  useEffect(() => {
    getLoggedUser();
  }, []);

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <ScrollView style={Style.scrollview}>
        <View style={Style.main_page}>
          <View style={Style.user_container}>
            <View>
              <Text style={Style.text_user}>Hola</Text>
              <Text
                style={
                  Style.name_user
                }>{`${loggedUser?.first_name} ${loggedUser?.last_name}`}</Text>
            </View>
            <Image style={Style.avatar} source={Avatar} />
          </View>

          <Text style={Style.subtitle}>Productos</Text>
          <View style={Style.container_products}>
            <ProductsList
              navigation={props.navigation}
              orientation={'horizontal'}
            />
          </View>
          <Text style={Style.subtitle}>Últimos gastos</Text>
          <ExpensesList navigation={props.navigation} />
        </View>
      </ScrollView>
    </Layout>
  );
};
