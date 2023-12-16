import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { colors } from '../assets/styles/variables';

const TitlePokemon = ({ name, url }) => {
    const id = url.split('/')[url.split('/').length - 2];
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    const [data, setData] = useState([]);
    const [types, setTypes] = useState([]);
    const typesList = [];
    const typeImages = {
        bug: require('../assets/img/types/bug.png'),
        dark: require('../assets/img/types/dark.png'),
        dragon: require('../assets/img/types/dragon.png'),
        electric: require('../assets/img/types/electric.png'),
        fairy: require('../assets/img/types/fairy.png'),
        fighting: require('../assets/img/types/fighting.png'),
        fire: require('../assets/img/types/fire.png'),
        flying: require('../assets/img/types/flying.png'),
        ghost: require('../assets/img/types/ghost.png'),
        grass: require('../assets/img/types/grass.png'),
        ground: require('../assets/img/types/ground.png'),
        ice: require('../assets/img/types/ice.png'),
        normal: require('../assets/img/types/normal.png'),
        poison: require('../assets/img/types/poison.png'),
        psychic: require('../assets/img/types/psychic.png'),
        rock: require('../assets/img/types/rock.png'),
        steel: require('../assets/img/types/steel.png'),
        water: require('../assets/img/types/water.png'),
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                setData(response.data);
                setTypes(response.data.types);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const nameCapitalized = data.name ? data.name.charAt(0).toUpperCase() + name.slice(1) : '';

    const renderTypes = () => {
        return types.map((type, index) => {
            const typeCapitalized = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
            const image = findImageByType(type.type.name);
            const backgroundColor = findColorByType(type.type.name);

            return (
                <View key={index} style={[styles.card.left.types.container, { backgroundColor }]}>
                    <View style={styles.card.left.types.container.imgContainer}>
                        <Image
                            style={styles.card.left.types.container.imgContainer.img}
                            source={image}
                        />
                    </View>
                    <Text style={styles.card.left.types.container.p}>{typeCapitalized}</Text>
                </View>
            );
        });
    };

    const findImageByType = (type) => {
        if (typeImages[type]) {
            return typeImages[type];
        } else {
            return null;
        }
    };

    const findColorByType = (type) => {
        const typeColor = colors.types[type];
        return typeColor || colors.types.default;
    };

    return (
        <View style={styles.card}>
            <View style={styles.card.left}>
                <Text style={styles.card.left.id}>N°{data.id}</Text>
                <Text style={styles.card.left.name}>{nameCapitalized}</Text>
                <View style={styles.card.left.types}>{types.length > 0 && renderTypes()}</View>
            </View>
            <Image
                style={styles.card.image}
                source={{ uri: image || 'https://via.placeholder.com/106x82' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 328,
        height: 102,
        marginBottom: 12,
        borderRadius: 15,
        backgroundColor: '#EDF6EC',
        flexDirection: 'row',
        position: 'relative',
        image: {
            width: 106,
            height: 82,
            marginLeft: 'auto',
            marginRight: 0,
            marginTop: 10,
        },
        left: {
            width: 328,
            height: 102,
            paddingLeft: 16,
            paddingTop: 12,

            id: {
                fontFamily: 'poppins-semi-bold',
                fontSize: 12,
                color: '#333',
            },
            name: {
                fontFamily: 'poppins-semi-bold',
                fontSize: 21,
                color: '#333',
            },
            types: {
                flexDirection: 'row',
                marginTop: 5,

                container: {
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 2.5,
                    paddingBottom: 2.5,
                    marginRight: 10,
                    borderRadius: 50,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',

                    p: {
                        fontFamily: 'poppins-medium',
                        fontSize: 12,
                    },

                    imgContainer: {
                        backgroundColor: '#fff',
                        paddingBottom: 5,
                        paddingLeft: 5,
                        paddingRight: 5,
                        paddingTop: 5,
                        borderRadius: 50,
                        marginRight: 5,

                        img: {
                            width: 15,
                            height: 15,
                            resizeMode: 'contain',
                        },
                    },
                },
            },
        },
        right: {
            width: 126,
            height: 102,
            position: 'absolute',
            right: 0,
        },
    },
});

export default TitlePokemon;
