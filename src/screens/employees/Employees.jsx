import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { EmployeesList } from '../../components/employees/List';
import FormFields from '../../json/forms/Employee';
import employeeStructure from '../../json/formsStructure/employeeStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const Employees = props => {
  const {dataForm, setDataForm} = useForm();
  const internalRoleId = props.route.params?.internal_role_id;

  const breadcrumb = {
    title: (internalRoleId === 2) ? "Empleados" : "Clientes",
    subtitle: 'Lista',
    icon: 'ios-add'
  };

  /**
   * It opens the AddEmployee screen.
   */
  const openAddEmployee = () => {
    FormFields['structure'] = employeeStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddEmployee', { internal_role_id: internalRoleId });
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddEmployee();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <EmployeesList navigation={props.navigation} internalRoleId={internalRoleId} />
      </View>
    </Layout>
  );
};
