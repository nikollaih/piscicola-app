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
  import { TaskLogsServices } from "../../services";
  import { useAuth } from "../../hooks/useAuth";
  
  export const TaskLogDetails = ({
    taskLog,
    navigation,
    onClose = () => {},
    onDelete = () => {},
  }) => {
    const { getAuth } = useAuth();
    const onEdit = () => {
      onClose();
      navigation.navigate("AddTaskLog", { taskLog: taskLog });
    };
  
    const onRemove = async () => {
      try {
        const loggedUser = await getAuth();
        let response = await TaskLogsServices.remove(
          loggedUser.token,
          taskLog.id
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
            <Text style={Style.inside_subtitle}>Empleado</Text>
            <Text style={Style.text}>{taskLog.employee.full_name}</Text>
          </View>
          <View style={Style.list_container}>
            <Text style={Style.inside_subtitle}>Fecha y hora de inicio</Text>
            <Text style={Style.text}>
              {moment(taskLog.started_at).format(
                Constants.DATETIME_FORMATS.DATETIME
              )}
            </Text>
          </View>
          <View style={Style.list_container}>
            <Text style={Style.inside_subtitle}>Fecha y hora final</Text>
            <Text style={Style.text}>
              {moment(taskLog.finished_at).format(
                Constants.DATETIME_FORMATS.DATETIME
              )}
            </Text>
          </View>
          <View style={Style.list_container}>
            <Text style={Style.inside_subtitle}>Duración</Text>
            <Text style={Style.text}>
              {moment(taskLog.finished_at).diff(moment(taskLog.started_at), "minutes")} minutos
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
  