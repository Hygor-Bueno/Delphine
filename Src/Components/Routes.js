import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Pages/Home"
import InitPage from "../Pages/PageTeste/InitPage";
import FinalPage from "../Pages/PageTeste/FinalPage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BtnReleases from "./Buttons/BtnReleases";
import AsyncStorage from "@react-native-community/async-storage";

const Tab = createBottomTabNavigator();
export default function Routes() {
    const [spending, setSpending] = useState(0);
    const [balances, setBalances] = useState(0);
    const [movements, setMovements] = useState({});
    useEffect(() => { console.log(movements) });
    useEffect(() => {
        const getStorange = async (key) => {
            try {
                const value = await AsyncStorage.getItem(key);
                let newValue = JSON.parse(value);
                setMovements(newValue);
                console.log(newValue);
                if (value !== null && newValue.releasesList.length > 0) {
                    console.warn(value.releasesList.length);
                    newValue.releasesList = orderObjectArrayByString(thisMonth(newValue.releasesList || []));
                    calcExpenses(newValue.releasesList || []);
                }
            } catch (error) {
                console.log(error);
            }
        };
        function orderObjectArrayByString(array) {
            return array.sort((x, y) => {
                let a = Date.parse(convertDateToUS(x.date)),
                    b = Date.parse(convertDateToUS(y.date));
                return a === b ? 0 : a > b ? 1 : -1;
            });
        }
        function convertDateToUS(date) {
            let newDate = date.split('/');
            return newDate[2] + '-' + newDate[1] + '-' + newDate[0];
        }
        getStorange('user');
        function calcExpenses(array) {
            let newSpending = 0,
                newBalances = 0;
            array.forEach(item => {
                if (parseInt(item.type) === 1) {
                    newBalances += parseFloat(item.value);
                } else {
                    newSpending += parseFloat(item.value);
                }
            });
            setBalances(newBalances);
            setSpending(newSpending);
        }
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
    }, []);

    // const [text, setText] = useState("DelRei")
    return (
        <Tab.Navigator
            initialRouteName="Inicial"
            screenOptions={stylesNav}
        >
            <Tab.Screen
                name="Home"
                children={() => <Home spending={spending} balances={balances} movements={movements} />}
                options={{
                    title: '',
                    headerShown: false,
                    headerTransparent: true,
                    detachInactiveScreens: false,
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesomeIcon icon="home" name="home" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Inicial"
                children={() => <InitPage spending={spending} balances={balances} setBalances={setBalances} setSpending={setSpending} setMovements={setMovements} />}
                options={{
                    title: '',
                    headerShown: false,
                    headerTransparent: true,
                    tabBarIcon: ({ focused, size, color }) => (
                        <BtnReleases size={size} focused={focused} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Final"
                component={FinalPage}
                options={{
                    title: '',
                    headerShown: false,
                    headerTransparent: true,
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesomeIcon icon="search" name="search" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const stylesNav = {
    tabBarStyle: {
        backgroundColor: '#121212',
        borderTopColor: 'transparent'
    },
    tabBarActiveTintColor: 'white'
}
