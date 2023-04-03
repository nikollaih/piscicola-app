import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import {UsersList} from '../../components/users/List';
import FormFields from '../../json/forms/User';
import userStructure from '../../json/formsStructure/userStructure';
import {useForm} from '../../hooks/useForm';
import Style from '../../theme/theme';

export const Users = props => {
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Usuarios',
    subtitle: 'Lista',
    icon: 'ios-add',
  };

  /**
   * It opens the AddTank screen.
   */
  const openAddUser = () => {
    FormFields['structure'] = userStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddUser');
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddUser();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <UsersList navigation={props.navigation} />
      </View>
    </Layout>
  );
};
