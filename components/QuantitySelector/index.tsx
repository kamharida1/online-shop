import { AntDesign, Feather } from "@expo/vector-icons";
import { DataStore } from "aws-amplify";
import { Text, View } from "moti";
import { Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "twrnc";
import { CartProduct } from "../../src/models";

export default function QuantitySelector({cartItem, quantity, setQuantity }) {
  const onMinus = () => {
    setQuantity(Math.max(0, quantity - 1));
    // cartItem.quantity = quantity;
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
    // cartItem.quantity = quantity;
  };

  const deleteItem = async () => {
    const toDelete = await DataStore.query(CartProduct, cartItem.id);
    if (toDelete) {
      DataStore.delete(toDelete);
    }
  };

  return (
    
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 7,
          //backgroundColor: "#F56",
        }}
      >
        {quantity === 1 ? (
          <Pressable
            onPress={deleteItem}
            style={{
              backgroundColor: "#D8D8D8",
              padding: 7,
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6,
            }}
          >
            <AntDesign name="delete" size={20} color="#000" />
          </Pressable>
        ) : (
          <Pressable
            onPress={onMinus}
            style={{
              backgroundColor: "#D8D8D8",
              padding: 7,
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6,
            }}
          >
            <AntDesign name="minus" size={20} color="black" />
          </Pressable>
        )}

        <Pressable
          style={{
            backgroundColor: "white",
            paddingHorizontal: 18,
            paddingVertical: 10,
          }}
        >
          <Text>{quantity}</Text>
        </Pressable>

        <Pressable
          onPress={onPlus}
          style={{
            backgroundColor: "#D8D8D8",
            padding: 7,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
          }}
        >
          <Feather name="plus" size={20} color="black" />
        </Pressable>
      </View>
  );
}



{/* <View
      style={tw`flex-row  mt-6 items-center justify-between w-24  rounded-md  bg-[#f8f6f6] border-[#f8f6f6]`}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onMinus}
        style={tw`w-9 h-9 items-center justify-center rounded-lg bg-[#999]`}
      >
        <Text style={tw`text-xl`}>-</Text>
      </TouchableOpacity>

      <Text style={tw`text-xl px-4`}>{quantity}</Text>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPlus}
        style={tw`w-9 h-9 items-center justify-center rounded-lg bg-[#d1d1d1]`}
      >
        <Text style={tw`text-xl`}>+</Text>
      </TouchableOpacity>
    </View> */}