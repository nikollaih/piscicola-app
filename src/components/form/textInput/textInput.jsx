import { View, TextInput, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Theme from "../../../theme/theme";
import Ionicon from "react-native-vector-icons/Ionicons";
import { Constants } from "../../../util";
import { useForm } from "../../../hooks/useForm";
import { Validations } from "../../../util";

/**
 * If the data object has a property called is_large, return an object with a height of 100, a
 * minHeight of 100, and a textAlignVertical of top. Otherwise, return null.
 * @returns an object.
 */
const checkIfLarge = (data) => {
  return data?.is_large
    ? {
        height: 100,
        minHeight: 100,
        textAlignVertical: "top",
      }
    : null;
};

export const CustomTextInput = ({ data, formName }) => {
  const { dataForm, setDataForm, checkRequired } = useForm();

  useEffect(() => {}, []);

  /**
   * If the required field is not filled out, return a red border color. Otherwise, return a light gray
   * border color
   * @returns A function that returns a color.
   */
  const getBorderColor = () => {
    return !Validations.checkRequiredField(
      data,
      dataForm[formName],
      checkRequired[formName]
    ).status
      ? Constants.COLORS.RED
      : Constants.COLORS.LIGHT_GRAY;
  };

  return (
    <View style={[{ marginBottom: data?.bottom ? data.bottom : 20 }]}>
      <View style={Style.row}>
        <Text style={Style.input_label}>{data.title}</Text>
        {data?.validate?.required ? (
          <Text style={Style.text_red}> *</Text>
        ) : null}
      </View>
      <View
        style={[
          Style.input_inside_container,
          { borderColor: getBorderColor() },
        ]}
      >
        {data?.icon ? (
          <Ionicon
            name={data.icon}
            size={17}
            style={Style.icon_input}
            color={Constants.COLORS.GRAY}
          />
        ) : null}
        <TextInput
          style={[Style.input, checkIfLarge(data)]}
          keyboardType={data?.keyboard_type ? data.keyboard_type : "default"}
          placeholder={data.placeholder}
          editable={(data?.is_editable != undefined) ? data.is_editable : true}
          value={dataForm[formName].structure[data.name]}
          placeholderTextColor={Constants.COLORS.LIGHT_GRAY}
          multiline={data?.is_large}
          secureTextEntry={data?.secure_entry_text}
          onChangeText={(text) => {
            setDataForm({
              [formName]: {
                ...dataForm[formName],
                structure: {
                  ...dataForm[formName].structure,
                  [data.name]: text,
                },
              },
            });
          }}
        />
      </View>
      {!Validations.checkRequiredField(
        data,
        dataForm[formName],
        checkRequired[formName]
      ).status ? (
        <Text style={Style.text_red}>
          {
            Validations.checkRequiredField(
              data,
              dataForm[formName],
              checkRequired[formName]
            ).text
          }
        </Text>
      ) : null}
    </View>
  );
};

const Style = StyleSheet.create({
  ...Theme,
});
