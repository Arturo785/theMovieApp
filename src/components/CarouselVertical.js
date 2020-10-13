import { map } from 'lodash'
import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
import {Text, Title} from "react-native-paper"
import Carousel from "react-native-snap-carousel"
import {IMAGE_BASE_URL} from "../utils/Constants"


const {width} = Dimensions.get("window")
const ITEM_WIDTH = Math.round(width * 0.7) // saves some width does not take whole screen

export default function CarouselVertical(props) {

    const {dataReceived, allGenres, navigation} = props


    return (
        <Carousel
            layout={"default"}
            data={dataReceived}
            renderItem={(item) => <RenderItemMovie data={item} genres={allGenres} navigation={navigation} />}
            sliderWidth={width}
            itemWidth={ITEM_WIDTH}
        />
    )
}

function RenderItemMovie(props) {
    const {data, genres, navigation} = props
    const {id, title, poster_path, genre_ids} = data.item

    const [genresFromMovie, setGenresFromMovie] = useState(null)

    const imageUrl = `${IMAGE_BASE_URL}/w500${poster_path}`
    // console.log(data.item["title"]) // without unpacking

    useEffect(() => {
        setGenresFromId().then((dataFromMovie) => setGenresFromMovie(dataFromMovie))
    }, [])

    // gets only the genres of the movie from all the available genres
    const setGenresFromId = async () =>{
        const genresArray = genres // not really usefull but I was lazy to refactor it
        const genresRetrieved = []

        genre_ids.forEach((idMovie) => {
            const found = genresArray.find(element => element["id"] === idMovie)
            genresRetrieved.push(found["name"])
        })
        //console.log(genresRetrieved)
        return genresRetrieved
    }

    const onNavigation = () =>{
        navigation.navigate("movie", { id })
    }

 
    return (
        <TouchableWithoutFeedback onPress={onNavigation}>
            <View style={styles.card}>
                <Image style={styles.Image} source={{uri: imageUrl}} />
                <Title style={styles.title}>{title}</Title>
                <View style={styles.genresView}>
                    {genresFromMovie &&
                        map(genresFromMovie, (myGenre, index) => (
                        <Text key={index} style={styles.genreText}>
                             {myGenre} { }
                        </Text>
                        ))}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card:{
        shadowColor : "#000",
        shadowOffset : {
            width : 0, height : 10
        },
        shadowOpacity : 1,
        shadowRadius : 10,
    },
    Image :{
        width : "100%",
        height : 450,
        borderRadius : 20
    },
    title:{
        marginHorizontal : 10,
        marginTop : 10
    },
    genresView:{
        flexDirection : "row",
        marginHorizontal: 10,
    },
    genreText :{
        fontSize : 12,
        color : "#8997a5"
    }
})
