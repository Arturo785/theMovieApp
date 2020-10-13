import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Image, ScrollView} from 'react-native'
import {getMovieByIdAPI,} from "../api/Movies/"
import {IMAGE_BASE_URL} from "../utils/Constants"
import ModalVideo from "../components/ModalVideo"
import { IconButton, Title, Text} from 'react-native-paper'
import { map } from 'lodash'
import { Rating } from "react-native-ratings"
import starDark from "../assets/png/starDark.png"
import starLight from "../assets/png/starLight.png"

import UsePreferences from '../hooks/UsePreferences'
 

export default function Movie(props) {

    const {route} = props

    const {id} = route.params

    const [movieData, setMovieData] = useState(null) // I used empty object instead of (if(!movieData) return null) but sometimes does not work
    const [showVideo, setShowVideo] = useState(false)

    //HOOKS ////////

    useEffect(() => {
        getMovieByIdAPI(id).then((result) => {
            setMovieData(result)
        })
    }, []);

    if(!movieData) return null // to protect from movie data not available 

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MovieImage posterPath={movieData.poster_path}/>
                <MovieTrailer setShow={setShowVideo} />
                <MovieTitle movie={movieData} />
                <MovieRating voteCount={movieData.vote_count} voteAverage={movieData.vote_average} />
                <Text style={styles.overview }>{movieData.overview}</Text>
                <Text style={[styles.overview, {marginBottom: 30} ]}>
                  Launch date: {movieData.release_date}
                </Text>
            </ScrollView>
            <ModalVideo 
                show={showVideo} setShow={setShowVideo} idMovie={id}
            />
        </>
    )
}

function MovieImage(props){
    const {posterPath} = props

    const imageUrl = `${IMAGE_BASE_URL}/w500${posterPath}`

    return (
        <View style={styles.viewPoster}>
            <Image
                style={styles.poster}
                source={{uri: imageUrl}}
            />
        </View>
    );
}

function MovieTrailer(props){

    const {setShow} = props

    return(
        <View style={styles.viewPlay}>
            <IconButton 
                icon = "play"
                color = "#000"
                size = {30}
                onPress={() => setShow(true)}
                style = {styles.play}
            />
        </View>
    );
}

function MovieTitle(props){
    
    const {movie} = props

    return(
        <View style={styles.viewInfo}>
            <Title>{movie.title}</Title>

            <View style={styles.viewGenres}>
                {map(movie.genres, (genre) =>(
                    <Text key = {genre.id} style={styles.genreText}>
                        {genre.name}
                    </Text>
                ))}  
            </View>
        </View>
    
    )

}

function MovieRating(props){

    const {voteCount, voteAverage} = props

    const media = voteAverage / 2

    const {theme} = UsePreferences()


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

            <Text style={{fontSize : 16, marginRight : 5}}>{media}</Text>
            <Text style={{fontSize : 14, marginRight : 5, color : "#8697a5"}}> |  {voteCount} votes</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    poster :{
        width : "100%",
        height : 500,
        borderBottomLeftRadius : 30,
        borderBottomRightRadius : 30,
    },
    viewPoster : {
        shadowColor : "#000",
        shadowOffset : {
            width : 0,
            height : 10,
        },
        shadowOpacity : 1,
        shadowRadius : 10,
    },
    viewPlay: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    play: {
        backgroundColor: '#fff',
        marginTop: -40,
        marginRight: 30,
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    viewInfo :{
        marginHorizontal : 30
    },
    viewGenres : {
        flexDirection : "row"
    },
    genreText :{
        marginRight : 5,
        color : "#8697a5"
    },
    viewRating : {
        marginHorizontal : 30,
        marginTop : 10,
        flexDirection : "row",
        alignItems : "center",
    },
    overview :{
        marginHorizontal : 30,
        marginTop : 20,
        textAlign : "justify",
        color : "#8697a5"
    }

})
