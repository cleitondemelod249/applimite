import React, { useState, useEffect } from 'react';
import { WebView, View, StyleSheet, Text, Image, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native';

export default function Videos( {navigation} ) {
    const [nameSession, setName] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('mat').then(dis => {
            if (dis) {
                var breakDis = dis.split('|');
                setName(breakDis);
            }
        })
    }, []);

    async function goHome() {
        navigation.navigate('Index');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}> Olá, estamos trabalhando nisso... </Text>
            <Text style={{padding: 15}}> Disciplinas escolhidas foram: {nameSession} </Text>

            <View style={styles.form}>
                <TouchableOpacity onPress={goHome} style={styles.button}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        fontSize: 25
    },
    button: {
        height: 42,
        backgroundColor: '#999',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 2
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    }
})