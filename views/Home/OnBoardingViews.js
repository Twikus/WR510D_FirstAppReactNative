import { View, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const OnBoarding = () => {
  const style = styles.container;

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const API_ENDPOINT = "https://pokeapi.co/api/v2/";

  const fetchGenerations = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_ENDPOINT}/generation`);
      return response.data.results;
    } catch (error) {
      setError(error);
      console.log('generations :' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRegion = async () => {
    let storedRegions = await AsyncStorage.getItem('regionsData');
    if (storedRegions) {
      return;
    }

    const generations = await fetchGenerations();

    let newRegions = [];

    for (const generation of generations) {
      try {
        setIsLoading(true);
        const response = await axios.get(generation.url);

        if (response.data.main_region) {
          newRegions.push({
            region: response.data.main_region,
            generation: {
              name: generation.name,
              url: generation.url
            }
          });
        }
      } catch (error) {
        setError(error);
        console.log('regions :' + error);
      } finally {
        setIsLoading(false);
      }
    }

    newRegions = newRegions.map(({ region, generation }) => {
      return {
        name: region.name.charAt(0).toUpperCase() + region.name.slice(1),
        generation: generation.name,
      };
    });

    await AsyncStorage.setItem('regionsData', JSON.stringify(newRegions));
  };

  useEffect(() => {
    AsyncStorage.clear();

    const fetchInitialData = async () => {
      try {
        const storedPokemon = await AsyncStorage.getItem('pokemonData');
        const storedRegions = await AsyncStorage.getItem('regionsData');

        if (storedPokemon === null) {
          const pokemonResponse = await axios.get(`${API_ENDPOINT}pokemon?offset=0&limit=20`);
          const pokemonData = pokemonResponse.data.results;
          await AsyncStorage.setItem('pokemonData', JSON.stringify(pokemonData));
        }

        await fetchRegion();
      } catch (error) {
        console.log(error);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <View style={style}>
      <Image style={style.img} source={require("../../assets/img/home.png")} />
      <Text style={style.h1}>Bienvenue sur le Pokedex !</Text>
      <Text style={style.p}>
        Vous pourrez retrouver ici la liste de tous les pokemon comprenant
        toutes leurs informations.
      </Text>

      <View style={style.pageIndex}>
        <View style={style.pageIndex.current}></View>
      </View>

      <TouchableOpacity
        style={style.button}
        title="Suivant"
        onPress={() => navigation.navigate("Default")}
      >
        <Text style={style.button.text}>Continuer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    img: {
      width: 342,
      height: 264.893,
      marginTop: 250,
      marginLeft: 60,
    },
    h1: {
      textAlign: "center",
      fontFamily: "poppins-medium",
      fontSize: 26,
      marginTop: 30,
    },
    p: {
      textAlign: "center",
      fontFamily: "poppins-regular",
      fontSize: 14,
      marginTop: 30,
      color: "#666",
    },
    pageIndex: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",

      current: {
        width: 48,
        height: 9,
        borderRadius: 11,
        backgroundColor: "#173EA5",
        marginTop: 30,
      },
    },
    button: {
      width: 342,
      height: 50,
      backgroundColor: "#173EA5",
      borderRadius: 50,
      color: "#FFF",
      textAlign: "center",
      fontFamily: "poppins-medium",
      fontSize: 16,
      paddingTop: 14,
      marginTop: 80,
      marginLeft: "auto",
      marginRight: "auto",

      text: {
        color: "#FFF",
        textAlign: "center",
        fontFamily: "poppins-medium",
        fontSize: 16,
      },
    },
  },
});

export default OnBoarding;
