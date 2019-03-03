import React from 'react';
import { Platform } from 'react-native';
import { createDrawerNavigator, DrawerItems, createAppContainer, SafeAreaView  } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { ScrollView } from 'react-native-gesture-handler';

const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{ flex: 1}}>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
    </SafeAreaView>
)

const AppDrawer = createDrawerNavigator({
    Home: HomeScreen,
    Settings: SettingsScreen,
}, {
    contentComponent: CustomDrawerComponent
});

const AppDrawerNavigator = createAppContainer(AppDrawer);

export default AppDrawerNavigator;
