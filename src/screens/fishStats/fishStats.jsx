import { View } from "react-native";
import { Layout } from "../Layout";
import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
import { FishStatsList } from "../../components/fishStats/List";
import FormFields from "../../json/forms/fishStats";
import fishStatsStructure from "../../json/formsStructure/fishStatsStructure";
import { useForm } from "../../hooks/useForm";
import Style from "./style";
import { Dropdown } from "react-native-element-dropdown";
import { Constants, UtilServices } from "../../util";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";

export const FishStats = (props) => {
  const fish = props.route.params?.fish;
  const { dataForm, setDataForm } = useForm();

  const breadcrumb = {
    title: "Parametros",
    subtitle: `${fish.name} - ${fish.fish.name}`,
    icon: "ios-add",
  };

  useEffect(() => {}, []);

  /**
   * It opens the AddFishStats screen.
   */
  const openAddFishStats = () => {
    props.navigation.navigate("AddFishStats", { fish: fish });
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddFishStats();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <FishStatsList fish={fish} navigation={props.navigation} />
      </View>
    </Layout>
  );
};
