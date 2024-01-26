import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../assets/styles/variables";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "react-native-paper";

const DetailsScreen = ({ route }) => {
  const style = styles.container;
  const navigation = useNavigation();
  const { id } = route.params;
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
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
  const typeImagesBackground = {
    water: require("../assets/img/types2/water.png"),
    dragon: require("../assets/img/types2/dragon.png"),
    electric: require("../assets/img/types2/electric.png"),
    fairy: require("../assets/img/types2/fairy.png"),
    ghost: require("../assets/img/types2/ghost.png"),
    fire: require("../assets/img/types2/fire.png"),
    ice: require("../assets/img/types2/ice.png"),
    grass: require("../assets/img/types2/grass.png"),
    bug: require("../assets/img/types2/bug.png"),
    fighting: require("../assets/img/types2/fighting.png"),
    normal: require("../assets/img/types2/normal.png"),
    dark: require("../assets/img/types2/dark.png"),
    steel: require("../assets/img/types2/steel.png"),
    rock: require("../assets/img/types2/rock.png"),
    psychic: require("../assets/img/types2/psychic.png"),
    ground: require("../assets/img/types2/ground.png"),
    poison: require("../assets/img/types2/poison.png"),
    flying: require("../assets/img/types2/flying.png"),
  };

  const [data, setData] = useState([]);
  const [species, setSpecies] = useState([]);
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

    const fetchSpecies = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        setSpecies(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
    fetchSpecies();
  }, [1]);

  let genderFemaleRate = 0;
  let genderMaleRate = 0;

  if (species.gender_rate !== -1) {
      genderFemaleRate = (species.gender_rate / 8) * 100;
      genderMaleRate = ((8 - species.gender_rate) / 8) * 100;
  }

  // if species is not empty, get the description of the pokemon
  let pokemonDescription = species.flavor_text_entries
    ? species.flavor_text_entries[0].flavor_text
    : "";
  
  pokemonDescription = pokemonDescription.replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g, " ");

  const nameCapitalized = data.name
    ? data.name.charAt(0).toUpperCase() + data.name.slice(1)
    : "";

  const color1 = colors.types[mainType];
  const color2 = colors.gradient[mainType];

  const findImageByType = (type, images) => {
    if (type && images[type]) {
      return images[type];
    } else {
      return images.default;
    }
  };

  const renderTypes = () => {
    if (data.types && data.types.length > 0) {
      return (
        <View style={style.body.typeContainer.type}>
          {data.types.map((type, index) => {
            const typeCapitalized =
              type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);

            const image = findImageByType(type.type.name, typeImages);
            const backgroundColor =
              colors.types[type.type.name] || colors.types.default;

            return (
              <View
                key={index}
                style={[
                  style.body.typeContainer.type.bubble,
                  { backgroundColor },
                ]}
              >
                <View style={style.body.typeContainer.type.bubble.imgContainer}>
                  <Image
                    style={[
                      style.body.typeContainer.type.bubble.img,
                      { resizeMode: "contain" },
                    ]}
                    defaultSource={image}
                    source={image}
                  />
                </View>
                <Text style={style.body.typeContainer.type.bubble.text}>
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
    // { data && species &&
    <ScrollView style={style}>
      <View style={style.header}>
        <LinearGradient
          colors={[color1, color2]}
          start={[0, 0]}
          end={[0.5, 1.2]}
          style={style.header.circleBackground}
        >
        </LinearGradient>
        <View style={style.header.circleBackground.logo}>
          {mainType && (
            <Image
              style={style.header.circleBackground.logo.image}
              source={typeImagesBackground[mainType]}
            />
          )}
        </View>
        <View style={style.header.top}>
          <TouchableOpacity
            style={style.header.top.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={style.header.top.backBtn.text}>
              <Icon source="arrow-left" color="#fff" size={20} />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.header.containerImage}>
          <Image
            style={style.header.containerImage.image}
            defaultSource={require("../assets/img/baseImage.png")}
            source={{
              uri: image,
            }}
          />
        </View>
      </View>
      <View style={style.body}>
        <Text style={style.body.pokemonName}>{nameCapitalized}</Text>
        <Text style={style.body.pokemonId}>N°{id}</Text>
        <View style={style.body.typeContainer}>{renderTypes()}</View>
        <Text style={style.body.pokemonDesc}>{pokemonDescription}</Text>

        <View style={style.body.statsContainer}>
          <View style={style.body.statsContainer.row}>
            <View style={style.body.statsContainer.statContainer}>
              <Text style={style.body.statsContainer.statContainer.title}>
                <Icon source="weight-kilogram" size={20} color="rgba(0, 0, 0, 0.60)"/> WEIGHT
              </Text>
              <Text style={style.body.statsContainer.statContainer.stat}>
                {data.weight / 10} kg
              </Text>
            </View>
            <View style={style.body.statsContainer.statContainer}>
              <Text style={style.body.statsContainer.statContainer.title}>
                <Icon source="human-male" size={20} color="rgba(0, 0, 0, 0.60)"/> HEIGHT
              </Text>
              <Text style={style.body.statsContainer.statContainer.stat}>
                {data.height / 10} m
              </Text>
            </View>
          </View>
          <View style={style.body.statsContainer.row}>
            <View style={style.body.statsContainer.statContainer}>
              <Text style={style.body.statsContainer.statContainer.title}>
                <Icon source="account-group" size={20} color="rgba(0, 0, 0, 0.60)"/> HABITAT
              </Text>
              <Text style={style.body.statsContainer.statContainer.stat}>
                {species.habitat ? species.habitat.name.charAt(0).toUpperCase() + species.habitat.name.slice(1) : "Unknown"}
              </Text>
            </View>
          </View>
          <View style={style.body.statsContainer.row}>
            <View style={style.body.statsContainer.genderRate}>
              <Text style={style.body.statsContainer.statContainer.title}>
                GENDER RATE
              </Text>
              <View style={style.body.statsContainer.genderRate.progressBarBase}>
                <View style={[style.body.statsContainer.genderRate.progressBar, {width: `${genderMaleRate}%`}]}></View>
              </View>
              <View style={style.body.statsContainer.genderRate.textContainer}>
                <View style={style.body.statsContainer.genderRate.textContainer.row}>
                  <Icon source="gender-male" size={15} color="rgba(0, 0, 0, 0.70)"/>
                  <Text>{genderMaleRate} %</Text>
                </View>
                <View style={style.body.statsContainer.genderRate.textContainer.row}>
                  <Icon source="gender-female" size={15} color="rgba(0, 0, 0, 0.70)"/>
                  <Text>{genderFemaleRate} %</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
    // }
  );
};

// get the width of the screen and add 100 to it to have a circle that exceeds the screen
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    header: {
      top: 0,
      left: 0,
      right: 0,
      height: 350,
      backgroundColor: "white",

      top: {
        height: 100,
        justifyContent: "flex-end",
        alignItems: "flex-start",
        paddingLeft: 20,

        backBtn: {
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",

          text: {
            fontFamily: "poppins-bold",
            fontSize: 30,
            color: "#fff",
          },
        },
      },

      circleBackground: {
        position: "absolute",
        top: -width / 2,
        height: width * 1.2,
        width: width * 1.2,
        borderRadius: (width * 1.2) / 2,
        left: -width * 0.1,

        logo: {
          position: "absolute",
          height: 280,
          width: "100%",
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",

          image: {
            width: 204,
            height: 204,
            resizeMode: "contain",
          },
        },
      },

      containerImage: {
        width: "100%",
        height: "100%",
        alignItems: "center",

        image: {
          width: "80%",
          height: "80%",
          position: "absolute",
          resizeMode: "contain",
        },
      },
    },

    body: {
      height: "100%",
      width: "100%",
      paddingLeft: 20,
      paddingRight: 20,

      pokemonName: {
        marginTop: 25,
        fontFamily: "poppins-medium",
        fontSize: 32,
        color: "black",
      },

      pokemonId: {
        fontFamily: "poppins-medium",
        fontSize: 16,
        color: "rgba(0, 0, 0, 0.70)",
      },

      typeContainer: {
        marginTop: 20,
        marginBottom: 20,

        type: {
          flexDirection: "row",

          bubble: {
            borderRadius: 50,
            marginRight: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 5,
            paddingHorizontal: 10,
            width: 100,
            height: 35,

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
              fontSize: 14,
              color: "#fff",
            },
          },
        },
      },

      pokemonDesc: {
        fontFamily: "poppins-regular",
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.70)",
        paddingBottom: 20,
      },

      statsContainer: {
        marginTop: 20,

        row: {
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20,
        },

        statContainer: {
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",

          title: {
            fontFamily: "poppins-regular",
            fontSize: 14,
            color: "rgba(0, 0, 0, 0.60)",
          },

          stat: {
            fontFamily: "poppins-medium",
            fontSize: 16,
            color: "rgba(0, 0, 0, 0.90)",
            paddingTop: 15,
            paddingBottom: 15,
            paddingLeft: 40,
            paddingRight: 40,
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.10)",
            borderRadius: 15,
          },
        },

        genderRate: {
          width: '100%',
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',

          progressBarBase: {
            width: '90%',
            height: 10,
            backgroundColor: '#FF7596',
            borderRadius: 50,
          },

          progressBar: {
            height: 10,
            backgroundColor: '#2551C3',
            borderRadius: 50,
          },

          textContainer: {
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,

            row: {
              flexDirection: 'row',
              alignItems: 'center',
            },
          },
        },
      },
    },
  },
});

export default DetailsScreen;
