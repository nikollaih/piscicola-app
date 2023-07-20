import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { PaymentDetailsList } from '../../components/paymentDetails/List';
import FormFields from '../../json/forms/paymentDetails';
import paymentDetailsStructure from '../../json/formsStructure/paymentDetailsStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const PaymentDetails = props => {
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Pagos',
    subtitle: 'Lista',
    icon: 'ios-add'
  };

  /**
   * It opens the AddPaymentDetail screen.
   */
  const openAddPaymentDetail = () => {
    FormFields['structure'] = paymentDetailsStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddPaymentDetail');
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddPaymentDetail();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <PaymentDetailsList navigation={props.navigation} />
      </View>
    </Layout>
  );
};
