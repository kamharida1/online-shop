import React from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props extends ViewProps {
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
}

const Screen: React.FC<Props> = ({ loading, scroll, style, children }) => {
  const insets = useSafeAreaInsets();

  return scroll ? (
    <ScrollView
      testID="scrollview-screen"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        {
          flex: 1,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      testID="view-screen"
      style={[
        {
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
export { Screen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 20,
    //backgroundColor: 'red'
  },
  contentContainer: {
    paddingBottom: 36,
  },
});
