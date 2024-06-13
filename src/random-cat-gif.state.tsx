import {useEffect, useReducer} from "react";
import {randomCatGifReducer} from "./random-cat-gif.reducer";


const getNextGif = (): Promise<string> => {
    const giphyUrl = process.env.EXPO_PUBLIC_GIH_SERVICE_URL as string;
    return fetch(giphyUrl)
        .then((d) => d.json())
        .then((response) => {
            return response.image;
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
