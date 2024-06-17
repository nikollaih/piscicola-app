import {View, ScrollView} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import {ProductiveUnitsList} from '../../components/productiveUnits/List';
import FormFields from '../../json/forms/editProductiveUnit';
import productiveUnitStructure from '../../json/formsStructure/productiveUnitStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const ProductiveUnits = (props) => {
    const {dataForm, setDataForm} = useForm();
    const association = props.route.params.association;

    const breadcrumb = {
        title: "Unidades productivas",
        subtitle: association.name,
        icon: "ios-add"
    };

    /**
     * It opens the AddProductiveUnit screen.
     */
    const openAddProductiveUnit = () => {
        FormFields["structure"] = productiveUnitStructure;
        setDataForm({ ...dataForm, [FormFields.form_name]: FormFields });
        props.navigation.navigate("EditProductiveUnit", {association: association});
    };

    return (
        <Layout navigation={props.navigation} route={props.route}>
            <ScrollView style={Style.scrollview}>
                <View style={Style.main_page}>
                    <Breadcrumb
                        onPressRight={() => {
                            openAddProductiveUnit();
                        }}
                        navigation={props.navigation}
                        data={breadcrumb}
                    />
                    <ProductiveUnitsList navigation={props.navigation} associationId={association.id} />
                </View>
            </ScrollView>
        </Layout>
    );
};
