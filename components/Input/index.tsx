import { memo, forwardRef } from "react";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { FormikTouched, FormikErrors } from "formik";
import { W, dimGray, primary } from "../../constants";
import { Space } from "../Space";


const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 14,
    alignSelf: "center",
    width: W - 30,
    borderBottomWidth: 2,
  },
  errorStyle: {
    fontSize: 14,
    color: "red",
    paddingTop: 10,
    left: 5,
  },
});

interface InputT {
  name?: string;
  value?: string;
  placeholder?: string;
  errors?: any;
  touched?: any;
  onChangeText?: (e: string) => void;
  onBlur?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: // eslint-disable-line
  | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "number-pad"
    | "name-phone-pad"
    | "decimal-pad"
    | "twitter"
    | "web-search"
    | "visible-password";
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

const Input = memo<InputT>(
  ({
    name,
    value,
    errors,
    placeholder,
    onChangeText,
    onBlur,
    touched,
    secureTextEntry,
    keyboardType,
    multiline,
    numberOfLines,
    autoCapitalize
  }) => {
    const { inputStyle, errorStyle } = styles

    const input = [
      inputStyle,
      {
        fontFamily: "AirMedium",
        paddingLeft: 5,
        color: primary,
        borderBottomColor: primary,
        fontSize: Platform.OS === "ios" ? "13@s" : "13@s",
        paddingBottom: 5,
        
      },
    ];

    const placeholderStyle = [
      inputStyle,
      {
        fontFamily: "AirLight",
        color: primary,
        borderBottomColor: dimGray,
        fontSize: Platform.OS === "ios" ? "13@s" : "13@s",
      },
    ]
    
    return (
      <>
        <TextInput
          style={ScaledSheet.create(
            value?.length === 0 ? placeholderStyle : input
          )}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={`#888`}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        <Space height={40} />
        {/* {touched[name] && errors[name] ? (
          <Text style={errorStyle}>{errors[name]}</Text>
        ) : (
          <Text style={errorStyle}>{"  "}</Text>
        )} */}
      </>
    );
  })

  export { Input };
