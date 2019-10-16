import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  StyleSheet,
  Text,
  CheckBox,
  View,
  ScrollView,
  Alert
} from 'react-native';

import Constants from 'expo-constants';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Matematica',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Portugues',
  },
  {
    id: '586asa0f-3da1-471f-bd96-145571e29d72',
    title: 'Filosofia',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d22',
    title: 'Fisica',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571ez9d72',
    title: 'Quimica',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571x29d72',
    title: 'Biologia',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145570e29d72',
    title: 'Geografia',
  },
  {
    id: '58694a0f-3da1-471f-bd96-225571e29d72',
    title: 'Historia',
  },
];

export default function Assuntos({ navigation }) {
  const [selected, setSelected] = React.useState(new Map());
  var sValor = '';

  function Item({ id, title, selected, onSelect }) {
    return (
      <View style={styles.viewDis}>
        <CheckBox style={{ fontSize: 17 }} onChange={() => Dis(title)} />
        <Text style={styles.viewText}>{title}</Text>
      </View>
    );
  }

  async function Dis(dis) {
    sValor = sValor + dis + "|";
    await AsyncStorage.setItem('mat', sValor);
  }

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

  async function back() {
    navigation.navigate('Index');
  }

  async function showAlert() {
    Alert.alert(
      'Disciplinas Foram Salvas',
      'Suas Disciplinas foram salvas e agora iremos trabalhar em disponibilizar suas aulas e exercicios.',
      [
        { text: "OK", onPress: () => back() },
      ],
      { cancelable: false },
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 38, backgroundColor: '#B0C4DE', marginBottom: 15 }} >
        <Text onPress={back} style={{ fontSize: 14, padding: 10, backgroundColor: '#778899' }}>Voltar</Text>
      </View>
      <ScrollView>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.title}
              selected={!!selected.get(item.id)}
              onSelect={onSelect}
            />
          )}
          keyExtractor={item => item.id}
          extraData={selected}
        />
      </ScrollView>
      <View style={styles.form}>
        <TouchableOpacity onPress={showAlert} style={styles.button}>
          <Text style={styles.buttonText}>Selecionar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#FFF'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  viewDis: {
    marginTop: 20,
    backgroundColor: '#F8F8FF',
    paddingLeft: 12,
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  viewText: {
    fontSize: 16,
    padding: 10,
    color: '#000',
  },
  button: {
    height: 48,
    backgroundColor: '#32CD32',
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 1,
    padding: 10
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  form: {
    alignSelf: 'stretch',
  }
});