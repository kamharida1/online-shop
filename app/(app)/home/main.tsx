import { View, Text, SafeAreaView, Platform, Pressable, Image } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Address, LazyAddress, Product } from '../../../src/models';
import { categoriesList } from '../../../utils/data';
import { useProductStore } from '../../../context/useProductStore';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { SliderBox } from "react-native-image-slider-box";
import DropDownPicker from "react-native-dropdown-picker";

// import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";

import { useAppSelector } from '../../../hooks/redux-hooks';
import { Auth, DataStore } from 'aws-amplify';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { AntDesign, Entypo, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { CardProduct2 } from '../../../components/CardProduct2';


function useQueriedProducts() {
  const { products } = useProductStore();
  const { q } = useLocalSearchParams<{ q: string }>();

  return useMemo(
    () =>
      products.filter((item) => {
        if (!q) {
          return true;
        }
        return item.title.toLowerCase().includes(q?.toLowerCase());
      }),
    [q, products]
  );
};

export default function Main() {
  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Electronics",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Music",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
    },
  ];
  const images = [
    "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
  ];
  const deals = [
    {
      id: "20",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image:
        "j/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "30",
      title:
        "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
      oldPrice: 74000,
      price: 26000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      ],
      color: "Cloud Navy",
      size: "8 GB RAM 128GB Storage",
    },
    {
      id: "40",
      title:
        "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
      oldPrice: 16000,
      price: 14000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
      ],
      color: "Icy Silver",
      size: "6 GB RAM 64GB Storage",
    },
    {
      id: "40",
      title:
        "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
      oldPrice: 12999,
      price: 10999,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
      ],
    },
  ];
  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72% off",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
      ],
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
      carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];

  const products = useQueriedProducts();
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [category, setCategory] = useState("Generators");
  const [userSub, setUserSub] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(
    undefined
  );
  console.log(selectedAddress);
  const [items, setItems] = useState(categoriesList);

  const cart = useAppSelector((state) => state.cart.cart);

  // Get the user's selected address
  useEffect(() => {
    async function fetchSelectedAddress() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userSub = user.attributes.sub;
        const userAddresses = await DataStore.query(Address, (address) =>
          address.userSub.eq(userSub)
        );
        const selectedAddress = userAddresses.find((a) => a.isSelected);
        setSelectedAddress(selectedAddress);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchSelectedAddress();
   }, [ ]);

  const addressSheetRef = useRef<BottomSheetModal>(null);
  const openAddress = () => {
    addressSheetRef.current?.present();
  }
  const closeAddress = () => { 
    addressSheetRef.current?.dismiss();
   }

  //refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
       
      fetchAddresses();
    }, [])
  );

  // Fetch addresses and update state
  async function fetchAddresses() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userSub = user.attributes.sub;
      const userAddresses = await DataStore.query(Address, (address) =>
      address.userSub.eq(userSub)
      );
      setAddresses(userAddresses);
    }catch(error){
      console.log("error", error);
    }
  };
  console.log("addresses", addresses);

  const onGenderOpen = useCallback(() => {
    setOpen(false);
  }, []);


  const selectAddress = async (addressId: string) => {
    if (selectedAddress?.id !== addressId) {
      // Deselect the previously selected address if one was selected
      if (selectedAddress?.id) {
        const original = await DataStore.query(Address, selectedAddress?.id);
        const updated = Address.copyOf(original as LazyAddress, (updated) => {
          updated.isSelected = false;
        });
        await DataStore.save(updated);
      }
    }

    // Select the new address
    const original = await DataStore.query(Address, addressId);
    const updated = Address.copyOf(original as LazyAddress, (updated) => {
      updated.isSelected = true;
    });
    await DataStore.save(updated);

    // Update the UI
    // setSelectedAddress(addresses.find((a) => a.id === addressId));
    //router.push(`/(app)/cart/checkout`);
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 100 : 300,
          flex: 1,
          backgroundColor: "white",
          marginBottom: 80,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "white" }}
          contentInsetAdjustmentBehavior="automatic"
        >
          {/* <View
            style={{
              backgroundColor: "#00CED1",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: "white",
                borderRadius: 3,
                height: 38,
                flex: 1,
              }}
            >
              <AntDesign
                style={{ paddingLeft: 10 }}
                name="search1"
                size={22}
                color="black"
              />
              <TextInput placeholder="Search AguBrothers.in" />
            </Pressable>
            <Feather name="mic" size={24} color="black" />
          </View> */}

          <Pressable
            onPress={openAddress}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              paddingTop: 10,
              backgroundColor: "#AFEEEE",
            }}
          >
            <Ionicons name="location-outline" size={24} color="black" />

            <View>
              {selectedAddress ? (
                <Text>
                  Deliver to {selectedAddress?.firstName} -{" "}
                  {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Add Address
                </Text>
              )}
            </View>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            //style={{ padding: 10 }}
          >
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    textAlign: "center",
                    marginTop: 5,
                  }}
                >
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          
          <SliderBox
            images={images}
            autoPlay
            circleLoop
            dotColor="#13274F"
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "100%" }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Trending Deals of the week
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {deals.map((item, index) => (
              <Pressable
                onPress={() =>
                  alert("router.push('/product/detail" + item.id + "')")
                }
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 180, height: 180, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </Pressable>
            ))}
          </View>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Today's Deals
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                onPress={() =>
                  alert("router.push('/product/detail" + item.id + "')")
                }
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />

                <View
                  style={{
                    backgroundColor: "#E31837",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 13,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Upto {item?.offer}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="Select Category"
              placeholderStyle={{ color: "#B7B7B7" }}
              onOpen={onGenderOpen}
              //onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <CardProduct2 key={index} item={item} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomSheetModal
        ref={addressSheetRef}
        snapPoints={["50%"]}
        index={0}
        backgroundComponent={({ style }) => (
          <View
            style={[
              style,
              {
                backgroundColor: "#fff",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              },
            ]}
          />
        )}
      >
        <View style={{}}>
          <View
            style={{
              marginBottom: 8,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select your delivery location to see product availability and
              faster delivery options
            </Text>
          </View>

          <ScrollView
            style={{ padding: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {/* already added address */}
            {addresses.map((address, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  selectAddress(address.id);
                  closeAddress();
                }}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor:
                    selectedAddress?.id === address.id ? "#FBCEB1" : "white",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {address?.firstName} {address?.lastName}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {address?.street}, {address?.street2}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {address?.state}, {address?.city}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {address?.phone}, {address?.postalCode}
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                router.push({
                  pathname: "/(app)/home/address-screen",
                  params: { address: "" },
                });
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
              >
                Add an address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{padding: 10, flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={24} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Enter delivery address to see product availability
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Use My Currect location
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <AntDesign name="earth" size={22} color="#0066b2" />

              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Deliver outside Enugu
              </Text>
            </View>
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}