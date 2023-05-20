import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Alert } from "../../../components/alert/alert";
import Ionicon from "react-native-vector-icons/Ionicons";
import dataStructure from "../../../json/login.json";
import { useState } from "react";
import { Constants, Texts, Utilities } from "../../../util";
import Fish from "../../../assets/images/fish.png";
import Style from "../style";
import { useAuth } from "../../../hooks/useAuth";
import { AuthServices, ProductiveUnitsServices } from "../../../services";

export const Login = ({ navigation }) => {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState(dataStructure);
  const [alert, setAlert] = useState({ show: false });

  const getButtonColor = () => {
    return data.email && data.password
      ? Constants.COLORS.SOFT_YELLOW
      : Constants.COLORS.GRAY;
  };

  const doLogin = async () => {
    try {
      if (!loading) {
        setLoading(true);
        let response = await AuthServices.login(data.email, data.password);
        let jsonResponse = await response.json();
        if (response.status != 200) {
          Utilities.showErrorFecth(jsonResponse);
          setLoading(false);
        } else {
          onSuccessLogin(jsonResponse);
        }
      }
    } catch (error) {
      if (error == Constants.CONFIG.CONNECTION_ERROR_RESPONSE)
        setAlert({
          text: Texts.error.network_fetch,
          type: "error",
          show: true,
        });
      setLoading(false);
    }
  };

  const onSuccessLogin = async (user) => {
    if (user?.profile?.user_type_id != Constants.USERS_TYPES.ADMIN) {
      let productiveUnit = await getProductiveUnit(user);
      if (productiveUnit == false || productiveUnit?.data.length <= 0)
        setAlert({
          text: Texts.error.no_productive_unit,
          type: "error",
          show: true,
        });
      else {
        user["productive_unit"] = productiveUnit.data[0];
        setAuth(user, data);
        navigation.replace("Home");
      }
    } else {
      setAuth(user, data);
      navigation.replace("Home");
    }
  };

  const getProductiveUnit = async (user) => {
    try {
      let response = await ProductiveUnitsServices.get(user.token);
      let jsonResponse = await response.json();
      return response.status == 200 ? jsonResponse : false;
    } catch (error) {
      return false;
    }
  };

  return (
    <SafeAreaView style={Style.safe_area_view}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={Style.safe_area_view}
      >
        <View style={Style.main_container}>
          <ScrollView
            style={Style.scrollview}
            keyboardShouldPersistTaps="handled"
          >
            <View style={Style.padding_container}>
              <Text style={Style.title}>Bienvenido</Text>
              <Text style={Style.subtitle}>
                Ingrese sus datos para continuar
              </Text>
              <View style={Style.circle}>
                <Image source={Fish} style={Style.logo} />
                <View style={[Style.inside_circle, Style.yellow_circle]} />
                <View style={[Style.inside_circle, Style.blue_circle]} />
                <View style={[Style.inside_circle, Style.primary_circle]} />
                <View style={[Style.inside_circle, Style.green_circle]} />
                <View style={[Style.inside_circle, Style.red_circle]} />
              </View>
              <View>
                <View style={Style.container_input}>
                  <Ionicon
                    name="ios-person"
                    size={20}
                    color={Constants.COLORS.GRAY}
                    style={Style.icon_input}
                  />
                  <TextInput
                    style={Style.text_input}
                    value={data.email}
                    onChangeText={(text) => {
                      setData({ ...data, email: text });
                    }}
                    placeholder="Correo electrónico"
                    placeholderTextColor={Constants.COLORS.LIGHT_GRAY}
                  />
                </View>
                <View style={Style.container_input}>
                  <Ionicon
                    name="ios-lock-closed"
                    size={20}
                    color={Constants.COLORS.GRAY}
                    style={Style.icon_input}
                  />
                  <TextInput
                    style={Style.text_input}
                    value={data.password}
                    onChangeText={(text) => {
                      setData({ ...data, password: text });
                    }}
                    placeholder="Password"
                    placeholderTextColor={Constants.COLORS.LIGHT_GRAY}
                    secureTextEntry={showPassword}
                  />
                  <TouchableOpacity
                    activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    <Ionicon
                      name={showPassword ? "ios-eye-off" : "ios-eye"}
                      size={20}
                      color={Constants.COLORS.GRAY}
                      style={[Style.icon_input, Style.icon_show_password]}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
                  onPress={() => {
                    navigation.navigate("ForgotPassword");
                  }}
                >
                  <Text style={Style.text_forgot_password}>
                    ¿Olvidó su contraseña?
                  </Text>
                </TouchableOpacity>
                <Alert
                  data={alert}
                  onClose={() => {
                    setAlert({ show: false });
                  }}
                />
              </View>
              <View style={[Style.row_between, Style.button_container]}>
                <Text style={[Style.text_signin]}>Continuar</Text>
                <TouchableOpacity
                  activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
                  style={[
                    Style.button_signin,
                    { backgroundColor: getButtonColor() },
                  ]}
                  onPress={() => {
                    doLogin();
                  }}
                >
                  {loading ? (
                    <ActivityIndicator color={Constants.COLORS.WHITE} />
                  ) : (
                    <Ionicon
                      name="ios-arrow-forward-outline"
                      size={30}
                      color={Constants.COLORS.WHITE}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
