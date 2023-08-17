import { Text, Platform, StyleSheet, View, GestureResponderEvent } from "react-native";
import { W } from "../../constants/Dimensions";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { memo } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Fontisto } from '@expo/vector-icons'

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "transparent",
    width: W,
    opacity: 0.8,
    ...ifIphoneX(
      {
        height: 200,
      },
      {
        height: 100,
      }
    ),
  },
  iconLeftStyle: {
    fontSize: 35,
    left: Platform.OS === "ios" ? 10 : 25,
    ...ifIphoneX(
      {
        paddingTop: 65,
      },
      {
        paddingTop: 40,
      }
    ),
  },
  rightIconStyle: {
    fontSize: 37,
    marginRight: 10,
    ...ifIphoneX(
      {
        paddingTop: 65,
      },
      {
        paddingTop: 40,
      }
    ),
  },
  titleStyle: {
    fontSize: 37,
    marginRight: 150,
    ...ifIphoneX(
      {
        paddingTop: 65,
      },
      {
        paddingTop: 40,
      }
    ),
  },
});

interface HeaderT {
  title?: string;
  iconLeft: string;
  iconRight?: string;
  onPress?:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
  onPressRight?:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
}

const Header = memo<HeaderT>(({ iconLeft, title, iconRight, onPress, onPressRight }) => {
  const { container, iconLeftStyle, rightIconStyle, titleStyle} = styles;
  
  return (
    <View style={container}>
      {iconLeft && (
        <TouchableOpacity onPress={onPress}>
          <Fontisto name={iconLeft} style={iconLeftStyle} />
        </TouchableOpacity>
      )}
      {title && (
          <Text style={titleStyle}>{title}</Text>
      )}

      {iconRight && (
        <TouchableOpacity onPress={onPressRight}>
          <Fontisto name={iconRight} style={rightIconStyle} />
        </TouchableOpacity>
      )}
    </View>
  );
})

export { Header }