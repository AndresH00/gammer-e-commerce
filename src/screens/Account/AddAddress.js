import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { TextInput, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { formStyles } from "../../styles";

export default function AddAddress() {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      console.log("Creando direccion");
      console.log(formData);
    },
  });

  return (
    <KeyboardAwareScrollView extraScrollHeight={25}>
      <View style={styles.container}>
        <Text style={styles.title}>New Address</Text>
        <TextInput
          label="Title"
          style={formStyles.input}
          onChangeText={(text) => formik.setFieldValue("title", text)}
          value={formik.values.title}
          error={formik.errors.title}
        />
        <TextInput
          label="Name and lastname"
          style={formStyles.input}
          onChangeText={(text) => formik.setFieldValue("name_lastename", text)}
          value={formik.values.name_lastename}
          error={formik.errors.name_lastename}
        />
        <TextInput
          label="Address"
          style={formStyles.input}
          onChangeText={(text) => formik.setFieldValue("address", text)}
          value={formik.values.address}
          error={formik.errors.address}
        />
        <TextInput
          label="Postal Code"
          style={formStyles.input}
          onChangeText={(text) => formik.setFieldValue("postal_code", text)}
          value={formik.values.postal_code}
          error={formik.errors.postal_code}
        />
        <TextInput
          label="City"
          style={formStyles.input}
          onChangeText={(text) => formik.setFieldValue("city", text)}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <TextInput
          label="State"
          style={formStyles.input}
          onChangeText={(text) => formik.setFieldValue("state", text)}
          value={formik.values.state}
          error={formik.errors.state}
        />
        <TextInput
          label="Country"
          style={formStyles.input}
          onChangeText={(text) => formik.setFieldValue("country", text)}
          value={formik.values.country}
          error={formik.errors.country}
        />
        <TextInput
          label="Phone"
          style={formStyles.input}
          onChangeText={(text) => formik.setFieldValue("phone", text)}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
        <Button
          mode="contained"
          style={[formStyles.btnSuccess, styles.btnSuccess]}
          onPress={formik.handleSubmit}
        >
          Create Address
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

function initialValues() {
  return {
    title: "",
    name_lastename: "",
    address: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
    phone: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    name_lastename: Yup.string().required(true),
    address: Yup.string().required(true),
    postal_code: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    country: Yup.string().required(true),
    phone: Yup.string().min(8, true).required(true),
  };
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
  },
  btnSuccess: {
    marginBottom: 20,
  },
});
