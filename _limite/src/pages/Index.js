import React, { useState, useEffect } from 'react';
import { Button, View, StyleSheet, Text, Image, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native';

export default function Index( { navigation } ) {
    const [nameSession, setName] = useState('');
    const [imageSession, setImage] = useState('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png');
    const [mailSession, setMail] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('name').then(user => {
            if (user) {
                setName(user);
            }
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('mail').then(email => {
            if (email) {
                setMail(email);
            }
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('photo').then(userImage => {
            if (userImage) {
                setImage(userImage);
            }
        })
    }, []);

    async function pageSair() {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    async function pageCalendary() {
        navigation.navigate('Eventos');
    }

    async function pageAssuntos() {
        navigation.navigate('Assuntos');
    }

    async function pageVideos() {
        navigation.navigate('Videos');
    }

    return (
        <View style={ styles.container }>
            <Image style={styles.image} source={ {uri: imageSession} } />
            <Text style={styles.header}>{ nameSession }</Text>
            <Text> { mailSession } </Text>

            <ScrollView style={styles.form}>

                <TouchableOpacity onPress={pageCalendary} style={styles.button}>
                    <Text style={styles.buttonText}>Agendar Provas</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={pageAssuntos} style={styles.button}>
                    <Text style={styles.buttonText}>Meus Assuntos</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={pageVideos} style={styles.button}>
                    <Text style={styles.buttonText}>Ver videos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Treinar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={pageSair} style={styles.button}>
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        marginTop: 100
    },
    header: {
        marginTop: 8,
        fontSize: 25
    },
    image: {
        marginTop: 10,
        width: 100,
        height: 100,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 150
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        marginTop: 15,
        backgroundColor: '#f05a5b',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 2
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
})