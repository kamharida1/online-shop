import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Field, useFormik } from "formik";

import tw from "twrnc";
import * as Yup from "yup";
import { Screen } from "../../components/Screen";
import { Address, LazyAddress } from "../../src/models";
import { Auth, DataStore } from "aws-amplify";
import { useRouter } from "expo-router";
import { Input } from "../../components/Input";
import FormPlaces from "../../components/FormPlaces";
import { Button } from "react-native";
import AppForm from "../AppForm";
import { InputAdd } from "../InputAdd";
import { ButtonSubmit } from "../ButtonSubmit";

interface FormAddressProps {
  myAddress: LazyAddress;
}

const AddressSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required.")
    .min(4, "Too Short")
    .max(60, "Too Long"),
  lastName: Yup.string()
    .required("Last name is required.")
    .min(2, "Too Short")
    .max(60, "Too Long"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .required("Phone number is required")
    .test(
      "len",
      "Phone number must be exactly 11 digits",
      (val) => !!val && val.length === 11
    ),
  street: Yup.string()
    .required("Address is required.")
    .min(4, "Too Short")
    .max(100, "Too Long"),
  street2: Yup.string().min(2, "Too Short").max(100, "Too Long"),
});

const FormAdd = ({ myAddress }: FormAddressProps) => {
  const [province, setProvince] = useState("");
  const [town, setTown] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = myAddress || {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    street2: "",
    isSelected: false,
    city: "",
    state: "",
    postalCode: "",
  };

  // Update form values when myAddress prop changes
  useEffect(() => {
    if (!myAddress) {
      return;
    }
    setValues(myAddress || initialValues);
  }, [myAddress]);

  const getInfo = (province: any, town: any) => {
    setProvince(province);
    setTown(town);
  };

  const router = useRouter();

  const submitAddress = async (
    values: LazyAddress,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setLoading(true);
      if (myAddress) {
        const original = await DataStore.query(Address, myAddress.id);
        const updated = Address.copyOf(original as LazyAddress, (updated) => {
          updated.firstName = values.firstName;
          updated.lastName = values.lastName;
          updated.email = values.email;
          updated.phone = values.phone;
          updated.street = values.street;
          updated.street2 = values.street2;
          updated.city = town;
          updated.state = province;
          updated.isSelected = values.isSelected;
          updated.postalCode = values.postalCode;
        });
        await DataStore.save(updated);
        Alert.alert("Success","Address updated successfully");
        setLoading(false);
        setTimeout(() => {
          router.back();
        }, 500);
      } else {
        const userData = await Auth.currentAuthenticatedUser();

        if (!userData) {
          return;
        }

        const newAddress = {
          ...values,
          userSub: userData.attributes.sub,
          city: town,
          state: province,
        };
        await DataStore.save(new Address(newAddress));
        setLoading(false);
        setTimeout(() => {
          router.back();
        }, 500);
      }
    } catch (error) {
      console.warn("Error saving shipping address:", error);
    } finally {
      setLoading(false);
      resetForm();
      router.back();
    }
  };

  const {
    setValues,
  } = useFormik({
    validationSchema: AddressSchema,
    initialValues,
    onSubmit: submitAddress,
  });

  return (
    <ScrollView style={{ marginTop: 50, marginBottom: 60 }}>
      <View style={{ height: 50, backgroundColor: "#00CED1" }}>
        <Text style={{
          fontSize: 19,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          marginTop: 15,
        }}>
          {myAddress ? "Edit Address" : "Add a New Address"}
        </Text>
      </View>

      <View style={{ padding: 10 }}>
        <AppForm
          initialValues={initialValues}
          onSubmit={submitAddress}
          validationSchema={AddressSchema}
        >
          <Field
            component={InputAdd}
            label="First Name"
            name="firstName"
            placeholder="First Name"
            autoCapitalize="none"
            keyboardType="default"
          />
          <Field
            component={InputAdd}
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
            autoCapitalize="none"
            keyboardType="default"
          />
          <Field
            component={InputAdd}
            label="Email"
            name="email"
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Field
            component={InputAdd}
            label="Phone"
            name="phone"
            placeholder="Phone"
            autoCapitalize="none"
            keyboardType="numeric"
          />
          <Field
            component={InputAdd}
            label="Address"
            name="street"
            placeholder="Address"
            autoCapitalize="none"
            keyboardType="default"
          />
          <Field
            component={InputAdd}
            label="Address 2"
            name="street2"
            placeholder="Address 2"
            autoCapitalize="none"
            keyboardType="default"
          />
          <Field
            component={InputAdd}
            label="Postal Code"
            name="postalCode"
            placeholder="Postal Code"
            autoCapitalize="none"
            keyboardType="numeric"
          />

          <FormPlaces getInfo={getInfo} />

          <ButtonSubmit
            title="Add Address"
            disabled={loading}
            loading={loading}
          />
        </AppForm>
      </View>
    </ScrollView>
    // <Screen style={tw``}>
    //   {loading ? (
    //     <View className="flex-1 z-10 bg-white absolute left-0 right-0 bottom-0 top-0 items-center justify-center">
    //       <ActivityIndicator animating color="black" />
    //     </View>
    //   ) : (
    //     <>
    //       <View style={tw`mb-4`}>
    //         <Input
    //           value={values.firstName}
    //           placeholder="First Name"
    //           onChangeText={handleChange("firstName")}
    //         />
    //       </View>
    //       <View style={tw`mb-4`}>
    //         <Input
    //           value={values.lastName}
    //           placeholder="Last Name"
    //           onChangeText={handleChange("lastName")}
    //         />
    //       </View>
    //       <View style={tw`mb-4`}>
    //         <Input
    //           value={values.email}
    //           placeholder="Email"
    //           onChangeText={handleChange("email")}
    //         />
    //       </View>
    //       <View style={tw`mb-4`}>
    //         <Input
    //           value={values.street}
    //           placeholder="Address 1"
    //           onChangeText={handleChange("street")}
    //         />
    //       </View>
    //       <View style={tw`mb-4`}>
    //         <Input
    //           value={values.street2 as string}
    //           placeholder="Address 2"
    //           onChangeText={handleChange("street2")}
    //         />
    //       </View>
    //       <View style={tw`mb-4`}>
    //         <Input
    //           value={values.phone}
    //           placeholder="Phone number"
    //           onChangeText={handleChange("phone")}
    //           keyboardType="numeric"
    //         />
    //       </View>
    //       <View style={tw`mb-4`}>
    //         <Input
    //           value={values.postalCode as string}
    //           placeholder="Poastal code"
    //           onChangeText={handleChange("postalCode")}
    //           keyboardType="numeric"
    //         />
    //       </View>

    //       <FormPlaces getInfo={getInfo} />

    //       <Button title="Submit" onPress={() => handleSubmit()} />
    //     </>
    //   )}
    // </Screen>
  );
};

export default FormAdd;
