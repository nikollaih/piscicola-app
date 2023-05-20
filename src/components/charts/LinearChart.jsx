import {
  View,
  Text,
  StyleSheet,
  processColor,
  Image,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-charts-wrapper";
import { Constants } from "../../util";

const { width } = Dimensions.get("screen");

export const LinearChart = ({ navigation, orientation, data }) => {
  const getLabels = () => {
    return ["03/10", "03/10", "03/10", "03/10", "03/10"];
  };

  const getData = () => {
    let generalConfig = {
      lineWidth: 2,
      circleRadius: 6,
      circleColor: processColor(Constants.COLORS.PRIMARY),
      color: processColor(Constants.COLORS.PRIMARY),
      drawFilled: true,
      fillColor: processColor(Constants.COLORS.PRIMARY),
      fillAlpha: 20,
      drawHighlightIndicators: true,
    };

    let dataSet = {
      dataSets: [],
    };

    dataSet["dataSets"] = [
      {
        label: "",
        values: [{ y: 1 }, { y: 2 }, { y: 5 }, { y: 6 }, { y: 8 }],
        config: {
          ...generalConfig,
          valueTextSize: 12,
          circleColor: processColor(Constants.COLORS.PRIMARY),
          color: processColor(Constants.COLORS.PRIMARY),
          fillColor: processColor(Constants.COLORS.PRIMARY),
          textColor: processColor(Constants.COLORS.PRIMARY),
          valueTextSize: 10,
          valueTextColor: processColor(Constants.COLORS.DARK),
        },
      },
    ];

    return dataSet;
  };
  return (
    <View style={Style.container}>
      <Text style={Style.title}>{data.name}</Text>
      <LineChart
        style={Style.chart}
        data={{
          ...getData(),
        }}
        xAxis={{
          valueFormatter: getLabels(),
          position: "BOTTOM",
          labelRotationAngle: 0,
          granularity: 1,
          drawGridLines: true,
          gridColor: processColor(Constants.COLORS.PRIMARY),
          textColor: processColor(Constants.COLORS.DARK),
        }}
        yAxis={{
          left: {
            textColor: processColor(Constants.COLORS.DARK),
          },
          right: {
            textColor: processColor(Constants.COLORS.DARK),
          },
        }}
        marker={{ textSize: 40 }}
        onSelect={(e) => {}}
      />
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: Constants.COLORS.WHITE,
    borderRadius: 10,
    padding: 10,
    height: 200,
  },
  chart: {
    flex: 1,
    width: width - 40,
    height: 300,
  },
  title: {
    textAlign: "center",
    fontFamily: "RobotoCondensed-Bold",
    fontSize: 16
  }
});
