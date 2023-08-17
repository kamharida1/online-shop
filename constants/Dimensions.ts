import { useNavigation } from "expo-router";
import { Dimensions } from "react-native"

export const win = Dimensions.get('window')
export const W = win.width
export const H = win.height

export const Device = {
  // eslint-disable-next-line
  select(variants: any) {
    if (W >= 300 && W <= 314) return variants.mobile300 || {}
    if (W >= 315 && W <= 341) return variants.mobile315 || {}
    if (W >= 342 && W <= 359) return variants.mobile342 || {}
    if (W >= 360 && W <= 374) return variants.mobile360 || {}
    if (W >= 375 && W <= 399) return variants.mobile375 || {}
    if (W >= 400 && W <= 409) return variants.mobile400 || {}
    if (W >= 410 && W <= 414) return variants.mobile410 || {}
    if (W >= 415 && W <= 480) return variants.mobile415 || {}
    if (W >= 481) return variants.mobile481 || {}
  }
}

export const goBack = (navigation: any) => () => navigation.goBack()

export const onScreen = (screen: string, navigation: any, obj?: unknown) => () => {
  navigation.navigate(screen, obj)
}

export const goHome = (navigation: any) => () => navigation.popToTop()()
