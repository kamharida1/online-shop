import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import { Txt } from "../Txt";

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  gradientColors: string[];
}

const ButtonX: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  gradientColors,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={gradientColors}
        style={[defaultButtonStyle, buttonStyle]}
      >
        <Txt button title={title} textStyle={[defaultTextStyle, textStyle]} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const defaultButtonStyle: ViewStyle = {
  borderRadius: 10,
  paddingHorizontal: 20,
  paddingVertical: 10,
};

const defaultTextStyle: TextStyle = {
  color: "white",
  textAlign: "center",
};

export default ButtonX;
