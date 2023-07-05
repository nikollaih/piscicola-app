import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { PaymentTypesList } from '../../components/paymentTypes/List';
import FormFields from '../../json/forms/paymentType';
import paymentTypeStructure from '../../json/formsStructure/paymentTypeStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const PaymentTypes = props => {
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Tipos de pago',
    subtitle: 'Lista',
    icon: 'ios-add'
  };

  /**
   * It opens the AddPaymentType screen.
   */
  const openAddPaymentType = () => {
    FormFields['structure'] = paymentTypeStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddPaymentType');
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddPaymentType();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <PaymentTypesList navigation={props.navigation} />
      </View>
    </Layout>
  );
};
