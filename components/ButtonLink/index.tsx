import React, { memo } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { Txt } from "../Txt";
import { danger, text, tint } from "../../constants";

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  h: {
    textDecorationLine: "underline",
    color: danger,
  },
});

interface ButtonLinkT {
  title: string;
  viewStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
}

const ButtonLink = memo<ButtonLinkT>(
  ({ title, viewStyle, textStyle, onPress }) => {
    const { container, h } = styles;
    return (
      <TouchableOpacity onPress={onPress} style={[container, viewStyle]}>
        <Txt body title={title} textStyle={[h, textStyle]} />
      </TouchableOpacity>
    );
  }
);

export { ButtonLink };
