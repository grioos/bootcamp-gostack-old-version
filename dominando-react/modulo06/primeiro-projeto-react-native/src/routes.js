import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: '#7159c1',
                    },
                    headerTintColor: '#333',
                }}
            >
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={Main.navigationOptions}
                />
                <Stack.Screen
                    name="User"
                    component={User}
                    options={User.navigationOptions}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
