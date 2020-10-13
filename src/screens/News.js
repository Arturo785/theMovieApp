import React, {useState, useEffect} from 'react'
import { StyleSheet, View, ScrollView, Dimensions, Image, TouchableWithoutFeedback } from 'react-native'
import {getNewsMoviesAPI, } from "../api/Movies"
import {Title, Text, Button} from "react-native-paper"
import { map } from 'lodash'
import defaultImage from "../assets/png/default-image.png"
import {IMAGE_BASE_URL} from "../utils/Constants"

import UsePreferences from '../hooks/UsePreferences'

const {width} = Dimensions.get("window")
const widthDivided = width / 2

export default function News(props) {

    const {navigation, } = props

    const {theme} = UsePreferences()

    const [newMovies, setNewMovies] = useState(null)
    const [pageOfQuery, setPageQuery] = useState(1)

    
    const [showMoreButton, setShowMoreButton] = useState(true)

    useEffect(() => {
        getNewsMoviesAPI(pageOfQuery).then((response) =>{
            const totalPages = response.total_pages

            if(pageOfQuery < totalPages){
                if(!newMovies){ // is fist time loading
                    setNewMovies(response.results)
                }
                else{ // already has content
                    setNewMovies([...newMovies, ...response.results]) // gets the old array and adds all the new movies to it
                }
            }
            else{ // no more pages
                setShowMoreButton(false)
            }
        })
    }, [pageOfQuery])

    return (
        <ScrollView>
            <View style={styles.containerMovies}>
                {map(newMovies, (movie, index) => (
                    <NewMovies key={index} movie={movie} navigation={navigation} />
                ))}
            </View>

            {showMoreButton && (
                <Button 
                    mode="contained"
                    contentStyle={styles.loadMoreContainer}
                    style={styles.loadMore}
                    labelStyle={{color : theme === "dark" ? "#fff": "#000"}}
                    onPress={() => setPageQuery(pageOfQuery +1)}
                    > 
                    Load more
                </Button>
            )}
        </ScrollView>
    )
}


function NewMovies(props){

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
    containerMovies : {
        flex : 1,
        flexDirection : "row",
        flexWrap : "wrap",
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
    loadMoreContainer : {
        paddingTop : 10,
        paddingBottom : 30,
    },
    loadMore : {
        backgroundColor : "transparent",
    }
})
