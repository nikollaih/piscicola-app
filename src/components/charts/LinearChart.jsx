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
import moment from "moment";
import { useEffect } from "react";

const { width } = Dimensions.get("screen");

const generalConfig = {
  lineWidth: 2,
  circleRadius: 6,
  circleColor: processColor(Constants.COLORS.PRIMARY),
  color: processColor(Constants.COLORS.PRIMARY),
  drawFilled: true,
  fillColor: processColor(Constants.COLORS.PRIMARY),
  fillAlpha: 20,
  drawHighlightIndicators: true,
};

export const LinearChart = ({ data }) => {
  useEffect(() => {
    data["data"] = data.data.reverse();
  }, []);

  const getLabels = () => {
    return data.data.map((reading) =>
      moment(reading.created_at).format("DD/MM/Y H:m a")
    );
  };

  const getValues = () => {
    return data.data.map((reading) => ({ y: reading.value }));
  };

  const getLimit = (type = "fish_step_stat_value_minimum") => {
    const LINE_COLOR =
      type == "fish_step_stat_value_minimum"
        ? Constants.COLORS.GREEN
        : Constants.COLORS.RED;
    if (data.data.length > 0) {
      const FISH_STEP_MINIMUN_VALUE = data.data[0][type];
      if (FISH_STEP_MINIMUN_VALUE) {
        let minLimits = [];
        data.data.map(() => {
          minLimits.push({ y: FISH_STEP_MINIMUN_VALUE });
        });
        return {
          label:
            type == "fish_step_stat_value_minimum"
              ? `Minimo: ${FISH_STEP_MINIMUN_VALUE}`
              : `Maximo: ${FISH_STEP_MINIMUN_VALUE}`,
          textColor: processColor(LINE_COLOR),
          values: minLimits,
          config: {
            ...generalConfig,
            fillAlpha: 0,
            circleRadius: 1,
            circleColor: processColor(LINE_COLOR),
            color: processColor(LINE_COLOR),
            fillColor: processColor(LINE_COLOR),
            textColor: processColor(LINE_COLOR),
            valueTextSize: 1,
            valueTextColor: processColor(LINE_COLOR),
          },
        };
      }
    }
    return {};
  };

  const getData = () => {
    let dataSet = {
      dataSets: [],
    };

    dataSet["dataSets"] = [
      {
        label: "",
        values: getValues(),
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
      getLimit("fish_step_stat_value_maximum"),
      getLimit(),
    ];

    return dataSet;
  };

  const getTitle = () => {
    return data.data[0]["fish_step_stat_name"]
      ? data.data[0]["fish_step_stat_name"]
      : data.key;
  };

  return (
    <View style={Style.container}>
      <Text style={Style.title}>{getTitle()}</Text>
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
    fontSize: 16,
  },
});
