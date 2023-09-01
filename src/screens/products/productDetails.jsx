import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Layout } from "../Layout";
import Style from "./style";
import { useState } from "react";
import { ProductShortCuts } from "../../components/products/Shortcuts";
import { ProductCompleteDetails } from "../../components/products/Details";
import { Constants } from "../../util";
import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
import { StatsList } from "../../components/products/Stats";
import { FillIconButton } from "../../components/button/fillIconButton";
import moment from "moment";

export const ProductDetail = ({ navigation, route }) => {
  const currentDateTime = moment().format(Constants.DATETIME_FORMATS.DATETIME);
  const [lastUpdate, setLastUpdate] = useState(currentDateTime)
  const [reload, setReload] = useState(false);
  const sowing = route.params?.sowing;
  const breadcrumb = {
    title: `${sowing.fish_step.fish.name} - ${sowing.fish_step.name}`,
    subtitle: sowing.pond.name,
    icon: "ios-create",

  };

  const openAddSowing = () => {
    navigation.navigate("AddSowing", {sowing: sowing});
  };

  const refreshData = () => {
    const currentDateTime = moment().format(Constants.DATETIME_FORMATS.DATETIME);
    setLastUpdate(currentDateTime)
    setReload(!reload);
  }

  return (
    <Layout navigation={navigation} route={route}>
      <ScrollView style={Style.scrollview}>
        <View style={Style.main_page}>
          <Breadcrumb
            onPressRight={() => {
              openAddSowing();
            }}
            navigation={navigation}
            data={breadcrumb}
          />
          <ProductShortCuts navigation={navigation} sowing={sowing} />
          <Text style={Style.subtitle}>Mediciones</Text>
          <View style={Style.refresh_container}>
            <Text style={Style.last_refresh}>
              {`Última actualización ${lastUpdate}`}
            </Text>
            <View style={Style.row_between}>
              <TouchableOpacity
                activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
                onPress={() => {refreshData()}}
              >
                <Text style={Style.refresh_text_button}>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
                onPress={() => {
                  navigation.navigate("ProductHistory", {sowing: sowing});
                }}
              >
                <Text
                  style={[
                    Style.refresh_text_button,
                    { color: Constants.COLORS.GREEN },
                  ]}
                >
                  Ver Historico
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <StatsList navigation={navigation} sowing={sowing} reload={reload}/>
          <ProductCompleteDetails sowing={sowing}/>
          <FillIconButton style={Style.sell_button} title="Vender" icon="ios-cart" />
        </View>
      </ScrollView>
    </Layout>
  );
};