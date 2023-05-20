import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { ProductsList } from '../../components/products/List';
import FormFields from '../../json/forms/Products';
import productsStructure from '../../json/formsStructure/productsStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const Products = props => {
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Cosechas',
    subtitle: 'Lista',
    icon: 'ios-add'
  };

  /**
   * It opens the AddProducts screen.
   */
  const openAddProducts = () => {
    FormFields['structure'] = productsStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddProduct');
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddProducts();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <ProductsList navigation={props.navigation} />
      </View>
    </Layout>
  );
};
