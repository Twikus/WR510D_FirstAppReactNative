import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import TitlePokemon from "../../components/TitlePokemon";
import { useState, useEffect } from "react";
import filter from "lodash.filter";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PokedexViews = () => {
  const style = styles.container;

  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);

  const API_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

  const fetchPokemon = async () => {
    try {
      setIsLoading(true);
      const storedData = await AsyncStorage.getItem('pokemonData');
      const storedOffset = await AsyncStorage.getItem('pokemonOffset');
      if (storedData !== null && storedOffset !== null) {
        const data = JSON.parse(storedData);
        setData(data);
        setFullData(data);
        setOffset(parseInt(storedOffset));
      } else {
        const response = await axios.get(`${API_ENDPOINT}?offset=${offset}&limit=20`);
        setData(response.data.results);
        setFullData(response.data.results);
        setOffset(offset + 20);

        // Stockez les données et l'offset dans AsyncStorage
        await AsyncStorage.setItem('pokemonData', JSON.stringify(response.data.results));
        await AsyncStorage.setItem('pokemonOffset', offset.toString());
      }
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMorePokemon = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}?offset=${offset}&limit=20`);
      setData(prevData => [...prevData, ...response.data.results]);
      setFullData(prevData => [...prevData, ...response.data.results]);
      setOffset(offset + 20);

      // Mettez à jour les données et l'offset dans AsyncStorage
      await AsyncStorage.setItem('pokemonData', JSON.stringify([...data, ...response.data.results]));
      await AsyncStorage.setItem('pokemonOffset', offset.toString());
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchPokemon = (query) => {
    setSearch(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (pokemon) => {
      return contains(pokemon, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = ({ name }, query) => {
    if (name.includes(query)) {
      return true;
    }

    return false;
  };

  if (isLoading) {
    return (
      <View style={style}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={style}>
        <Text>Error...</Text>
      </View>
    );
  }

  return (
    <View style={style}>
      <View style={style.header}>
        <TextInput
          style={style.header.search}
          onChangeText={(query) => searchPokemon(query)}
          mode="outlined"
          theme={{ roundness: 50 }}
          left={<TextInput.Icon icon="magnify" />}
          value={search}
          placeholder="Rechercher un pokémon"
          clearButtonMode="always"
        />
      </View>

      <View style={style.body}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={style.body.list}
          numColumns={1}
          data={data}
          renderItem={({ item }) => (
            <TitlePokemon name={item.name} url={item.url} />
          )}
          keyExtractor={(item, index) => item.name + index}
          onEndReached={fetchMorePokemon}
          onEndReachedThreshold={0.5}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",

    header: {
      height: "15%",
      width: "100%",
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0, 0, 0, 0.1)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      search: {
        marginTop: 30,
        width: "90%",
        paddingRight: 10,
      },
    },

    body: {
      height: "85%",
      width: "100%",

      list: {
        paddingTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        overflow: "hidden",
      },
    },
  },
});

export default PokedexViews;