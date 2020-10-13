import React, {useMemo,useState} from 'react'
import {StyleSheet,StatusBar} from 'react-native'
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper"
import {DarkTheme as DarkThemePaper, DefaultTheme as DefaultThemePaper} from "react-native-paper"
import {NavigationContainer,DarkTheme as DarkThemeNavigation, DefaultTheme as DefaultThemeNavigation} from "@react-navigation/native"
import Navigation from "./src/navigation/Navigation"

import PreferencesContext from "./src/context/PreferencesContext"


// This is one way of setting themes
/* const myDefaultThemePaper = {
    ...DefaultThemePaper,
    colors: {
      ...DefaultThemePaper.colors,
      primary: '#1ae1f2',
      //accent: '#f5f1da',
    },
  };

  const myDarkThemePaper = {
    ...DarkThemePaper,
    colors: {
      ...DarkThemePaper.colors,
      primary: '#1ae1f2',
      accent: '#1ae1f2',
    },
  }; */

  //This is another
  DefaultThemePaper.colors.primary = "#1ae1f2"
  DarkThemePaper.colors.primary = "#1ae1f2"
  DarkThemePaper.colors.accent = "#1ae1f2"

  DarkThemeNavigation.colors.background = "#192734"
  DarkThemeNavigation.colors.card = "#15212b"


export default function App() {

    const [theme, setTheme] = useState("dark")


    // This kind of state holds a reference 
    //Used to hold the preference of the user regarding the theme instead of choosing one every time the user uses the app
    // responds to [theme] changes
    const preference = useMemo(
        () => ({
            theme,
            toggleTheme,  // uses the states defined here and the function defined
        }),
        [theme]        
    );

    function toggleTheme() {
        setTheme(theme === "dark" ? "light" : "dark")  // changes the theme
    }

    return (
        <PreferencesContext.Provider value={preference}>

            {console.log(preference)}
            <PaperProvider theme={theme === "dark" ? DarkThemePaper : DefaultThemePaper} >
                <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
                <NavigationContainer theme={theme === "dark" ? DarkThemeNavigation : DefaultThemeNavigation}>
                    <Navigation />
                </NavigationContainer>
            </PaperProvider>
            
        </PreferencesContext.Provider>
    )
}


const styles = StyleSheet.create({
    custom :{
        backgroundColor : "#f5f1da",
        width : 200,   
    },
    container :{
        alignItems : "center"
    },
    color :{
        color:"#fff"
    }

})

