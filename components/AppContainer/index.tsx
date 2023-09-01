import { memo } from "react";
import KeyboardShift from "@fullstackcraft/react-native-keyboard-shift/lib/components/KeyboardShift";
import { GestureResponderEvent, StyleSheet, View, ViewStyle } from "react-native";
import { Header } from "../Header";
import { Loading } from "../Loading";
import { ScrollView } from "react-native-gesture-handler";
import { Space } from "../Space";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  sub: {
    flex: 1,
    //justifyContent: "center",
    paddingHorizontal: 10,
  },
});

interface AppContainerT {
  flatList?: boolean;
  iconLeft?: string;
  onPress?:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
  onPressRight?:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
  iconRight?: string;
  children?: React.ReactNode;
  title?: string;
  loading?: boolean;
  style?: ViewStyle;
}

const AppContainer = memo<AppContainerT>(
  ({
    flatList = false,
    iconLeft = 'arrow-left',
    onPress,
    onPressRight,
    iconRight,
    children,
    title,
    style,
    loading = false
  }) => {
    const MyView = !title ? View : SafeAreaView
    const { container, sub } = styles
  return (
    <KeyboardShift>
      <MyView style={[container, { backgroundColor: "white" }, style]}>
        {/* <StatusBarAlert
          visible={message !== ""}
          message={message}
          backgroundColor={RED}
          color="white"
          pulse="background"
          height={40}
          style={{ padding: 5, paddingTop: 5 }}
        /> */}
        {title && (
          <Header
            title={title}
            onPress={onPress}
            onPressRight={onPressRight}
            iconLeft={iconLeft}
            iconRight={iconRight}
          />
        )}
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              {!flatList ? (
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <View style={sub}>{children}</View>
                </ScrollView>
              ) : (
                <>
                  <View style={sub}>{children}</View>
                </>
              )}
            </>
          )}
        </>
      </MyView>
    </KeyboardShift>
  );
  })

  export { AppContainer };


