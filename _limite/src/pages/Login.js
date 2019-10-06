import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';

import logo from '../../assets/1570296216584.png';

import * as Google from 'expo-google-app-auth';


/*export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signedIn: false,
            name: "",
            photoUrl: "",
            mail: ""
        }
    }
    signIn = async ( {navigation} ) => {
        try {
            const result = await Google.logInAsync({
                androidClientId:
                    "156108739834-jgtdo5q4m9m0mse482gniphqof4i2g0s.apps.googleusercontent.com",
                //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
                scopes: ["profile", "email"]
            })

            if (result.type === "success") {
                await AsyncStorage.setItem('signedIn', true);
                await AsyncStorage.setItem('name', result.user.name);
                await AsyncStorage.setItem('mail', result.user.email);
                
                navigation.navigate('Eventos');
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.signedIn ? (
                    <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} mail={this.state.mail} />
                ) : (
                        <LoginPage signIn={this.signIn} />
                    )}
            </View>
        )
    }
}*/

export default function Login({ navigation }) {

    useEffect(() => {
        AsyncStorage.getItem('name').then(user => {
            if(user) {
                navigation.navigate('Index');
            }
        })
    }, [])

    async function signIn() {
        try {
            const result = await Google.logInAsync({
                androidClientId:
                    "156108739834-jgtdo5q4m9m0mse482gniphqof4i2g0s.apps.googleusercontent.com",
                //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
                scopes: ["profile", "email"]
            })

            if (result.type === "success") {
                await AsyncStorage.setItem('name', result.user.name);
                await AsyncStorage.setItem('photo', result.user.photoUrl);
                await AsyncStorage.setItem('mail', result.user.email);
                navigation.navigate('Index');
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    }

    return (
        <View style={styles.container} >
            <Image source={logo} />
            <View style={styles.form}>
                <Text>** Entre com sua conta Google</Text>
                <TouchableOpacity onPress={signIn} style={styles.button}>
                    <Text style={styles.buttonText}>Google SignIn</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
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
    image: {
        marginTop: 15,
        width: 150,
        height: 150,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 150
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