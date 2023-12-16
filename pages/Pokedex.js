import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import TitlePokemon from '../components/TitlePokemon';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PokedexScreen = () => {
    const style = styles.container;

    const [data, setData] = useState([]);

    const listPokemon = axios.get('https://pokeapi.co/api/v2/pokemon/');
    useEffect(() => {
        listPokemon.then(function (response) {
            // console.log(response.data);
            setData(response.data);
        })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <View style={style}>
            <View style={style.header}>
                <Text>Header</Text>
            </View>

            <View style={style.body}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={style.list}
                    numColumns={1}
                    data={data.results}
                    renderItem={({ item }) => <TitlePokemon name={item.name} url={item.url} /> }
                    keyExtractor={item => item.name}>
                </FlatList>
            </View>

            <View style={style.footer}>
                <Text>Footer</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',

        list: {
            marginTop: 30,
            marginLeft: 'auto',
            marginRight: 'auto',
            // cacher barre de scroll
            overflow: 'hidden',
        },
    },
});

export default PokedexScreen;