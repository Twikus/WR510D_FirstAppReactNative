import { View, Text, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

const Regions = ({ name }) => {
    const style = styles;

    const [regions, setRegions] = useState([]);

    useEffect(() => {
        setRegions(name);
    }, []);


    const regionsImages = {
        Alola: require("../assets/img/regions/Alola.png"),
        Galar: require("../assets/img/regions/Galar.png"),
        Hoenn: require("../assets/img/regions/Hoenn.png"),
        Johto: require("../assets/img/regions/Johto.png"),
        Kalos: require("../assets/img/regions/Kalos.png"),
        Kanto: require("../assets/img/regions/Kanto.png"),
        Sinnoh: require("../assets/img/regions/Sinnoh.png"),
        Unova: require("../assets/img/regions/Unova.png"),
      };

    const findImageByRegions = (regions) => {
      if (regionsImages[regions]) {
        return regionsImages[regions];
      } else {
        return null;
      }
    };

    const renderRegions = () => {
        if(regions && regions.length > 0) {
            const image = findImageByRegions(regions);

            return (
                <Image
                    style={styles.body.container.imageBackground}
                    defaultSource={image}
                    source={image}
                />
            );
        } else {
            return null;
        }
    };

    return (
        <View style={style.body}>
            <View style={style.body.container}>
                <Text style={style.body.container.name}>{name}</Text>
                {renderRegions()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12,

        container: {
            position: "relative",

            name: {
                fontFamily: "poppins-semi-bold",
                fontSize: 20,
                color: "#fff",
                position: "absolute",
                top: "35%",
                left: 30,
                zIndex: 1,
                borderRadius: 10,
            },

            imageBackground : {
                resizeMode: "contain",
            },
        },
    },
});

export default Regions;