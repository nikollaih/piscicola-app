import { View } from "react-native";
import { Layout } from "../Layout";
import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
import { FishList } from "../../components/fish/List";
import FormFields from "../../json/forms/Fish";
import fishStructure from "../../json/formsStructure/fishStructure";
import { useForm } from "../../hooks/useForm";
import Style from "./style";
import { Dropdown } from "react-native-element-dropdown";
import { Constants, UtilServices } from "../../util";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";

export const Fish = (props) => {
  const { getAuth } = useAuth();
  const productiveUnit = props.route.params?.productive_unit;
  const { dataForm, setDataForm } = useForm();
  const [productiveUnits, setProductiveUnits] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const breadcrumb = {
    title: "Productos",
    subtitle: "Lista",
    icon: "ios-add",
  };

  useEffect(() => {
    setFilterData();
  }, []);

  const setFilterData = async () => {
    const loggedUser = await getAuth();
    const userTypeID = loggedUser.profile.user_type_id;
    if(userTypeID == 1){
      let tempProductiveUnits = await UtilServices.getProductiveUnit(
        loggedUser.token
      );
      tempProductiveUnits["data"].unshift({ id: 0, name: "Todas" });
      setProductiveUnits(tempProductiveUnits.data);
      setShowFilter(true);
    }
  };

  /**
   * It opens the AddFish screen.
   */
  const openAddFish = () => {
    FormFields["structure"] = fishStructure;
    setDataForm({ ...dataForm, [FormFields.form_name]: FormFields });
    props.navigation.navigate("AddFish");
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddFish();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        {showFilter ? (
          <Dropdown
            style={Style.dropdown}
            itemTextStyle={Style.dropdown_item_text}
            selectedTextStyle={Style.font_roboto_regular}
            placeholderStyle={Style.font_roboto_regular}
            data={productiveUnits}
            value={null}
            labelField="name"
            valueField="id"
            placeholder="- Unidad productiva"
            searchPlaceholder="Buscar..."
            renderLeftIcon={() => {
              return (
                <Ionicon
                  name="ios-filter"
                  size={17}
                  style={Style.icon_input}
                  color={Constants.COLORS.GRAY}
                />
              );
            }}
            onChange={(item) => {
              setSelectedFilter(item.id);
            }}
          />
        ) : null}
        <FishList
          productiveUnit={productiveUnit}
          navigation={props.navigation}
          filter={selectedFilter}
        />
      </View>
    </Layout>
  );
};
