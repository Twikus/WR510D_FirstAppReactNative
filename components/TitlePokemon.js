import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { colors } from "../assets/styles/variables";
import { useNavigation } from "@react-navigation/native";

const TitlePokemon = ({ name, url }) => {
  const id = url.split("/")[url.split("/").length - 2];
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
  const typeImages = {
    water: require("../assets/img/types/water.png"),
    dragon: require("../assets/img/types/dragon.png"),
    electric: require("../assets/img/types/electric.png"),
    fairy: require("../assets/img/types/fairy.png"),
    ghost: require("../assets/img/types/ghost.png"),
    fire: require("../assets/img/types/fire.png"),
    ice: require("../assets/img/types/ice.png"),
    grass: require("../assets/img/types/grass.png"),
    bug: require("../assets/img/types/bug.png"),
    fighting: require("../assets/img/types/fighting.png"),
    normal: require("../assets/img/types/normal.png"),
    dark: require("../assets/img/types/dark.png"),
    steel: require("../assets/img/types/steel.png"),
    rock: require("../assets/img/types/rock.png"),
    psychic: require("../assets/img/types/psychic.png"),
    ground: require("../assets/img/types/ground.png"),
    poison: require("../assets/img/types/poison.png"),
    flying: require("../assets/img/types/flying.png"),
  };

  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [mainType, setMainType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setData(response.data);
        setMainType(response.data.types[0].type.name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const nameCapitalized = data.name
    ? data.name.charAt(0).toUpperCase() + name.slice(1)
    : "";

  const backgroundColor = `${colors.types[mainType] || colors.types.default}33`;

  const findImageByType = (type) => {
    if (typeImages[type]) {
      return typeImages[type];
    } else {
      return null;
    }
  };

  const gotToDetails = () => {
    navigation.navigate("Details", { id: data.id });
  };

  const renderTypes = () => {
    if (data.types && data.types.length > 0) {
      return (
        <View style={styles.card.left.types.container}>
          {data.types.map((type, index) => {
            const typeCapitalized =
              type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);

            const image = findImageByType(type.type.name);
            const backgroundColor =
              colors.types[type.type.name] || colors.types.default;

            return (
              <View
                key={index}
                style={[styles.card.left.types.bubble, { backgroundColor }]}
              >
                <View style={styles.card.left.types.bubble.imgContainer}>
                  <Image
                    style={[
                      styles.card.left.types.bubble.img,
                      { resizeMode: "contain" },
                    ]}
                    defaultSource={image}
                    source={image}
                  />
                </View>
                <Text style={styles.card.left.types.bubble.text}>
                  {typeCapitalized}
                </Text>
              </View>
            );
          })}
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <TouchableOpacity onPress={() => gotToDetails()}>
      <View style={[styles.card, { backgroundColor }]}>
        <View style={styles.card.left}>
          <Text style={styles.card.left.id}>N°{data.id}</Text>
          <Text style={styles.card.left.name}>{nameCapitalized}</Text>
          <View style={styles.card.left.types}>{renderTypes()}</View>
        </View>
        <Image
          style={styles.card.image}
          defaultSource={require("../assets/img/baseImage.png")}
          source={{ uri: image || "https://via.placeholder.com/106x82" }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 328,
    height: 102,
    marginBottom: 12,
    borderRadius: 15,
    flexDirection: "row",
    position: "relative",

    left: {
      width: 328,
      height: 102,
      paddingLeft: 16,
      paddingTop: 12,

      id: {
        fontFamily: "poppins-semi-bold",
        fontSize: 12,
        color: "#333",
      },
      name: {
        fontFamily: "poppins-semi-bold",
        fontSize: 21,
        color: "#333",
      },
      types: {
        flexDirection: "row",
        marginTop: 5,
        container: {
          flexDirection: "row",
          marginRight: 10,
        },
        bubble: {
          borderRadius: 50,
          marginRight: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 5,
          paddingHorizontal: 10,

          imgContainer: {
            backgroundColor: "#fff",
            borderRadius: 50,
            marginRight: 5,
          },
          img: {
            width: 15,
            height: 15,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3,
          },
          text: {
            fontFamily: "poppins-medium",
            fontSize: 12,
            color: "#fff",
          },
        },
      },
    },
    image: {
      width: 90,
      height: 72,
      resizeMode: "contain",
      marginLeft: "auto",
      marginRight: 10,
      marginTop: 15,
    },
  },
});

export default TitlePokemon;
