import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ProvincesData from "../../data/provinces-data";
import RNPickerSelect from "react-native-picker-select";
import Provinces from "../../data/provinces";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";

const { width } = Dimensions.get("window");

const FormPlaces = ({ getInfo }) => {
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const initialTown = [{ label: "Enugu", value: "1" }];
  const [getTowns, setGetTowns] = useState(initialTown);

  // get Address
  useEffect(() => {
    getInfo(selectedProvince, selectedTown);
  }, [selectedProvince, selectedTown]);

  // Filter Cities
  const townsFilter = useCallback(
    (name) => {
      if (name === "1") {
        setSelectedTown("");
      } else {
        const towns = ProvincesData.filter(
          (province) => province.name === name
        );
        const town = towns.map((town) => {
          const result = Object.keys(town.cities).map((key) => {
            return town.cities[key];
          });
          const townsFilter = result.map((town) => {
            return { label: town, value: town };
          });
          return townsFilter;
        });
        setSelectedProvince(name);
        setGetTowns(town[0]);
      }
    },
    [selectedProvince]
  );

  const showIconPlatform =
    Platform.OS === "android" ? (
      <></>
    ) : (
      <MaterialIcons
        style={styles.icon}
        name="keyboard-arrow-down"
        size={25}
        color="black"
      />
    );

  return (
    <View style={tw``}>
      <View
        style={tw` flex-row mt-4 border-[1.5px] rounded-md h-13 justify-between mb-4 px-2 border-gray-300 items-center relative`}
      >
        <View>
          <RNPickerSelect
            onValueChange={(value) => townsFilter(value)}
            placeholder={{ label: "Province/City", value: "1" }}
            items={Provinces}
            style={pickerSelectStyles}
          />
        </View>
        {showIconPlatform}
      </View>
      <View
        style={tw` flex-row mt-4 border-[1.5px] rounded-md h-13 justify-between mb-4 px-2 border-gray-300 items-center relative`}
      >
        <View>
          <RNPickerSelect
            onValueChange={(value) => setSelectedTown(value)}
            placeholder={{ label: "District", value: "" }}
            items={getTowns}
            //value={selectedTown}
            style={pickerSelectStyles}
          />
        </View>
        {showIconPlatform}
      </View>
    </View>
  );
};

export default FormPlaces;

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    right: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    color: "black",
    paddingVertical: 10,
    width: width,
  },
  inputAndroid: {
    fontSize: 15,
    color: "black",
    paddingVertical: 10,
    paddingRight: width - 30,
  },
});
