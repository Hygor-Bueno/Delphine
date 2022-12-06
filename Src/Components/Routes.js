import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Pages/Home"
import InitPage from "../Pages/PageTeste/InitPage";
import FinalPage from "../Pages/PageTeste/FinalPage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BtnReleases from "./Buttons/BtnReleases";

const Tab = createBottomTabNavigator();
export default function Routes() {
    const [name,setName] = useState("Sovingard")
        return (
        <Tab.Navigator
        initialRouteName="Inicial"
            screenOptions={stylesNav}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    title:'',
                    headerShown:false,
                    headerTransparent:true,
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesomeIcon icon="home" name="home" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Inicial"
                component={InitPage}
                options={{
                    title:'',
                    headerShown:false,
                    headerTransparent:true,
                    tabBarIcon: ({ focused,size, color }) => (
                        <BtnReleases size={size} focused={focused} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Final"
                component={FinalPage}
                options={{
                    title:'',
                    headerShown:false,
                    headerTransparent:true,
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
