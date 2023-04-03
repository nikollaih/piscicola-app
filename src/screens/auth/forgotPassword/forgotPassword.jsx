import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Alert} from '../../../components/alert/alert';
import Ionicon from 'react-native-vector-icons/Ionicons';
import dataStructure from '../../../json/login.json';
import {FillIconButton} from '../../../components/button/fillIconButton';
import {useState} from 'react';
import {Constants} from '../../../util';
import Style from '../style';
import {useAuth} from '../../../hooks/useAuth';
import {AuthServices} from '../../../services';

export const ForgotPassword = ({navigation}) => {
  const {setAuth} = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(dataStructure);
  const [alert, setAlert] = useState({show: false});

  const getCallAction = () => {
    return (
      <View style={Style.recover_password_item}>
        <Ionicon name="ios-call" color={Constants.COLORS.DARK} size={28} />
        <Text style={Style.recover_password_item_text}>
          Llamar al administrador
        </Text>
        <Text style={Style.recover_password_item_value}>3012233444</Text>
      </View>
    );
  };

  const getEmailAction = () => {
    return (
      <View style={Style.recover_password_item}>
        <Ionicon name="ios-at-circle" color={Constants.COLORS.DARK} size={35} />
        <Text style={Style.recover_password_item_text}>
          Enviar un email al admnistrador
        </Text>
        <Text style={Style.recover_password_item_value}>
          nikollaihernandez@gmail.com
        </Text>
      </View>
    );
  };

  const recoverPassword = async () => {
    try {
      if (!loading) {
        setLoading(true);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={Style.safe_area_view}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={Style.safe_area_view}>
        <View style={Style.main_container}>
          <ScrollView
            style={Style.scrollview}
            keyboardShouldPersistTaps="handled">
            <View style={Style.padding_container}>
              <Text style={Style.title}>¿Olvidó su contraseña?</Text>
              <Text style={Style.subtitle}>
                Escriba su correo electronico y presione el botón continuar
              </Text>
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
                    onChangeText={text => {
                      setData({...data, email: text});
                    }}
                    placeholder="Correo electrónico"
                    placeholderTextColor={Constants.COLORS.LIGHT_GRAY}
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Text style={Style.text_forgot_password}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <Alert
                  data={alert}
                  onClose={() => {
                    setAlert({show: false});
                  }}
                />
              </View>
              <FillIconButton
                title="Recuperar Contraseña"
                onPress={() => {
                  recoverPassword();
                }}
              />
              <View style={{marginVertical: 50}}>
                <Text style={[Style.subtitle, {marginBottom: 0}]}>
                  Para recuperar su contraseña puede utilizar uno de los siguientes medios:
                </Text>
                {getCallAction()}
                {getEmailAction()}
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
