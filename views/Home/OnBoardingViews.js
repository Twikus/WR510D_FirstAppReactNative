import { View, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoarding = () => {
  const style = styles.container;

  const navigation = useNavigation();

  useEffect(() => {
    const clearPokemonData = async () => {
      try {
        await AsyncStorage.removeItem('pokemonData');
      } catch (e) {
        // Gérer les erreurs éventuelles ici
        console.error(e);
      }
    };

    clearPokemonData();
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
