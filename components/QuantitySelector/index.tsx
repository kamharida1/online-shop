import { Text, View } from "moti";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "twrnc";

export default function QuantitySelector({ quantity, setQuantity }) {
  const onMinus = () => {
    setQuantity(Math.max(0, quantity - 1));
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View
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
    </View>
  );
}
