/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
//Biblioteca de estilos para utilização de icones personalizados em todo o código.

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import { faHomeUser } from '@fortawesome/free-solid-svg-icons/faHomeUser';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faGenderless } from '@fortawesome/free-solid-svg-icons/faGenderless';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays';
import { teste } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faSquareCheck, faMugSaucer, faHomeUser, faHome, faSearch, faPlus,faPlusCircle,faGenderless,faCalendar,faCalendarDays);

import { NavigationContainer } from '@react-navigation/native';
import Routes from './Src/Components/Routes';
import AsyncStorage from '@react-native-community/async-storage';

export default function App() {
  useEffect(() => {
    async function createDataBase() {
      try {
        let data = {
          nome: '',
          releasesList: [],
        };
        await AsyncStorage.setItem('user', JSON.stringify(data));
      } catch (e) {
        console.log(e);
      }
    }
    async function createNextId() {
      try {
        await AsyncStorage.setItem('lastID', "0");
      } catch (e) {
        console.log(e);
      }
    }
    async function queryDataBase(key) {
      const value = await AsyncStorage.getItem(key);
      if (value === null) {
        await createDataBase();
      }
    };

    async function queryNextId(key) {
      const value = await AsyncStorage.getItem(key);
      if (value === null) {
        await createNextId();
      }
    };
    // queryDataBase('user');
    // queryNextId('lastID');
     (()=>{AsyncStorage.removeItem('user');})();
     (()=>{AsyncStorage.removeItem('lastID');})();
  }, []);
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
