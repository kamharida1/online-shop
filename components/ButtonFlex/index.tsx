import { memo } from "react";
import { Platform, StyleProp, StyleSheet, TextStyle, TouchableOpacity, View } from "react-native";
import { W, dimGray, lightGray, primary, secondary } from "../../constants";
import { Txt } from "../Txt";

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    alignSelf: "center",
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  h: {
    width: W - (Platform.OS === "ios" ? 150 : 180),
    paddingTop: Platform.OS === "ios" ? 15 : 0,
    paddingBottom: 7,
    textAlign: "center",
  },
});

interface ButtonFlexT {
  title: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void
}

const ButtonFlex = memo<ButtonFlexT>(({
title, textStyle, onPress
}) => {
  const { container, h } = styles;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[container, { borderColor: lightGray }]}>
        <Txt button textStyle={[h, textStyle, { textShadowColor: secondary }]} title={title} />
      </View>
      </TouchableOpacity>
  )
});

export { ButtonFlex }