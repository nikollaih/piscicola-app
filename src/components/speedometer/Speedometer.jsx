import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
} from "react-native-cool-speedometer";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Constants } from "../../util";
import Theme from "../../theme/theme";
import Alarm from "../../assets/images/alarm.gif";

const { width } = Dimensions.get("screen");

export const CustomSpeedometer = ({ stat }) => {
  const getIndicatorColor = () => {
    const min = stat.fish_step_stat_value_minimum;
    const max = stat.fish_step_stat_value_maximum;
    const value = stat.value;

    if (stat.triggered_alarm || (value < min && min) || (value > max && max))
      return Constants.COLORS.RED;

    if ((value == min && min) || (value == max && max))
      return Constants.COLORS.SOFT_YELLOW;

    if (value && min && max) {
      var rangoVerde = (max - min) * 0.4; // 40% del rango total
      var rangoAmarillo = (max - min) * 0.2; // 20% del rango total
      if (value >= min && value < min + rangoAmarillo) {
        return Constants.COLORS.SECONDARY; // Valor cerca del mínimo, color naranja
      } else if (value <= max && value > max - rangoAmarillo) {
        return Constants.COLORS.SECONDARY; // Valor cerca del máximo, color naranja
      } else if (value >= min + rangoAmarillo && value < min + rangoVerde) {
        return Constants.COLORS.SOFT_YELLOW; // Valor en rango amarillo, color amarillo
      } else if (value <= max - rangoAmarillo && value > max - rangoVerde) {
        return Constants.COLORS.SOFT_YELLOW; // Valor en rango amarillo, color amarillo
      } else {
        return Constants.COLORS.LIVE_GREEN; // Valor en rango verde, color verde
      }
    }

    if (stat.value) return Constants.COLORS.LIVE_GREEN;
  };

  const getMinValue = () => {
    if (stat.value <= stat.fish_step_stat_value_minimum)
      return stat.fish_step_stat_value_minimum / 1.5;
    if (stat.fish_step_stat_value_minimum)
      return stat.fish_step_stat_value_minimum;
    if (stat.value > 0) return 0;
    return stat.value;
  };

  const getMaxValue = () => {
    if (stat.value >= stat.fish_step_stat_value_maximum)
      return stat.value * 1.5;
    if (stat.fish_step_stat_value_maximum)
      return stat.fish_step_stat_value_maximum;
    if (stat.value > 0) return stat.value * 2;
    return stat.value;
  };

  const getTitle = () => {
    return stat.fish_step_stat_name ? stat.fish_step_stat_name : stat.key;
  };

  return (
    <View style={[Style.container]}>
      {stat.triggered_alarm ? (
        <Image source={Alarm} style={Style.alarm} />
      ) : null}
      <Text style={Style.title}>{getTitle()}</Text>
      <View style={Style.container_value}>
        <Text style={Style.value}>{stat.value}</Text>
      </View>
      <View style={Style.min_max_container}>
        {stat.fish_step_stat_value_minimum ? (
          <Text
            style={Style.min_max_text}
          >{`Min: ${stat.fish_step_stat_value_minimum}`}</Text>
        ) : null}
        {stat.fish_step_stat_value_maximum ? (
          <Text
            style={Style.min_max_text}
          >{`Max: ${stat.fish_step_stat_value_maximum}`}</Text>
        ) : null}
      </View>
      <Speedometer
        height={width / 2 - 30}
        width={width / 2 - 40}
        value={stat.value}
        min={getMinValue()}
        max={getMaxValue()}
        angle={170}
      >
        <Background color={Constants.COLORS.DARK} opacity={1} angle={180} />
        <Arc arcWidth={10} />
        <Needle
          color="white"
          baseWidth={1}
          offset={20}
          baseOffset={0}
          circleRadius={7}
          circleColor={Constants.COLORS.WHITE}
        />
        <Progress arcWidth={10} color={getIndicatorColor()} />
        <Marks fontSize={13} step={(getMaxValue() - getMinValue()) / 10} />
      </Speedometer>
    </View>
  );
};

const Style = StyleSheet.create({
  ...Theme,
  container: {
    backgroundColor: Constants.COLORS.WHITE,
    flex: 0.49,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: (width / 2 - 30) / 2,
    borderRadius: 10,
    height: width / 2 - 20,
    marginBottom: 10,
  },
  title: {
    ...Theme.font_roboto_bold,
    fontSize: 20,
  },
  value: {
    ...Theme.font_roboto_bold,
    fontSize: 20,
  },
  indicator: {
    width: 15,
    height: 15,
    borderRadius: 8,
  },
  alarm: {
    height: 25,
    width: 25,
    marginRight: 10,
    position: "absolute",
    left: 10,
    top: 10,
  },
  container_value: {
    ...Theme.row,
  },
  min_max_container: {
    marginBottom: 10,
  },
  min_max_text: {
    ...Theme.font_roboto_regular,
    textAlign: "center",
    fontSize: 13,
  },
});
