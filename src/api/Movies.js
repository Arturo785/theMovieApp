import {BASE_URL,LANG} from "../utils/Constants"
import {API_KEY} from "../utils/APIKEY"
import axios from 'axios';

export function getNewsMoviesAPI (page = 1){
    const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`
    
    try{
        return axios ({
            url : url,
            method : 'GET'
        })
        .then(result => result.data)
        .catch(error => console.log("Salio mal"))
    }
    catch(error){
        console.error(error);
        console.error("SALIO MAL");
    }
}

export function getGenreMovieAPI(){
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&languaje${LANG}`

    try{
        return axios ({
            url : url,
            method : 'GET'
        })
        .then((result) => { // the fun to be excecuted on the promise
            //console.log(result.data)
            return result.data
        })
        .catch(error => console.log("Salio mal"))
    }
    catch(error){
        console.error(error);
        console.error("SALIO MAL");
    }
}

export function getMoviesByGenre(choosenGenre) {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${choosenGenre}&languaje${LANG}`

    try {
        return axios({
            url : url,
            method : "GET"
        })
        .then((result) =>{
            return result.data
        })
    }
    catch(error){
        console.error(error);
        console.error("SALIO MAL");
    }
}

export function getMovieByIdAPI(movieId){
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&languaje${LANG}`
    
    try {
        return axios({
            url : url,
            method : "GET"
        })
        .then((result) =>{
            return result.data
        })
    }
    catch(error){
        console.error(error);
        console.error("SALIO MAL");
    }
}


export function getVideosByIdAPI(movieId){
    const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&languaje${LANG}`
    
    try {
        return axios({
            url : url,
            method : "GET"
        })
        .then((result) =>{
            return result.data
        })
    }
    catch(error){
        console.error(error);
        console.error("SALIO MAL");
    }
}

export function getPopularMoviesAPI(page = 1){
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&languaje${LANG}&page=${page}`
    
    try {
        return axios({
            url : url,
            method : "GET"
        })
        .then((result) =>{
            return result.data
        })
    }
    catch(error){
        console.error(error);
        console.error("SALIO MAL");
    }
}

export function searchMoviesAPI(query){
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&languaje${LANG}&query=${query}`
    
    try {
        return axios({
            url : url,
            method : "GET"
        })
        .then((result) =>{
            return result.data
        })
    }
    catch(error){
        console.error(error);
        console.error("SALIO MAL");
    }
}