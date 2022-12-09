import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Header from '../../Components/Header';
import Balance from '../../Components/Balance';
import Movements from '../../Components/Movements';
// import Actions from '../../Components/Actions';
export default function Home(props) {
  return (
    <View style={styles.container}>
      <Text>{props.text}</Text>
      <Header name={props.propValue} />
      <Balance balances={props.balances} spending={props.spending} />
      {/* <Actions /> */}
      <Text style={styles.title}> Últimas movimentações</Text>
      <FlatList
        style={styles.list}
        data={thisMonth(props.movements.releasesList || [])}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Movements data={item} />}
      />
    </View>
  );
  function thisMonth(array) {
    let data = new Date();
    let month = String(data.getMonth() + 1).padStart(2, '0');
    let year = data.getFullYear();
    let validate = `${month}/${year}`;
    let newList = [];
    array.forEach(item => {
      if (item.date.includes(validate)) { newList.push(item); }
    });
    return newList;
  }
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
  }
});