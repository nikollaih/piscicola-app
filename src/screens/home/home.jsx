import { View, Text, Image, ScrollView, RefreshControl } from "react-native";
import { Layout } from "../Layout";
import { useEffect, useState } from "react";
import Avatar from "../../assets/images/avatar.png";
import { UserHome } from "./userHome";
import { AdminHome } from "./adminHome";
import { useAuth } from "../../hooks/useAuth";
import Style from "./style";

export const Home = (props) => {
  const { getAuth } = useAuth();
  const [loggedUser, setLoggedUser] = useState({});
  const [refresh, setRefresh] = useState(false);

  /**
   * GetLoggedUser() is an async function that calls getAuth() and sets the response to the state of
   * loggedUser
   */
  const getLoggedUser = async () => {
    const responseUser = await getAuth();
    setLoggedUser(responseUser);
  };

  const onRefresh = () => {
    setRefresh(true);
  };

  useEffect(() => {
    getLoggedUser();
  }, []);

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        style={Style.scrollview}
      >
        <View style={Style.main_page}>
          <View style={Style.user_container}>
            <View>
              <Text style={Style.text_user}>Hola</Text>
              <Text style={Style.name_user}>
                {loggedUser?.profile?.full_name}
              </Text>
            </View>
          </View>
          {loggedUser?.profile?.user_type_id == 1 ? (
            <AdminHome
              setFinishRefresh={() => {
                setRefresh(false);
              }}
              refresh={refresh}
              navigation={props.navigation}
            />
          ) : null}
          {loggedUser?.profile?.user_type_id == 2 ? (
            <UserHome navigation={props.navigation} />
          ) : null}
        </View>
      </ScrollView>
    </Layout>
  );
};
