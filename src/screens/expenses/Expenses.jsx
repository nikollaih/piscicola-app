import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Layout } from "../Layout";
import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
import { ExpensesList } from "../../components/expenses/List";
import FormFields from "../../json/forms/Pond";
import pondStructure from "../../json/formsStructure/pondStructure";
import { useForm } from "../../hooks/useForm";
import { RightButtonsExpenses } from "../../components/expenses/rightButtons";
import { FilterDates } from "../../components/filter/filterDates";
import { Constants } from "../../util";

import Style from "./style";

export const Expenses = (props) => {
  /* These lines of code are using React hooks to declare two state variables: `showFilter` and
  `dataForm`. */
  const [showFilter, setShowFilter] = useState(false);
  const { dataForm, setDataForm } = useForm();

  const breadcrumb = {
    title: "Gastos",
    subtitle: "Lista",
    icon: "ios-add",
    right_content: (
      <RightButtonsExpenses
        navigation={props.navigation}
        onFilter={() => {
          setShowFilter(true);
        }}
      />
    ),
  };

  const onFilter = (filters) => {
    setShowFilter(false);
  };

  /**
   * It opens the AddTank screen.
   */
  const openAddSupply = () => {
    FormFields["structure"] = pondStructure;
    setDataForm({ ...dataForm, [FormFields.form_name]: FormFields });
    props.navigation.navigate("AddExpense");
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddSupply();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <ExpensesList navigation={props.navigation} />
      </View>
      {showFilter ? (
        <FilterDates
          onFilter={(filters) => {
            onFilter(filters);
          }}
          onCancel={() => {
            setShowFilter(false);
          }}
        />
      ) : null}
    </Layout>
  );
};
