import { ScrollView, Text, View, StyleSheet, Alert } from "react-native";
import { Constants, Utilities, Texts } from "../../util";
import Theme from "../../theme/theme";
import moment from "moment";
import { DetailsActions } from "../detailsActions/detailsActions";
import { PaymentDetailsServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";

export const PaymentDetailDetails = ({
  paymentDetail,
  navigation,
  onClose = () => {},
  onDelete = () => {},
}) => {
  const { getAuth } = useAuth();
  const onEdit = () => {
    onClose();
    navigation.navigate("AddPaymentDetail", { paymentDetail: paymentDetail });
  };

  const onRemove = async () => {
    try {
      const loggedUser = await getAuth();
      let response = await PaymentDetailsServices.remove(
        loggedUser.token,
        paymentDetail.id
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
        if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken({ force: true, navigation: navigation });
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
          <Text style={Style.inside_subtitle}>Concepto</Text>
          <Text style={Style.text}>{paymentDetail.payment_concept.name}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Valor</Text>
          <Text style={Style.text}>{`$${paymentDetail.value.toLocaleString("es-CO")}`}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Fecha de registro</Text>
          <Text style={Style.text}>
            {moment(paymentDetail.manual_created_at).format(
              Constants.DATETIME_FORMATS.DATETIME
            )}
          </Text>
        </View>
        {paymentDetail.started_at ? (
          <View style={Style.list_container}>
            <Text style={Style.inside_subtitle}>Fecha de inicio</Text>
            <Text style={Style.text}>
              {moment(paymentDetail.started_at).format(
                Constants.DATETIME_FORMATS.DATETIME
              )}
            </Text>
          </View>
        ) : null}
        {paymentDetail.started_at ? (
          <View style={Style.list_container}>
            <Text style={Style.inside_subtitle}>Fecha de finalización</Text>
            <Text style={Style.text}>
              {moment(paymentDetail.finished_at).format(
                Constants.DATETIME_FORMATS.DATETIME
              )}
            </Text>
          </View>
        ) : null}
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Notas</Text>
          <Text style={Style.text}>{paymentDetail?.note}</Text>
        </View>
      </ScrollView>
      <DetailsActions onDelete={confirmDelete} onEdit={onEdit} />
    </View>
  );
};

const Style = StyleSheet.create({
  ...Theme,
});
