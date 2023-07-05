import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Alert,
    TouchableOpacity,
  } from "react-native";
  import { Constants, Utilities, Texts } from "../../util";
  import Theme from "../../theme/theme";
  import moment from "moment";
  import { DetailsActions } from "../detailsActions/detailsActions";
  import { PaymentTypesServices } from "../../services";
  import { useAuth } from "../../hooks/useAuth";
  
  export const PaymentTypeDetails = ({
    paymentType,
    navigation,
    onClose = () => {},
    onDelete = () => {},
  }) => {
    const { getAuth } = useAuth();
    const onEdit = () => {
      onClose();
      navigation.navigate("AddPaymentType", { paymentType: paymentType });
    };
  
    const onRemove = async () => {
      try {
        const loggedUser = await getAuth();
        let response = await PaymentTypesServices.remove(
          loggedUser.token,
          paymentType.id
        );
        let jsonResponse = await response.json();
        if (response.status == 200) {
          Utilities.showAlert({
            title: Texts.success.title,
            text: Texts.success.task_log.delete,
            type: "success",
          });
          onDelete();
        } else {
          if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
            refreshToken({force:true, navigation: navigation});
            onRemove();
          } else Utilities.showErrorFecth(jsonResponse);
        }
      } catch (error) {
        Utilities.showAlert({});
      }
    };
  
    const confirmDelete = () => {
      Alert.alert(
        "¿Está seguro?",
        "Desea eliminar el registro de tarea",
        [
          {
            text: "Cancelar",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: async () => {
              onRemove();
            },
          },
        ],
        { cancelable: true }
      );
    };
  
    return (
      <View style={Style.full_flex}>
        <ScrollView style={Style.full_flex}>
          <View style={Style.list_container}>
            <Text style={Style.inside_subtitle}>Descripción</Text>
            <Text style={Style.text}>{paymentType.description}</Text>
          </View>
          <View style={Style.list_container}>
            <Text style={Style.inside_subtitle}>Requiere fechas</Text>
            <Text style={Style.text}>{paymentType.required_time ? "Si" : "No"}</Text>
          </View>
        </ScrollView>
        <DetailsActions onDelete={confirmDelete} onEdit={onEdit} />
      </View>
    );
  };
  
  const Style = StyleSheet.create({
    ...Theme,
  });
  