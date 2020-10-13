import React, {useState, useEffect} from 'react'
import { StyleSheet, Image, View, SafeAreaView, TouchableWithoutFeedback, Dimensions, Platform, ScrollView} from 'react-native'
import {Title, Text, Searchbar} from "react-native-paper"
import {searchMoviesAPI,} from "../api/Movies/"
import {_, map} from "lodash"

import defaultImage from "../assets/png/default-image.png"
import {IMAGE_BASE_URL} from "../utils/Constants"


const {width} = Dimensions.get("window")
const widthDivided = width / 2

export default function Search(props) {

    const {navigation} = props

    const [movieSearched, setMovieSearched] = useState(null)
    const [search, setSearch] = useState("")


    // to not overload the send pf queries 
    const handleTextChange = _.debounce((text) =>{
        setSearch(text)
    },1500);


    useEffect(() => {

        if(search.length >= 3){
            searchMoviesAPI(search).then((response) =>{
                setMovieSearched(response.results)
                console.log(response)
            })
        }

    }, [search])

    return (
        <SafeAreaView>

            <Searchbar 
                placeholder="Search some movie"
                iconColor={Platform.OS === "ios" && "transparent"}
                icon= "arrow-left"
                style={styles.input}
                onChangeText={(e) => handleTextChange(e)}
            />

            <ScrollView>
                <View style={styles.containerMovies}>
                    {map(movieSearched, (movie, index) => (
                        <SearchMovie key={index} movie={movie} navigation={navigation} />
                    ))}
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

function SearchMovie(props){

    const {movie, navigation} = props
    const {id ,title, poster_path,} = movie

    const imageUrl = `${IMAGE_BASE_URL}/w500${poster_path}`

    const onNavigation = () =>{
        navigation.navigate("movie", { id })
    }

    return (
        <TouchableWithoutFeedback onPress={onNavigation}>

        <View style={styles.movieRender}>
            <Image 
                style={styles.imageMovie}
                source= {
                    poster_path
                    ? {uri: imageUrl}
                    : defaultImage
                }
            />
            <Title style={styles.movieTitle} numberOfLines={1}>{title}</Title>
        </View>

        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    input : {
        marginTop : -3,
        backgroundColor : "#15212b"
    },
    containerMovies : {
        flex : 1,
        flexDirection : "row",
        flexWrap : "wrap"
    },
    movieRender : {
        width : widthDivided,
        height : 300,
        justifyContent : "center",
        alignItems : "center"
    },
    imageMovie : {
        width : "100%",
        height : "85%",

    },
    movieTitle : {
        fontSize : 20,
        marginBottom : 10,
    },

})
