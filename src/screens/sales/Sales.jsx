import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { SalesList } from '../../components/sales/List';
import FormFields from '../../json/forms/Sale';
import saleStructure from '../../json/formsStructure/saleStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const Sales = props => {
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Ventas',
    subtitle: 'Lista',
    icon: null
  };



  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          navigation={props.navigation}
          data={breadcrumb}
        />
        <SalesList navigation={props.navigation} />
      </View>
    </Layout>
  );
};
