import React, { memo } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";

const { secondary } = Colors.light;

const styles = StyleSheet.create({
  activityIndicator: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  },
});

interface LoadingT {
  size?: number;
  animating?: boolean;
}

const Loading = memo<LoadingT>(({ size, animating }) => {
  const { activityIndicator } = styles;
  return (
    <View style={activityIndicator}>
      {!animating && <ActivityIndicator size={size} color={secondary} />}
    </View>
  );
});

export { Loading };
