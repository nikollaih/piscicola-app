import { View, Text, ScrollView, FlatList } from "react-native";
import { Layout } from "../Layout";
import Style from "./style";
import { CustomSpeedometer } from "../../components/speedometer/Speedometer";
import { ProductShortCuts } from "../../components/products/Shortcuts";
import { ProductCompleteDetails } from "../../components/products/Details";

const data = [
  {
    min: 10,
    max: 30,
    value: 15,
  },
  {
    min: 0,
    max: 100,
    value: 65,
  },
  {
    min: 40,
    max: 60,
    value: 58,
  },
  {
    min: 0,
    max: 100,
    value: 65,
  },
  {
    min: 10,
    max: 80,
    value: 34,
  },
  {
    min: 35,
    max: 70,
    value: 69,
  },
];

export const ProductDetail = (props) => {
  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return <CustomSpeedometer key={index} data={item} />;
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <ScrollView style={Style.scrollview}>
        <View style={Style.main_page}>
          <View style={Style.user_container}>
            <View>
              <Text style={Style.text_user}>Estanque 1</Text>
              <Text style={Style.name_user}>Mojarra Roja</Text>
            </View>
          </View>
          <ProductShortCuts />
          <Text style={Style.subtitle}>Mediciones</Text>
          <FlatList
            columnWrapperStyle={{ justifyContent: "space-between" }}
            keyboardShouldPersistTaps="always"
            showsHorizontalScrollIndicator={false}
            data={data}
            initialNumToRender={5}
            windowSize={10}
            removeClippedSubviews={false}
            numColumns={2}
            keyExtractor={keyExtractor}
            renderItem={renderRow}
          />
          <ProductCompleteDetails />
        </View>
      </ScrollView>
    </Layout>
  );
};
