import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Image, ScrollView, TouchableWithoutFeedback} from 'react-native'
import {getPopularMoviesAPI,} from "../api/Movies/"
import {Title, Text, Button} from "react-native-paper"
import {IMAGE_BASE_URL} from "../utils/Constants"
import { map } from 'lodash'
import defaultImage from "../assets/png/default-image.png"
import { Rating } from 'react-native-ratings'
import starDark from "../assets/png/starDark.png"
import starLight from "../assets/png/starLight.png"

import UsePreferences from '../hooks/UsePreferences'


export default function Popular(props) {

    const {navigation,} = props

    const {theme} = UsePreferences()

    const [popularMovies, setPopularMovies] = useState(null)

    const [showMoreButton, setShowMoreButton] = useState(true)
    const [pageOfQuery, setPageOfQuery] = useState(1)

    useEffect(() => {
        getPopularMoviesAPI(pageOfQuery).then((response) =>{
            const totalPages = response.total_pages

            if(pageOfQuery < totalPages){
                if(!popularMovies){ // is fist time loading
                    setPopularMovies(response.results)
                }
                else{ // already has content
                    setPopularMovies([...popularMovies, ...response.results]) // gets the old array and adds all the new movies to it
                }
            }
            else{ // no more pages
                setShowMoreButton(false)
            }
        })
    }, [pageOfQuery])

    return (
        <ScrollView>
            {map(popularMovies, (movie,index) => (
                <PopularMovie key={index} movie={movie} theme={theme} navigation={navigation} />
            ))}   

            {showMoreButton && (
                <Button 
                    mode="contained"
                    contentStyle={styles.loadMoreContainer}
                    style={styles.loadMore}
                    labelStyle={{color : theme === "dark" ? "#fff": "#000"}}
                    onPress={() => setPageOfQuery(pageOfQuery +1)}
                    > 
                    Load more
                </Button>
            )}
        </ScrollView>
    )
}


function PopularMovie(props){

    const {movie,theme, navigation} = props

    const {id ,poster_path, title, release_date, vote_count, vote_average} = movie

    const imageUrl = `${IMAGE_BASE_URL}/w500${poster_path}`

    const onNavigation = () =>{
        navigation.navigate("movie", { id })
    }


    return(
        <TouchableWithoutFeedback onPress={onNavigation}>

        <View style={styles.movieView}>

            <View style={styles.leftView}>
                <Image 
                    style={styles.imageMovie}
                    source= {
                        poster_path
                        ? {uri: imageUrl}
                        : defaultImage
                    }
                />
            </View>

            <View style={styles.rightView}>
                <Title> {title} </Title>
                <Text> {release_date} </Text>
                <MovieRatings voteCount={vote_count} voteAverage={vote_average} theme={theme} />
            </View>

        </View>

        </TouchableWithoutFeedback>
    )
}

function MovieRatings(props){

    const {voteCount, voteAverage, theme} = props

    const media = voteAverage / 2

    return(
        <View style={styles.viewRating}> 
            <Rating 
                type="custom"
                readonly={true}
                ratingImage = {theme === "dark" ? starDark : starLight}
                ratingColor = "#ffc205"
                ratingBackgroundColor = {theme === "dark" ? "#192734" : "#f0f0f0"}
                startingValue = {media}
                imageSize={20}
                style={{marginRight : 15,}}
            />
            <Text style={{fontSize : 12, color: "#8697a5", marginTop : 5}}>
                {voteCount} votes
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    movieView :{
        marginBottom : 20,
        flexDirection : "row",
        alignItems : "center"
    },
    leftView :{
        marginRight : 20,
    },
    imageMovie : {
        width : 100,
        height : 150,

    },
    viewRating : {
        alignItems : "flex-start",
        justifyContent : "flex-start",
        marginTop : 10
    },
    loadMoreContainer : {
        paddingTop : 10,
        paddingBottom : 30,
    },
    loadMore : {
        backgroundColor : "transparent",
    }
})
