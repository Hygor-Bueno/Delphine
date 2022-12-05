import React from 'react';
import { StyleSheet, View,Text , FlatList} from 'react-native';
import Header from '../../Components/Header';
import Balance from '../../Components/Balance';
import Movements from '../../Components/Movements';
import Actions from '../../Components/Actions';
const list=[
  {
    id:1,
    label:'Boleto Luz',
    value:'70,90',
    date:'17/09/2022',
    type:0
  },
  {
    id:2,
    label:'Pix Doceria',
    value:'170,90',
    date:'18/09/2022',
    type:1
  },
  {
    id:3,
    label:'Salário',
    value:'2.170,90',
    date:'19/09/2022',
    type:1
  }
]
export default function Home() {
  return (
    <View style={styles.container}>
      <Header name="Hygor A. Bueno"/>
      <Balance saldo="9250,90" gastos="-2.2570,00"/>
      <Actions />
      <Text style={styles.title}> Últimas movimentações</Text>
      <FlatList 
        style={styles.list} 
        data={list} 
        keyExtractor={(item)=>String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({item})=><Movements data={item}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfafb',
  },
  title:{
    fontSize:18,
    fontWeight:'bold',
    margin:14
  },
  list:{
    marginStart:14,
    marginEnd:14,
  }
});