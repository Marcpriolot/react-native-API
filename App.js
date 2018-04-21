import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import Home from './componant/Home'
import User from './componant/User'
import { TabNavigator, TabBarBottom } from 'react-navigation'; // 1.0.0-beta.27



export default TabNavigator(
    {
        Home: { screen: Home },
        User: { screen: User },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-cloudy-night${focused ? '' : '-outline'}`;
                } else if (routeName === 'User') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                }

                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#007aff',
            inactiveTintColor: '#7f7f7f',
        },
        animationEnabled: false,
        swipeEnabled: false,
    }
);