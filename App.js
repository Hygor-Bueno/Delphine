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

library.add(fab, faSquareCheck, faMugSaucer, faHomeUser,faHome,faSearch,faPlus);

import { NavigationContainer } from '@react-navigation/native';
import Routes from './Src/Components/Routes';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfafb',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  },
  username: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold'
  },

});