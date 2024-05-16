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

// Testing case to not run giphy
const getNextMockedGif = (): Promise<string> => {
    const gifList = [
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDRndTJ6YjkwMjNvZDU1Mms2ZHJpdnA0ZHJzYWdqNXNrdjdpbGV2MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mlvseq9yvZhba/giphy.gif",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjhudDNpazJoaDZubGk0cjkxcHczbGpjYnJ5NzJpY2xwcDljb3prZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7VZrSiHHHUlKU/giphy.gif",
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjgzbmtlZmdkOWNvam9lbDJqeXE1dXYzbnlyd2lqMDA0eWE3Mjd5ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tVmthN5Mf8lGg/giphy.gif"
    ];
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(gifList[Math.floor(Math.random()*gifList.length)])
        }, 2000);
    })
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
        console.log('search next?');
        // getNextGif
        getNextMockedGif()
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
