import React, { memo } from "react";
import {
  Platform,
  StyleSheet,
  StyleProp,
  TextStyle,
  View,
  TouchableOpacity,
  ViewStyle,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Colors from "../../constants/Colors";
import { Txt } from "../Txt";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const { primary, secondary } = Colors.light;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    marginVertical: 8,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    color: "#000000",
  },
  buttonIcon: {
    paddingRight: 8,
    // width: 40,
    // height: 40,
  },
});

interface ButtonT {
  title: string;
  cancel?: boolean;
  onPress?: () => void;
  viewStyle?: StyleProp<ViewStyle>;
  theme?: string;
  loading?: boolean;
}

const Button = memo<ButtonT>((
  {
    title,
    onPress,
    theme,
    loading = false,
    viewStyle
  }) => {
  {
    loading && (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: primary, borderRadius: 18, opacity: 0.5 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={() => alert("You pressed a button.")}
        >
          <ActivityIndicator animating color={primary}  style={styles.buttonIcon} />
          <Txt button title={title} />
        </Pressable>
      </View>
    );
  }
  if (theme === "primary") {
    return (
      <View
      style={[styles.buttonContainer, { borderWidth: 4, borderColor: primary, borderRadius: 18 }]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#00009977" }]}
          onPress={() => alert('You pressed a button.')}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#fff"
            style={styles.buttonIcon}
          />
          <Txt textStyle={{color: "#fff"}} button title={title} />
        </Pressable>
    </View>
    )
  }
  return (
    <View style={[styles.buttonContainer, viewStyle]}>
      <Pressable onPress={onPress} style={styles.button}>
        <Txt textStyle={styles.buttonLabel} button title={title} />
      </Pressable>
    </View>
  )
})

export { Button };
