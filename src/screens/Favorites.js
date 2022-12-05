import { StyleSheet, View, Text } from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import StatusBar from "../components/StatusBar";
import { size } from "lodash";
import colors from "../styles/colors";
import { getFavoriteApi } from "../api/favorite";
import useAuth from "../hooks/useAuth";
import Search from "../components/Search";
import FavoriteList from "../components/Favorites/FavoriteList";
import ScreenLoading from "../components/ScreenLoading";

export default function Favorites() {
  const [products, setProducts] = useState(null);
  const [reloadFavorites, setReloadFavorites] = useState(false);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      setProducts(null);
      (async () => {
        const response = await getFavoriteApi(auth);
        setProducts(response);
      })();
      setReloadFavorites(false);
    }, [reloadFavorites])
  );

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <Search />
      {!products ? (
        <ScreenLoading text="Loading Favorites" />
      ) : size(products) === 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>Favorites</Text>
          <Text>There is no products in your favorites</Text>
        </View>
      ) : (
        <FavoriteList
          products={products}
          setReloadFavorites={setReloadFavorites}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
  },
});
