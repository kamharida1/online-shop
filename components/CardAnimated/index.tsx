import { MotiView } from "moti";
import React, { Component, ReactNode } from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

class CardAnimated extends Component<CardProps> {
  render() {
    // Component logic goes here
    const { style, children } = this.props;
    return (
      <MotiView
        from={{
          opacity: 0,
          scale: 0.2,
        }}
        animate={{
          opacity: 1,
          scale: 0.97,
        }}
        exit={{
          opacity: 0,
          scale: 0,
        }}
        exitTransition={{
          type: "spring",
          //duration: 2500,
        }}
        style={[styles.card, style]}
      >
        {children}
      </MotiView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    //borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 4,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: "#F0F0F0",
    marginVertical: 10,
    
  },
});

export default CardAnimated;
