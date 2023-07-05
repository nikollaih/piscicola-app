import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { TaskLogsList } from '../../components/taskLogs/List';
import FormFields from '../../json/forms/taskLog';
import taskLogStructure from '../../json/formsStructure/taskLogStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const TaskLogs = props => {
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Registro de tareas',
    subtitle: 'Lista',
    icon: 'ios-add'
  };

  /**
   * It opens the AddTaskLog screen.
   */
  const openAddTaskLog = () => {
    FormFields['structure'] = taskLogStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddTaskLog');
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddTaskLog();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <TaskLogsList navigation={props.navigation} />
      </View>
    </Layout>
  );
};
