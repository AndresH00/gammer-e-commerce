import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { size } from "lodash";
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../api/favorite";
import useAuth from "../../hooks/useAuth";

export default function Favorite(props) {
  const { product } = props;
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth, product._id);
      if (size(response) === 0) setIsFavorite(false);
      else setIsFavorite(true);
    })();
  }, [product]);

  const addFavorite = async () => {
    if (!loading) {
      setLoading(true);
      try {
        await addFavoriteApi(auth, product._id);
        setIsFavorite(true);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  const deleteFavorite = async () => {
    if (!loading) {
      setLoading(true);
      try {
        await deleteFavoriteApi(auth, product._id);
        setIsFavorite(false);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  if (isFavorite === undefined) return null;

  return (
    <Button
      mode="contained"
      contentStyle={
        isFavorite
          ? styles.btnDeleteFavoritesContent
          : styles.btnAddFavoritesContent
      }
      labelStyle={styles.btnLabel}
      style={styles.btn}
      onPress={isFavorite ? deleteFavorite : addFavorite}
      loading={loading}
    >
      {isFavorite ? "Delete Favorite" : "Add to Favorite"}
    </Button>
  );
}

const styles = StyleSheet.create({
  btnAddFavoritesContent: {
    backgroundColor: "#057b00",
    paddingVertical: 5,
  },
  btnDeleteFavoritesContent: {
    backgroundColor: "#c40000",
    paddingVertical: 5,
  },
  btnLabel: {
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
  },
});
