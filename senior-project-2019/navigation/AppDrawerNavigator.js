import React from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';
import { createDrawerNavigator, DrawerItems, createAppContainer, SafeAreaView  } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ClassesScreen from '../screens/ClassesScreen';
import UpcomingScreen from '../screens/UpcomingScreen';
import { ScrollView } from 'react-native-gesture-handler';

const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{ flex: 1}}>
        <View style={{height:100, backgroundColor: 'white', flexDirection: 'row',}}>
            {/* <Image source={require('../assets/images/math.jpg')} style={{margin:20, height:65, width:65, borderRadius: 30}} /> */}
            <Text style={{margin:30, fontSize:30}}>CSCI 335</Text>
        </View>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
    </SafeAreaView>
)

const AppDrawer = createDrawerNavigator({
    Home: HomeScreen,
    Classes: ClassesScreen,
    Upcoming: UpcomingScreen,
    Settings: SettingsScreen,
}, {
    contentComponent: CustomDrawerComponent
});

const AppDrawerNavigator = createAppContainer(AppDrawer);

export default AppDrawerNavigator;
