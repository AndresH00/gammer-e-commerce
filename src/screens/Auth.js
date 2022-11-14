import { StyleSheet, View, Text, Image } from "react-native";
import React, { useState } from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import LoginForm from "../components/Auth/LoginForm";
import logo from "../../assets/logo.png";
import { layoutStyle } from "../styles";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  const changeForm = () => setShowLogin(!showLogin);

  return (
    <View style={layoutStyle.container}>
      <Image style={styles.logo} source={logo} />
      {showLogin ? (
        <LoginForm changeForm={changeForm} />
      ) : (
        <RegisterForm changeForm={changeForm} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
});
