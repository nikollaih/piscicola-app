import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearChart } from "../../components/charts/LinearChart";
import Fish from "../../assets/images/fish.png";
import { Constants } from "../../util";

export const ProductHistoryItem = ({ navigation, orientation, data }) => {
  return <LinearChart data={data} />;
};