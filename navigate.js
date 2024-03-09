import React from "react";
import MainPage from "./components/MainPage";
import FullInfo from "./components/FullInfo";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen
                name="MainPage"
                component={MainPage}
                options={
                    {
                        title: 'Main Card News',
                        headerStyle: {
                            backgroundColor: '#999',
                            height: 70,
                        },
                        headerTitleStyle: {
                            fontWeight: 'light',
                            fontFamily: "mont-bolt",
                        }
                    }}
            />
            <Stack.Screen
                name="FullInfo"
                component={FullInfo}
                options={
                    {
                        title: 'Full Info',
                        headerStyle: {
                            backgroundColor: '#0999',
                            height: 70,
                        },
                        headerTitleStyle: {
                            fontWeight: 'light',
                            fontFamily: "mont-bolt",
                        }
                    }}
            />
        </Stack.Navigator>
    </NavigationContainer >
}