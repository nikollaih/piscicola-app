import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { ProductTypeList } from '../../components/productTypes/List';
import FormFields from '../../json/forms/productTypes';
import productTypesStructure from '../../json/formsStructure/productTypesStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const ProductTypes = props => {
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Tipos de producto',
    subtitle: 'Lista',
    icon: 'ios-add'
  };

  /**
   * It opens the AddProductTypes screen.
   */
  const openAddProductTypes = () => {
    FormFields['structure'] = productTypesStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddProductType');
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddProductTypes();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <ProductTypeList navigation={props.navigation} />
      </View>
    </Layout>
  );
};
