import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { MotiText, MotiView } from "moti";
import tw from '../../lib/tailwind'


export interface RoundIconProps {
  name: string;
  size: number;
  color?: string;
  backgroundColor?: string;
  iconRatio?: number;
  align?: "center" | "flex-start" | "flex-end";
}

const RoundIcon = ({
  name,
  size,
  color,
  backgroundColor,
  iconRatio = 0.7,
  align ='center',
}: RoundIconProps) => {
  const iconSize = size * iconRatio;

  return (
    <MotiView
      style={tw.style({
        borderRadius: size / 2,
        alignItems: align,
        justifyContent: 'center',
        height: size,
        width: size,
        padding: 12,
        ...{backgroundColor}
      },)}
    >
      <MotiText style={{ width: iconSize, height: iconSize }} {...{ color }}>
        <Icon color={color} size={iconSize} {...{ name }} />
      </MotiText>
    </MotiView>
  );
};

RoundIcon.defaultProps = {
  iconRatio: 0.7,
  align: "center",
};

export { RoundIcon };
