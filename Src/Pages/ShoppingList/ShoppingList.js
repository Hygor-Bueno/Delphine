import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-community/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
import Loading from '../../Components/Loading/Loading';
import ShoppItem from '../../Components/ShoppItem';
import Util from '../../Components/Utils/Util';
import Select from '../../Components/Select/Select.js';

export default function ShoppingList(props) {
    const utilGlobal = new Util();
    const listSession = [
        { value: '1', label: 'Doce' },
        { value: '2', label: 'Salgada' },
        { value: '3', label: 'Padaria' },
        { value: '4', label: 'Frio e laticíonios' },
        { value: '5', label: 'Líquida' },
        { value: '6', label: 'Higieno' },
        { value: '7', label: 'Hortifruti' },
        { value: '8', label: 'Bazar' },
        { value: '9', label: 'Açougue' },
        { value: '10', label: 'Outros' }
    ];
    const maskItem = {
        id: '',
        description: '',
        value: '',
        quantities: '',
        session: ''
    }
    const maskList =  {
        lastId: '0',
        balances: '',
        list: [],
    }
    const [session, setSession] = useState('');
    const [item, setItem] = useState(maskItem);
    const [load, setLoad] = useState(false);
    const [total, setTotal] = useState(0);
    const [shoppList, setShoppList] = useState({...maskList});


    useEffect(() => {
        const getStorange = async (key) => {
            const util = new Util();
            try {
                const value = await AsyncStorage.getItem(key);
                if (value !== null) {
                    let convert = JSON.parse(value);
                    setShoppList(convert || {});
                    let totalList = convert.balances !== '' ? convert.balances - util.calcTotal(convert.list) : util.calcTotal(convert.list);
                    setTotal(totalList);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getStorange('shoppingList');
    }, []);

    useEffect(() => {}, []);

    return (
        <View style={styles.container}>
            {load && <Loading />}
            <View style={styles.contentDatas}>
                <View style={styles.subContent}>
                    <Text style={styles.titleText}>Descrição:</Text>
                    <TextInput style={styles.textValueDesc}
                        multiline={false}
                        value={item.description}
                        onChangeText={async (text) => captureItems(text, 'description')}
                    />
                </View>
                <View style={styles.subContent}>
                    <Text style={styles.titleText}>Quantidade:</Text>
                    <TextInput style={styles.textValue}
                        multiline={false}
                        keyboardType="numeric"
                        value={item.quantities}
                        onChangeText={async (text) => captureItems(text, 'quantities')}
                    />
                </View>
                <View style={styles.subContent}>
                    <Text style={styles.titleText}>Valor:</Text>
                    <TextInput style={styles.textValue}
                        multiline={false}
                        keyboardType="numeric"
                        value={item.value}
                        onChangeText={async (text) => captureItems(text, 'value')}
                    />
                </View>
            </View>
            <View style={styles.contentDatasSession}>
                <View style={styles.subContent}>
                    <Text style={styles.titleText}>Setor:</Text>
                    <View style={styles.SelectListView}>
                        <Select value={item.session} setValue={setSessionItem} list={listSession} placeholder='Selecione' />
                    </View>
                </View>
                <View style={styles.subContentBtn}>
                    <TouchableOpacity
                        style={styles.buttonInput}
                        activeOpacity={0.5}
                        onPress={async () => {
                            setLoad(true);
                            let response = validateItem();
                            if (response.error) {
                                window.alert(response.message);
                            } else {
                                let newID = parseInt(shoppList.lastId) + 1;
                                captureItems(newID, 'id');
                                let add = shoppList;
                                add.list.push(item);
                                add.lastId = newID;
                                setShoppList({ ...add });
                                clearForm();
                                await updateShoppingList();
                                setTotal(reloadTotal());
                            }
                            setLoad(false);
                        }}
                    >
                        <FontAwesomeIcon color='white' size={22} icon="plus" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ ...styles.buttonInput, backgroundColor: '#FFA500' }}
                        activeOpacity={0.5}
                        onPress={async () => {
                            setLoad(true);
                            let response = validateItem();
                            if (response.error) {
                                window.alert(response.message);
                            } else {
                                let pos = locateItem(item.id);
                                console.log(pos);
                                let update = shoppList;
                                update.list[pos] = item;
                                setShoppList({ ...update });
                                clearForm();
                                await updateShoppingList();
                                setTotal(reloadTotal());
                            }
                            setLoad(false);
                        }}
                    >
                        <FontAwesomeIcon color='white' size={22} icon="save" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ ...styles.buttonInput, backgroundColor: '#dc3545' }}
                        activeOpacity={0.5}
                        onPress={() => {
                            setItem({ ...maskItem });
                        }}
                    >
                        <FontAwesomeIcon color='white' size={22} icon="trash" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.constentList}>
                <View style={{ alignItems: 'flex-end', marginRight: -6, marginTop: -10, marginBottom: 8 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: '#dc3545', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}
                        activeOpacity={0.5}
                        onPress={async () => {
                            setLoad(true);
                            setShoppList({...maskList});
                            await AsyncStorage.setItem('shoppingList', JSON.stringify(maskList));
                            setTotal(0);
                            setLoad(false);
                        }}
                    >
                        <FontAwesomeIcon color='#fff' size={18} icon="xmark" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.list}
                    data={shoppList.list}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <ShoppItem data={item} deleteItemList={deleteItemList} editItemList={editItemList} />}
                />
                <View style={styles.listFooterContent}>
                    <View style={styles.viewInput}>
                        <Text style={styles.inputBalance}>Limite:</Text>
                        <TextInput style={styles.textInputBalance}
                            multiline={false}
                            value={shoppList.balances}
                            keyboardType="numeric"
                            onChangeText={(text) => { alterBalance(text); setTotal(reloadTotal()); console.log(parseFloat(shoppList.balances), utilGlobal.calcTotal(shoppList.list), shoppList.list) }}
                            onBlur={async () => { await updateShoppingList(); }}
                        />
                    </View>
                    <Text style={styles.listTotal}>{shoppList.balances === '' ? 'Total:' : 'Saldo'} {utilGlobal.maskMoney(total)}</Text>
                </View>
            </View>
        </View >
    );
    function reloadTotal() {
        let result = 0;
        if (shoppList.balances === '') {
            result = utilGlobal.calcTotal(shoppList.list);
            console.log(shoppList);
        } else {
            result = (parseFloat(shoppList.balances) - utilGlobal.calcTotal(shoppList.list));
        }
        return result;
    }
    function locateItem(value) {
        let position = null;
        shoppList.list.forEach((element, index) => {
            if (element.id === value) {
                position = index;
            }
        });
        return position;
    }
    async function deleteItemList(items) {
        let newList = shoppList;
        newList.list = shoppList.list.filter(produto => produto.id !== items.id);
        setShoppList({ ...newList });
        await updateShoppingList();
        setTotal(reloadTotal());
    }
    function editItemList(items) {
        setItem({ ...items });
    }
    function validateItem() {
        let message = 'Atenção: \n';
        let result = { error: false };
        if (item.description === '' || item.session === '') {
            message += 'Os campos "Descrição" e "Setor" são obrigatórios.';
            result.error = true;
        }
        result.message = message;
        return result;
    }
    function captureItems(value, key) {
        let newValue = item;
        newValue[key] = value;
        setItem({ ...newValue });
    }
    function setSessionItem(value) {
        captureItems(value, 'session');
    }
    function clearForm() {
        setItem({ ...maskItem });
    }
    function alterBalance(text) {
        let newValue = shoppList;
        newValue.balances = text;
        setShoppList({ ...newValue })
    }
    async function updateShoppingList() {
        try {
            await AsyncStorage.setItem('shoppingList', JSON.stringify(shoppList));
        } catch (e) {
            console.log(e);
        }
    }
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#3a3b3c',
    },
    contentDatas: {
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contentDatasSession: {
        padding: 4,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    subContent: {
        justifyContent: 'space-between',
        padding: 2,
        height: 75,
        zIndex: 1
    },
    subContentBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
    },
    titleText: {
        fontSize: 20,
        color: '#CACACA',
    },
    listFooterContent: {
        flexDirection: 'row',
        marginLeft: 12,
        marginRight: 12,
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    listTotal: {
        color: 'white'
    },
    SelectListView: {
        width: 150,
        zIndex: 2
    },
    textValue: {
        borderColor: '#ccc',
        borderWidth: 1,
        width: 70,
        height: 46,
        fontSize: 22,
        borderRadius: 12,
        color: '#808080',
        backgroundColor: 'white',
    },
    textValueDesc: {
        borderColor: '#ccc',
        borderWidth: 1,
        width: 150,
        height: 46,
        fontSize: 22,
        borderRadius: 12,
        color: '#808080',
        backgroundColor: 'white',
    },
    buttonInput: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        height: 45,
        width: 45,
        borderRadius: 45 / 2,
        backgroundColor: '#218838',
        marginLeft: 10
    },
    buttonIcon: {
        color: 'white',
        fontSize: 30,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    constentList: {
        borderRadius: 12,
        flex: 1,
        backgroundColor: '#1B1E23',
        margin: 8
    },
    list: {
        padding: 6,
        height: '65%',
    },
    viewInput: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
    },
    inputBalance: {
        color: '#FFFFFF',
    },
    textInputBalance: {
        backgroundColor: 'white',
        height: 20,
        marginLeft: 8,
        width: 100,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        padding: 0,
        paddingLeft: 4
    }
})