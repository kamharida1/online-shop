import React from "react";
import { View, Text, FlatList } from "react-native";

interface ProductDetailsProps {
  productDetails: any;
}

const CardProductDetail = ({ productDetails }: ProductDetailsProps) => {
  if (!productDetails) {
    return null; // Or handle the case when productDetails is undefined or null
  }
  //console.log("Inside Card", productDetails);
  const data = Object.entries(productDetails);
  //console.log("Data", data);
  return (
    <View style={{ paddingHorizontal: 10, paddingTop: 10, paddingBottom: 20 }}>
      <View style={{ marginBottom: 15 }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "600",
            //fontFamily: "AirBold",
          }}
        >
          Features
        </Text>
      </View>
      {data.map(([key, value]) => {
        return (
          <View
            key={key}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                //fontFamily: "AirMedium",
                color: "#555",
              }}
            >
              {key}
            </Text>
            <Text
              style={{
                fontSize: 15,
                //fontFamily: "AirBlack",
                marginRight: 10,
              }}
            >
              {value as string}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export { CardProductDetail };
