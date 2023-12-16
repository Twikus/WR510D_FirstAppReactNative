import { View, Text, StyleSheet } from 'react-native';
import OnBoarding from '../components/Home/OnBoarding';

const HomeScreen = () => {

    return (
        <View style={styles.container}>
            <OnBoarding />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default HomeScreen;