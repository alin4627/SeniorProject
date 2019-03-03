import React from 'react';
import { View, Image, Text } from 'react-native';
import { createDrawerNavigator, DrawerItems, createAppContainer, SafeAreaView  } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { ScrollView } from 'react-native-gesture-handler';

const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{ flex: 1}}>
        <View style={{height:100, backgroundColor: 'white', flexDirection: 'row',}}>
            <Image source={require('../assets/images/math.jpg')} style={{margin:20, height:65, width:65, borderRadius: 30}} />
            <Text style={{margin:30, fontSize:35}}>Math</Text>
        </View>
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
