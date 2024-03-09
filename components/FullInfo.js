import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { gStyle } from '../styles/style';

export default function FullInfo({ route }) {
    return (
        <View style={gStyle.main}>
            <Text style={gStyle.title}>{route.params.name}</Text>
            <Text style={styles.text} >{route.params.full}</Text>
            <Image
                style={styles.img}
                source={{
                    width: '100%',
                    height: 200,
                    uri: route.params.img
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "mont-bolt",
        fontSize: 18
    },
    text: {
        fontFamily: "mont-reg",
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        color: 'gray',
        fontWeight: 700
    },
    img:{
      marginTop: 10,
    }
})
