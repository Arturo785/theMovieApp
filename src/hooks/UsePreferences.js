import {useContext} from "react"
import PreferencesContext from "../context/PreferencesContext";


//Export our own made context
export default () => useContext(PreferencesContext);