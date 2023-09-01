import {View, ScrollView} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import {FoodList} from '../../components/food/List';
import FormFields from '../../json/forms/Food';
import foodStructure from '../../json/formsStructure/foodStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const Food = (props) => {
  const {dataForm, setDataForm} = useForm();
  const sowing = props.route.params.sowing;

  const breadcrumb = {
    title: "Historial de alimentación",
    subtitle: "Cosecha",
    icon: "ios-add"
  };

  /**
   * It opens the AddTank screen.
   */
  const openAddFood = () => {
    FormFields["structure"] = foodStructure;
    setDataForm({ ...dataForm, [FormFields.form_name]: FormFields });
    props.navigation.navigate("AddFood", {sowing: sowing});
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <ScrollView style={Style.scrollview}>
        <View style={Style.main_page}>
          <Breadcrumb
            onPressRight={() => {
              openAddFood();
            }}
            navigation={props.navigation}
            data={breadcrumb}
          />
          <FoodList navigation={props.navigation} sowing={sowing} />
        </View>
      </ScrollView>
    </Layout>
  );
};
