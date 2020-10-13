import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import {Drawer, Switch, Title, TouchableRipple, Text} from "react-native-paper"
import usePreference from "../hooks/UsePreferences"


export default function DrawerContent(props) {

    const {navigation} = props

    const [isActive, setIsActive] = useState("home")

    const {theme, toggleTheme} = usePreference();


    const onChangeScreen = (screen) =>{
        setIsActive(screen)
        navigation.navigate(screen)
    }


    return (

        <DrawerContentScrollView style={{height : "100%",flex:1}}>

            <Title style={styles.welcomeText}>
                Menu
            </Title>

            <Drawer.Section>

                <Drawer.Item
                    label="Home"
                    icon="home"
                    active={isActive === "home"}
                    onPress={() => onChangeScreen("home")}
                />

                <Drawer.Item
                    label="Popular Movies"
                    icon="star"
                    active={isActive === "popular"}
                    onPress={() => onChangeScreen("popular")}
                />

                <Drawer.Item
                    label="New Movies"
                    icon="flash"
                    active={isActive === "news"}
                    onPress={() => onChangeScreen("news")}
                />

            </Drawer.Section>

            <Drawer.Section title="options">

                <TouchableRipple>
                    <View style={styles.preferences}>
                        <Text>Dark theme</Text>
                        <Switch value={theme === "dark" ? true : false}
                             onValueChange={toggleTheme}
                        />
                    </View>
                </TouchableRipple>

            </Drawer.Section>

   
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    welcomeText :{
        paddingStart :10,
        fontSize : 24,
        paddingBottom : 10,
    },
    preferences :{
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        paddingVertical : 12,
        paddingHorizontal : 16,
    },
    
})
