import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { TasksList } from '../../components/tasks/List';
import FormFields from '../../json/forms/Task';
import taskStructure from '../../json/formsStructure/taskStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const Tasks = props => {
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Tareas',
    subtitle: 'Lista',
    icon: 'ios-add'
  };

  /**
   * It opens the AddTask screen.
   */
  const openAddTask = () => {
    FormFields['structure'] = taskStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddTask');
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddTask();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <TasksList navigation={props.navigation} />
      </View>
    </Layout>
  );
};
