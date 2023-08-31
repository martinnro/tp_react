import React, {useEffect, useState} from "react";
import api from '../../services/api';
import {
    Grid,
    Paper,
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia
}   from '@mui/material';
import { appActions } from "../../redux/appRedux";
import { useDispatch } from "react-redux";
import { IMG_URL } from "../../constants"

const POKE_IMG = require("../../assets/images/poke.png")

const FetchList = () => {
    const dispatch = useDispatch()
    const [pokemons, setPokemons] = useState(null)
    const [next, setNext] = useState("")

    const [selectedPokemonAbilities, setSelectedPokemonAbilities] = useState([]);
    const [showAbilities, setShowAbilities] = useState(false); // Estado para Habilidades
    const [selectedPokemonMoves, setSelectedPokemonMoves] = useState([]); // Estado para Movimientos

    useEffect(()=>{
        getPokemons()
    },[])

    // Función para obtener las habilidades de un Pokémon
    const getPokemonAbilities = async (pokemonUrl) => {
        try {
            dispatch(appActions.loading(true));
            const result = await api.GET(pokemonUrl);
            if (result) {
                console.log("abilities: ", result.abilities);
                setSelectedPokemonAbilities(result.abilities);
                setSelectedPokemonMoves(result.moves);
                setShowAbilities(true); // Mostrar las habilidades
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(appActions.loading(false));
        }
    };

    const getPokemons = async () => {
        try {
            dispatch(appActions.loading(true))
            const result = await api.GET(api.pokemons)
            if(result){
                console.log('poke: ', result)
                setPokemons(result.results)
                setNext(result.next)
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(appActions.loading(false))
        }
    }

    const getPokemonImgId = (id) => {
        const paddedId = String(id).padStart(3, "0");
        return paddedId;
    }

    const loadMore = async () => {
        try {
            dispatch(appActions.loading(true))
            const result = await api.GET(next)
            if(result){
                console.log('poke: ', result.results)
                setPokemons(prev=>[...prev, ...result.results])
                setNext(result.next)
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(appActions.loading(false))
        }
    }
        

    const renderItem = (item) => {
        const path = item.url.split('/')
            const imgID = getPokemonImgId(path[6])
            return(
                <Card p={2} sx={{ display: 'flex', height:100, cursor:'pointer', '&:hover': {backgroundColor: '#5acdbd', color:'white'}}}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            N° {imgID}
                        </Typography>
                        <Typography component="div" variant="h5">
                            {item.name}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{ width: 100 }}
                        src={`${IMG_URL}${imgID}.png`}
                        alt="Live from space album cover"
                    />
                </Card>
            )
    }






    return (
        <Grid container spacing={3}>
            <Paper sx={{ p: 2 }}>
                <Grid item xs={12}>
                    <Typography component="div" variant="h5">
                        Mi Pokedex
                    </Typography>
                </Grid>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap", // Permite que las tarjetas se ajusten automáticamente en una nueva línea
                        justifyContent: "space-between", // Espacio entre las tarjetas
                    }}
                >
                {pokemons &&
                    pokemons.map((p, index) => {
                        return (
                            <Card
                                key={index}
                                p={2}
                                sx={{
                                    flex: "1 0 30%", // Controla el ancho de las tarjetas
                                    marginBottom: "1rem", // Espacio entre las tarjetas
                                    cursor: "pointer",
                                    "&:hover": { backgroundColor: "#5acdbd", color: "white" },
                                }}
                                onClick={() => getPokemonAbilities(p.url)}
                            >
                                <CardContent sx={{ flex: "1 0 auto" }}>
                                    <Typography component="div" variant="h5">
                                        N° {getPokemonImgId(index + 1)}
                                    </Typography>
                                    <Typography component="div" variant="h5">
                                        {p.name}
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 100 }}
                                    src={`${IMG_URL}${getPokemonImgId(index + 1)}.png`}
                                    alt="Pokemon"
                                />
                            </Card>
                        );
                    })}
                </div>
                {showAbilities && (
                    <div>
                        <Typography variant="h6">Habilidades:</Typography>
                        <ul>
                            {selectedPokemonAbilities.map((ability, index) => (
                                <li key={index}>{ability.ability.name}</li>
                            ))}
                        </ul>
                        <Typography variant="h6">Movimientos:</Typography>
                        <ul>
                            {selectedPokemonMoves.map((move, index) => (
                                <li key={index}>{move.move.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <Grid item xs={4}>
                    <Card
                        p={2}
                        sx={{
                            display: "flex",
                            height: 100,
                            cursor: "pointer",
                            backgroundColor: "#317b52",
                            "&:hover": { backgroundColor: "#5acdbd" },
                        }}
                        onClick={() => loadMore()}
                    >
                        <CardContent sx={{ flex: "1 0 auto" }}>
                            <Typography component="div" variant="h5" sx={{ color: "white" }}>
                                Cargar Más
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            sx={{ width: 1000, p: 2 }}
                            image={require("../../assets/images/poke.png")}
                            alt="Load More"
                        />
                    </Card>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default FetchList;