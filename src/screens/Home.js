import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {getNewsMoviesAPI, getGenreMovieAPI, getMoviesByGenre} from "../api/Movies"
import {Title} from "react-native-paper"
import CarouselVertical from "../components/CarouselVertical"
import CarouselMulti from "../components/CarouselMulti"
import { map } from 'lodash'

export default function Home(props) {

    const {navigation} = props

    const [newMovies, setNewMovies] = useState(null)
    const [allGenres, setAllGenres] = useState(null)
    const [genreSelected, setGenreSelected] = useState(28) // 28 is the first genre not best practice though
    const [moviesFetched, setMoviesFetched] = useState(null)


    useEffect(() => {
        // we firts get the genres, otherwise it passes null to others
        getGenreMovieAPI().then(response => {
            setAllGenres(response.genres)

            getNewsMoviesAPI().then(response => {
                setNewMovies(response.results)
            })
        })

    }, [])

    useEffect(() => {
        getMoviesByGenre(genreSelected).then((response) =>{
            setMoviesFetched(response.results)
        })
    }, [genreSelected])

    //END OF HOOKS 

    const onChangeGender = (genrePassed) =>{
        setGenreSelected(genrePassed)
    }
        

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {newMovies && (
                <View style={styles.news}>
                    <Title style={styles.newsTitle}>Nuevas Peliculas</Title>
                    <CarouselVertical dataReceived={newMovies} allGenres={allGenres} navigation={navigation} />
                </View>
            )}

            <View style={styles.moviesByGenresStyle}>

                <Title style={styles.genresTitle}>Movies by genre</Title>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genresList}>
                    {map(allGenres, (genre) => (
                        <Text key={genre.id} 
                            style=
                                {[styles.genreItemText,
                                {color : genre.id !== genreSelected ? "#8697a5" : "#fff"}]}
                                onPress={() => onChangeGender(genre.id)}
                                >
                            {genre.name}
                        </Text>
                    ) )}
                </ScrollView>
                {moviesFetched && (
                    <CarouselMulti dataReceived={moviesFetched} navigation={navigation} />
                )}
            </View>
        </ScrollView>
        
    )
}


const styles = StyleSheet.create({
    news:{
        marginVertical : 10,
    },
    newsTitle:{
        marginBottom : 15,
        marginHorizontal : 20,
        fontWeight : "bold",
        fontSize : 22,
    },
    moviesByGenresStyle :{
        marginTop : 5,
        marginBottom : 50,

    },
    genresTitle : {
        marginHorizontal : 20,
        fontWeight : "bold",
        fontSize : 22,
    },
    genresList :{
        marginTop : 5,
        marginBottom : 15,
        paddingHorizontal : 20,
        padding : 10,
    },
    genreItemText : {
        marginRight : 20,
        fontSize : 16,

    }
})
