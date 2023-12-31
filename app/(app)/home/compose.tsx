import { useRef, useState } from "react";
import { Storage } from "aws-amplify";
import { Button, Dimensions, Platform, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDataStore } from "../../../hooks/useDataStore";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";

import { options, categories, brands } from "../../../utils/data";
import { Product } from "../../../src/models";
import { AppContainer } from "../../../components/AppContainer";
import tw from "../../../lib/tailwind";
import { Input } from "../../../components/Input";
import { Image } from "react-native";
import { Space } from "../../../components/Space";
import { getAvailableSubtypes } from "../../../utils/generateSubtypes";
import DynamicForm from "../../../components/FormDyamic";
import { generateFieldsForCategory } from "../../../utils/generateFieldsForCategory";
import { Txt } from "../../../components/Txt";
import { s } from "react-native-size-matters";
import { get, set } from "lodash";
const { width } = Dimensions.get("window");

export default function Compose() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImages, setUploadedImages] = useState<{ url: string,  originalUri: string}[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [image, setImage] = useState<{url: string,  originalUri: string}>({url: "", originalUri: ""});
  const [category, setCategory] = useState("");
  const [avgRating, setAvgRating] = useState("0");
  const [ratings, setRatings] = useState("0");
  const [brand, setBrand] = useState("");
  const [count, setCount] = useState("0");
  const [price, setPrice] = useState("0");
  const [subtype, setSubtype] = useState<string | null>(null);
  const [oldPrice, setOldPrice] = useState("0");
  const [productDetails, setProductDetails] = useState<Record<string, string>>(
    {}
  );
  const [progressText, setProgressText] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const { loading, create, error } = useDataStore(Product);

  const s3BucketUrl = `https://online-shop-storage-9142dc3edev-dev.s3.us-east-2.amazonaws.com/public/`;

  let imageId = 0;

  // function getImageId() {
  //   return `Image-${imageId++}`;
  // }

  const router = useRouter();

  const handleCreateProduct = async () => {
    const product = {
      title,
      description,
      images: uploadedImages,
      options,
      image: uploadedImages[0],
      ratings: parseFloat(ratings),
      category,
      avgRating: parseFloat(avgRating),
      brand,
      count: parseInt(count),
      price: parseFloat(price),
      oldPrice: parseFloat(oldPrice),
      productDetails,
      subtype,
    };
    await create(product);
    router.back();
    // Clear the form after saving
    setTitle("");
    setDescription("");
    setSelectedImages([]);
    setImage({url: "", originalUri: ""});
    setCategory("");
    setAvgRating("0");
    setRatings("0");
    setBrand("");
    setCount("0");
    setPrice("0");
    setSubtype(null);
    setOldPrice("0");
    setProductDetails({});
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setSubtype(null);
    setProductDetails({});
  };
  const handleBrandChange = (value: string) => {
    setBrand(value);
  };

  const hadleSubtypeChange = (value: string) => {
    setSubtype(value);
    setProductDetails({});
  };

  const handleProductDetailsChange = (label: string, value: string) => {
    setProductDetails({ ...productDetails, [label]: value });
  };

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      // const selectedImagesData = result.assets.map(({ uri }) => ({ uri }));
      setSelectedImages(result.assets.map(({ uri }) => uri));
      // console.log(selectedImagesData);
      //setSelectedImages(selectedImagesData);
      //uploadImages(selectedImagesData);
    } else {
      alert("You did not select any image.");
    }
  };

  const fetchResourceFromURI = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadResourceToS3 = async (uri: any) => { 
    const img = await fetchResourceFromURI(uri);
    const key = `${Date.now()}.jpg`;
    const res = await Storage.put(key, img, {
      progressCallback(progress) {
        setProgressText(
          `Uploading:  ${Math.round((progress.loaded / progress.total) * 100)}%`
        );
        console.log(`Progress: ${progress.loaded}/${progress.total}`);
      },
    });
    return res.key;
  }

  const uploadImages = async () => { 
    const uploadedImageUrls = [];
    setisLoading(true);
    try {
      for (const uri of selectedImages) {
        const key = await uploadResourceToS3(uri);
        uploadedImageUrls.push({ url: `${s3BucketUrl}${key}`, originalUri: uri });
      }
      setProgressText("Upload Successful");
      setUploadedImages(uploadedImageUrls);
      console.log(uploadedImageUrls);
      setisLoading(false);
    } catch (err) {
      
    }
  }

  // const uploadImages = async (images: any[]) => { 
  //   const uploadedImageUrls = [];

  //   try {
  //     for (const imageData of images) {
  //       const img = await fetchResourceFromURI(imageData.uri);
  //       setisLoading(true);

  //       const filekey = getImageId();

  //       const res = await Storage.put(filekey, img, {
  //         progressCallback(progress) {
  //           setProgressText(
  //             `Uploading:  ${Math.round((progress.loaded / progress.total) * 100)}%`
  //           );
  //           console.log(`Progress: ${progress.loaded}/${progress.total}`);
  //         },
  //       });
  //       // uploadedImageUrls.push(`${s3BucketUrl}${res.key}`);
  //       uploadedImageUrls.push({ url: `${s3BucketUrl}${res.key}`, originalUrl: imageData.uri });
  //       // uploadedImageUrls.push({ url: res.key, originalUrl: imageData.uri, key: res.key });
  //     }
  //     setProgressText("Upload Successful");
  //     console.log(uploadedImageUrls);
  //     setUploadedImages(uploadedImageUrls);
  //     setisLoading(false);
  //   } catch (err) {
  //     console.error("Upload Error:", err);
  //     setisLoading(false);
  //     return;
  //   }
  // }

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
    <AppContainer loading={loading}>
      <View style={tw`flex-1 mt-10 mb-40`}>
        <Input
          value={title}
          onChangeText={(value) => setTitle(value)}
          placeholder="Title"
        />
        <Input
          value={description}
          onChangeText={(value) => setDescription(value)}
          placeholder="Description"
          numberOfLines={4}
          multiline
        />
        <Input
          value={price}
          placeholder="Price"
          onChangeText={(value) => setPrice(value)}
          keyboardType="numeric"
        />
        <Input
          value={count}
          placeholder="Product Count"
          onChangeText={(value) => setCount(value)}
          keyboardType="numeric"
        />
        <Input
          value={oldPrice}
          placeholder="Old Price"
          onChangeText={(value) => setOldPrice(value)}
          keyboardType="numeric"
        />
        <Input
          value={ratings}
          placeholder="Ratings"
          onChangeText={(value) => setRatings(value)}
          keyboardType="numeric"
        />
        <Input
          value={avgRating}
          placeholder="Average Rating"
          onChangeText={(value) => setAvgRating(value)}
          keyboardType="numeric"
        />
        <Button title="Pick Images" onPress={pickImages} />
        <View
          style={tw`p-4 px-2 flex-row flex-wrap bg-white border border-slate-200 `}
        >
          {selectedImages.map((image) => (
            <View key={image}>
              <Image
                source={{ uri: image }}
                style={{
                  width: 80,
                  height: 80,
                  margin: 6,
                }}
              />
            </View>
          ))}
        </View>
        <Space height={20} />
        <Button
          disabled={isLoading}
          title="Upload Images"
          onPress={uploadImages}
        />
        {/* <View
          style={{
            width: `${progress * 100}%`,
            height: 3,
            backgroundColor: "blue",
          }}
        /> */}
        <Txt h4 title={progressText} />
        <Space height={14} />
        <View
          style={tw` flex-row  bg-white border-[1.5px] rounded-md h-13 justify-between px-2 border-slate-300 items-center relative`}
        >
          <View>
            <RNPickerSelect
              onValueChange={handleBrandChange}
              style={pickerSelectStyles}
              value={brand}
              placeholder={{ label: "Select a brand", value: null }}
              items={brands.map((brand) => ({
                label: brand,
                value: brand,
              }))}
            />
          </View>
          {showIconPlatform}
        </View>
        <Space height={14} />
        <View
          style={tw` flex-row  bg-white border-[1.5px] rounded-md h-13 justify-between px-2 border-slate-300 items-center relative`}
        >
          <View>
            <RNPickerSelect
              onValueChange={handleCategoryChange}
              style={pickerSelectStyles}
              value={category}
              placeholder={{ label: "Select a category", value: null }}
              items={categories.map((category) => ({
                label: category,
                value: category,
              }))}
            />
          </View>
          {showIconPlatform}
        </View>
        {category && (
          <View
            style={tw` flex-row  bg-neutral-50 border-[1.5px] rounded-md h-13 justify-between px-2 border-slate-300 items-center relative`}
          >
            <View>
              <RNPickerSelect
                onValueChange={hadleSubtypeChange}
                style={pickerSelectStyles}
                value={subtype}
                placeholder={{ label: "Select a subtype", value: null }}
                items={getAvailableSubtypes(category).map((subtype) => ({
                  label: subtype,
                  value: subtype,
                }))}
              />
            </View>
            {showIconPlatform}
          </View>
        )}
        {category && subtype && (
          <DynamicForm
            fields={generateFieldsForCategory(category, subtype)}
            onFieldChange={handleProductDetailsChange}
          />
        )}
        <Space height={40} />
        <Button
          title={loading ? "Submitting..." : "Submit"}
          onPress={handleCreateProduct}
        />
      </View>
    </AppContainer>
  );
}

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
