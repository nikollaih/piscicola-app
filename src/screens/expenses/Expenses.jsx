import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { ExpensesList } from '../../components/expenses/List';
import FormFields from '../../json/forms/Pond';
import pondStructure from '../../json/formsStructure/pondStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const Expenses = props => {
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Gastos',
    subtitle: 'Lista',
    icon: 'ios-add',
  };

  /**
   * It opens the AddTank screen.
   */
  const openAddSupply = () => {
    FormFields['structure'] = pondStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddSupply');
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddSupply();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <ExpensesList navigation={props.navigation} />
      </View>
    </Layout>
  );
};
