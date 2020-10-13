import React from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import StackNavigation from "../navigation/StackNavigation"
import DrawerContent from "../navigation/DrawerContent"

const Drawer = createDrawerNavigator()



export default function Navigation() {
    return (                                                                //Se envia todo el contenido de props
        <Drawer.Navigator initialRouteName="app" drawerContent={(props) => <DrawerContent {...props} />}>

            <Drawer.Screen
                name="app"
                component={StackNavigation}
            />

        </Drawer.Navigator>
    )
}
