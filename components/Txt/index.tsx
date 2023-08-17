import { memo } from "react";
import { Platform, StyleProp, Text, TextStyle, ViewStyle, StyleSheet } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ifIphoneX } from "react-native-iphone-x-helper";

import Colors from '../../constants/Colors'

const {primary, secondary, dimGray, lightGray} = Colors.light;

const styles = ScaledSheet.create({
  h0Style: {
    fontSize: Platform.OS === "ios" ? "36@s" : "35@s",
    color: "rgba(0,0,0,0.8)",
    fontFamily: "AirBoldBlack",
  },
  h1Style: {
    fontSize: Platform.OS === "ios" ? "24@s" : "24@s",
    color: "rgba(0,0,0,0.8)",
    fontFamily: "AirExtraBold",
  },
  h2Style: {
    fontSize: Platform.OS === "ios" ? "17@s" : "17@s",
    color: "rgba(0,0,0,0.8)",
    fontFamily: "AirMedium",
  },
  h3Style: {
    fontSize: Platform.OS === "ios" ? "15@s" : "15@s",
    color: "rgba(0,0,0,0.8)",
    fontFamily: "AirBlack",
  },
  h4Style: {
    fontSize: Platform.OS === "ios" ? "13@s" : "13@s",
    fontFamily: "AirMedium",
  },
  h5Style: {
    fontSize: Platform.OS === "ios" ? "13@s" : "13@s",
    //color: "rgba(0,0,0,0.8)",
    fontFamily: "AirBlack",
  },
  buttonStyle: {
    fontSize: Platform.OS === "ios" ? "15@s" : "15@s",
    //color: "rgba(0,0,0,0)",
    fontFamily: "AirBold",
  },
  bodyStyle: {
    textAlign: "left",
    ...ifIphoneX(
      {
        fontSize: Platform.OS === "ios" ? "16@s" : "16@s",
      },
      {
        fontSize: Platform.OS === "ios" ? "16@s" : "16@s",
      }
    ),
    color: dimGray,
    fontFamily: "AirBold",
  },
});

interface TxtT {
  h0?: boolean
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  body?: boolean;
  button?: boolean;
  title: string;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip"
  textStyle?: StyleProp<TextStyle>
  viewStyle?: StyleProp<ViewStyle>
}

const Txt = memo<TxtT>(
  ({ h0, h1, h2, h3, h4, h5, body, button, title, numberOfLines, ellipsizeMode, textStyle, viewStyle }) => {
    const {
      h0Style,
      h1Style,
      h2Style,
      h3Style,
      h4Style,
      h5Style,
      bodyStyle,
      buttonStyle,
    } = styles
    return (
      <Text
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}
        style={[
          textStyle,
          h0 && StyleSheet.flatten(h0Style),
          h1 && StyleSheet.flatten(h1Style),
          h2 && StyleSheet.flatten(h2Style),
          h3 && StyleSheet.flatten(h3Style),
          h4 && StyleSheet.flatten(h4Style),
          h5 && StyleSheet.flatten(h5Style),
          body && StyleSheet.flatten(bodyStyle),
          button && StyleSheet.flatten(buttonStyle)
        ]}
      >
        {title}
      </Text>
    );
  })

  export {Txt}