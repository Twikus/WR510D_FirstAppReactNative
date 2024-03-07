import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TitlePokemon from "../../components/TitlePokemon";
import { eventEmitter } from '../../assets/js/eventEmmiter';


const FavoritesViews = () => {
  const style = styles;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    };

    const refreshFavorites = () => {
      fetchFavorites();
    };

    eventEmitter.addListener('refreshFavorites', refreshFavorites);

    fetchFavorites();

    // N'oubliez pas de supprimer l'écouteur d'événement lorsque le composant est démonté
    return () => {
      eventEmitter.removeListener('refreshFavorites', refreshFavorites);
    };
  }, []);

  return (
    <View style={styles.body}>
      <View style={style.containerTitle}>
        <Text style={style.containerTitle.title}>Favoris</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.body.list}
        numColumns={1}
        data={favorites} // Utilisez les favoris comme données
        renderItem={({ item }) => (
          <TitlePokemon name={item.name} url={item.url} />
        )}
        keyExtractor={(item, index) => item.name + index}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  containerTitle: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    paddingBottom: 30,
    paddingLeft: 20,

    title: {
      marginTop: 70,
      fontSize: 24,
      fontFamily: "poppins-semi-bold",
    },
  },

  body: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

    list: {
      paddingTop: 20,
      marginLeft: "auto",
      marginRight: "auto",
      overflow: "hidden",
    }
  },
});

export default FavoritesViews;