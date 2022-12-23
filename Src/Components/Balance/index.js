import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default function Balance(props) {
    const total = props.balances - props.spending;
    console.log(total);
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.itemTitle}>Saldo</Text>
                <View style={styles.content}>
                    <Text style={styles.currencySimbol}>R$</Text>
                    <Text style={total >= 0 ? styles.balance : styles.expenses}> {total < 0 && '-' }{maskMoney(total)}</Text>
                </View>
            </View>
            <View style={styles.subContainer}>
                <View style={styles.subView}>
                    <Text style={styles.subTitle}>Entrada:</Text>
                    <Text style={styles.subBalance}>{maskMoney(props.balances)}</Text>
                </View>
                <View style={styles.subView}>
                    <Text style={styles.subTitle}>Saída:</Text>
                    <Text style={styles.subExpenses}>{maskMoney(props.spending)}</Text>
                </View>
            </View>
        </View>
    );
    function maskMoney(value) {
        let newValue = value ? value : 0;
        newValue = parseFloat(newValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        if (newValue) { newValue = newValue.split("R$").length > 0 ? newValue.split("R$")[1] : newValue; }
        return newValue;
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1B1E23',
        flexDirection: 'row',
        justifyContent: 'space-between',

        paddingStart: 18,
        paddingEnd: 18,
        marginTop: -24,
        marginStart: 14,
        marginEnd: 14,
        borderRadius: 4,
        paddingTop: 14,
        paddingBottom: 14

    },
    subContainer: {
        width: '40%',
        justifyContent: 'center',

    },
    itemTitle: {
        fontSize: 20,
        color: '#DADADA',
    },
    subTitle: {
        fontSize: 12,
        color: '#DADADA',
    },
    subView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currencySimbol: {
        color: '#DADADA',
        marginRight: 6
    },
    balance: {
        fontSize: 22,
        color: "#2ecc71"
    },
    subBalance: {
        fontSize: 16,
        color: "#2ecc71"
    },
    expenses: {
        fontSize: 22,
        color: '#e75c3c'
    },
    subExpenses: {
        fontSize: 16,
        color: '#e75c3c'
    }
})