import React, { Component, useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';

import CalendarPicker from 'react-native-calendar-picker';

export default class Eventos extends Component {
    constructor(props, { navigation }) {
        super(props);
        this.state = {
            selectedStartDate: null,
            selectedEndDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('name');
            if (value !== null) {
                // We have data!!
                console.log(value);
            }
            console.log('testando...');
        } catch (error) {
            // Error retrieving data
        }
    };

    onDateChange(date, type) {
        if (type === 'END_DATE') {
            this.setState({
                selectedEndDate: date,
            });
        } else {
            this.setState({
                selectedStartDate: date,
                selectedEndDate: null,
            });
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(); // Today
        var day = new Date().getDay();
        var month = new Date().getMonth() + 3; //Current Month
        var year = new Date().getFullYear(); //Current Year
        const maxDate = new Date(year, month, day);

        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';

        return (
            <View style={styles.container} >
                <Text style={styles.lblCalendary}>Selecione seu Periodo de Prova: </Text>
                <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={true}
                    minDate={minDate}
                    maxDate={maxDate}
                    weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
                    months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
                    previousTitle="Anterior"
                    nextTitle="Próximo"
                    todayBackgroundColor="#e6ffe6"
                    selectedDayColor="#66ff33"
                    selectedDayTextColor="#000000"
                    scaleFactor={375}
                    textStyle={{
                        color: '#000000',
                    }}
                    onDateChange={this.onDateChange}
                />

                <View style={styles.form}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Estou Pronto :)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() =>
                        navigate('Index')
                    } style={styles.buttonCancel}>
                        <Text style={styles.buttonTextCancel}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 60,
    },
    lblCalendary: {
        fontSize: 16,
        paddingBottom: 30,
        marginLeft: 15
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 2
    },
    buttonCancel: {
        height: 42,
        marginTop: 5,
        backgroundColor: '#000',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 2
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonTextCancel: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});