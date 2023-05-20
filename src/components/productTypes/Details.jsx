import { ScrollView, Text, View, StyleSheet, Alert } from "react-native";
import Theme from "../../theme/theme";
import moment from "moment";
import { Constants, Utilities, Texts } from "../../util";
import { ProductTypesServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import { DetailsActions } from "../detailsActions/detailsActions";

export const ProductTypeDetails = ({
  productType,
  navigation,
  onClose = () => {},
  onDelete = () => {},
}) => {
  const { getAuth } = useAuth();
  
  const onEdit = () => {
    onClose();
    navigation.navigate("AddProductType", { productType: productType });
  };

  const onRemove = async () => {
    try {
      const loggedUser = await getAuth();
      let response = await ProductTypesServices.remove(
        loggedUser.token,
        productType.id
      );
      if (response.status == 200) {
        Utilities.showAlert({
          title: Texts.success.title,
          text: Texts.success.productType.delete,
          type: "success",
        });
        onDelete();
      } else Utilities.showAlert({});
    } catch (error) {
      Utilities.showAlert({});
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "¿Está seguro?",
      "Desea eliminar el usuario",
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
          <Text style={Style.inside_subtitle}>Fecha de creación</Text>
          <Text style={Style.text}>
            {moment(productType.created_at).format(
              Constants.DATETIME_FORMATS.DATE
            )}
          </Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Descripción</Text>
          <Text style={Style.text}>{productType.description} </Text>
        </View>
      </ScrollView>
      <DetailsActions onDelete={confirmDelete} onEdit={onEdit} />
    </View>
  );
};

const Style = StyleSheet.create({
  ...Theme,
});
