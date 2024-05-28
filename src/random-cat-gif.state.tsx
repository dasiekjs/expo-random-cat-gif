import {useEffect, useReducer} from "react";
import {randomCatGifReducer} from "./random-cat-gif.reducer";


const getNextGif = (): Promise<string> => {
    const giphyApiKey = process.env.EXPO_PUBLIC_GIPHY_API_KEY;
    return fetch(`https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}&tag=funny+cats&rating=g`)
        .then((d) => d.json())
        .then((response) => {
            console.log(response);
            return response.data;
        })
        .then((data) => {
            return data.images['original']['url'];
        });
}

export const useRandomCatGifState = () => {
    const [{status, currentGif}, dispatch] = useReducer(randomCatGifReducer, {
        status: 'loading'
    });

    useEffect(() => {
        if (status === 'loading') {
            searchAnotherGif();
        }
    }, [status]);

    const searchAnotherGif = () => {
        getNextGif()
            .then((gifUrl) => {
                dispatch({type: 'showGif', payload: { gifUrl }});
            })
            .catch((e) => {
                console.error('Error on gif: ', e);
                dispatch({type: 'errorInRequest'} );
            })
        ;
    }

    return {
        status,
        currentGif,
        actions: {
            searchAnother: () => {
                dispatch({ type: 'searchNext' })
            },
        }
    }
}
