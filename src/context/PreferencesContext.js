import {createContext} from 'react'
import { View, Text } from 'react-native'


//The state of the theme and the lambda to change the theme
const PreferenceContext  = createContext({
    theme : "",
    toggleTheme: () => {},
}) 

export default PreferenceContext;
