import React from 'react'
import { StyleSheet, Image, View, Dimensions, TouchableWithoutFeedback } from 'react-native'
import {Title} from "react-native-paper"
import Carousel from "react-native-snap-carousel"
import {IMAGE_BASE_URL} from "../utils/Constants"


const {width} = Dimensions.get("window")
const ITEM_WIDTH = Math.round(width * 0.3) // saves some width does not take whole screen


export default function CarouselMulti(props) {

    const {dataReceived, navigation} = props

    return (
        <Carousel 
            layout={"default"}
            data={dataReceived}
            renderItem={(item) => <RenderItemMovie  data={item} navigation={navigation} />}
            sliderWidth={width}
            itemWidth={ITEM_WIDTH}
            firstItem={1}
            inactiveSlideScale={1} // every item has the same scale
            inactiveSlideOpacity={1} // non of the movie has opacity
        />
    )
}


function RenderItemMovie(props){

    const {data, navigation} = props
    const {id, title, poster_path} = data.item

    const imageUrl = `${IMAGE_BASE_URL}/w500${poster_path}`

    
    const onNavigation = () =>{
        navigation.navigate("movie", { id })
    }

    return(
        <TouchableWithoutFeedback onPress={onNavigation}>
        <View style={styles.card}>
            <Image style={styles.Image} source={{uri: imageUrl}} />
            <Title style={styles.title} numberOfLines={1} > {title}</Title>
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
        width : "85%",
        height : 170,
        borderRadius : 20
    },
    title:{
        marginTop : 10,
        marginHorizontal : 10,
        marginTop : 10
    },
})
