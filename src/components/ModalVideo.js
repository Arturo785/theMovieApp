import React, {useState, useEffect} from 'react'
import { StyleSheet, Platform} from 'react-native'
import {Modal, IconButton, Title} from "react-native-paper"
import Youtube from "react-native-youtube"
import {WebView} from "react-native-webview"
import {getVideosByIdAPI,} from "../api/Movies"

export default function ModalVideo(props) {

    const {show, setShow, idMovie} = props


    const [videos, setVideos] = useState(null)


    useEffect(() => {
        getVideosByIdAPI(idMovie).then((response) =>{
            const trailerYoutube = response.results.find(trailer => trailer.site === "YouTube")
            setVideos(trailerYoutube.key)
        })
    }, [])

    const urlVideo = `https://www.youtube.com/embed/${videos}?controls=0&showinfo=0`


    return (
        <Modal visible={show} contentContainerStyle={styles.modal}>
            {Platform.OS === "ios" ? (
                <Youtube videoId={videos} style={styles.video}/>
            ) : (
                <WebView style={{width: 500,}} source={{ uri: urlVideo}}/>
            )}

            <IconButton 
                icon = "close"
                onPress={() => setShow(false)}
                style={styles.close}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal :{
        backgroundColor : "#000",
        height : "120%",
        alignItems : "center",
    },
    close :{
        backgroundColor : "#1ea1f2",
        width : 50,
        height : 50,
        borderRadius : 100,
        position : "absolute",
        bottom : 100,
    },
    video :{
        alignSelf : "stretch",
        height : 300,
    }
})
