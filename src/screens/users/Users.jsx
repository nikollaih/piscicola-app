import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import {UsersList} from '../../components/users/List';
import FormFields from '../../json/forms/User';
import userStructure from '../../json/formsStructure/userStructure';
import {useForm} from '../../hooks/useForm';
import Style from '../../theme/theme';

export const Users = props => {
  const productiveUnit = props.route.params?.productive_unit;
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Usuarios',
    subtitle: productiveUnit?.name,
    icon: 'ios-add',
  };

  /**
   * It opens the AddTank screen.
   */
  const openAddUser = () => {
    FormFields['structure'] = userStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddUser', {productive_unit: productiveUnit});
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
        <UsersList productiveUnit={productiveUnit} navigation={props.navigation} />
      </View>
    </Layout>
  );
};
