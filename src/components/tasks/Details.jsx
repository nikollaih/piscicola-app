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
  import { TasksServices } from "../../services";
  import { useAuth } from "../../hooks/useAuth";
  
  export const TaskDetails = ({
    task,
    navigation,
    onClose = () => {},
    onDelete = () => {},
  }) => {
    const { getAuth } = useAuth();
    const onEdit = () => {
      onClose();
      navigation.navigate("AddTask", { task: task });
    };
  
    const onRemove = async () => {
      try {
        const loggedUser = await getAuth();
        let response = await TasksServices.remove(
          loggedUser.token,
          task.id
        );
        let jsonResponse = await response.json();
        if (response.status == 200) {
          Utilities.showAlert({
            title: Texts.success.title,
            text: Texts.success.task.delete,
            type: "success",
          });
          onDelete();
        } else {
          if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
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
        "Desea eliminar la tarea",
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
            <Text style={Style.text}>{task.description}</Text>
          </View>
          <View style={Style.list_container}>
            <Text style={Style.inside_subtitle}>Fecha de creación</Text>
            <Text style={Style.text}>
              {moment(task.created_at).format(
                Constants.DATETIME_FORMATS.DATE
              )}
            </Text>
          </View>
        </ScrollView>
        <DetailsActions onDelete={confirmDelete} onEdit={onEdit} />
      </View>
    );
  };
  
  const Style = StyleSheet.create({
    ...Theme,
  });
  