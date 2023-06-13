import {
  View,
  Text,
  ScrollView,
} from "react-native";
import { Layout } from "../Layout";
import Style from "./style";
import { ProductHistoryList } from "../../components/products/historyList";
import { GeneralDateInput } from "../../components/form/dateInput/generalDateInput";
import { useState } from "react";
import { FillIconButton } from "../../components/button/fillIconButton";

export const ProductHistory = ({ navigation, route }) => {
  const [startDate, setStartDate] = useState(new Date(Date.now() - 604800000));
  const [endDate, setEndDate] = useState(new Date());
  const [filter, setFilter] = useState(false)
  const sowing = route.params?.sowing;

  const getDateData = (date) => {
    return {
      date: date,
      format: "DD/MM/YYYY",
    };
  };

  const getDateFilter = () => {
    return{
      start_date: startDate,
      end_date: endDate
    }
  }

  return (
    <Layout navigation={navigation} route={route}>
      <ScrollView style={Style.scrollview}>
        <View style={Style.main_page}>
          <View style={Style.user_container}>
            <View>
              <Text style={Style.text_user}>{sowing?.pond?.name}</Text>
              <Text
                style={Style.name_user}
              >{`${sowing?.fish_step?.fish?.name} - ${sowing?.fish_step?.name}`}</Text>
            </View>
          </View>

          <Text style={Style.subtitle}>Historial de Mediciones</Text>
          <View style={Style.full_flex}>
            <View style={[Style.row, Style.full_flex]}>
              <GeneralDateInput onDateChange={(date) => {setStartDate(date)}} style={{marginRight: 5}} data={getDateData(startDate)} />
              <GeneralDateInput onDateChange={(date) => {setEndDate(date)}} style={{marginLeft: 5}} data={getDateData(endDate)} />
            </View>
            <FillIconButton onPress={() => {setFilter(!filter)}} style={{marginBottom: 10}} title="Buscar"/>
          </View>
          <ProductHistoryList sowing={sowing} filter={getDateFilter()} setFilter={filter} />
        </View>
      </ScrollView>
    </Layout>
  );
};
