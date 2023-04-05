import { View, Text, Image, ScrollView } from "react-native";
import { Layout } from "../Layout";
import { useEffect, useState } from "react";
import Avatar from "../../assets/images/avatar.png";
import { UserHome } from "./userHome";
import { AdminHome } from "./adminHome";
import { useAuth } from "../../hooks/useAuth";
import Style from "./style";

export const Home = (props) => {
  const rol = 2;
  const { getAuth } = useAuth();
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
                style={Style.name_user}
              >{`${loggedUser?.first_name} ${loggedUser?.last_name}`}</Text>
            </View>
            <Image style={Style.avatar} source={Avatar} />
          </View>
          {rol == 1 ? (
            <AdminHome navigation={props.navigation} />
          ) : (
            <UserHome navigation={props.navigation} />
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};
