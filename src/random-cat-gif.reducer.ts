
export interface RandomCatGifState {
    currentGif?: string; // TODO gif provider option
    status: 'loading' | 'success' | 'error';
}

type SearchAnotherAction = { type: 'searchNext' };
type ErrorAction = { type: 'errorInRequest' };
type ShowGifAction = { type: 'showGif', payload: { gifUrl: string} };

type AllowedAction = SearchAnotherAction | ShowGifAction | ErrorAction;

export const randomCatGifReducer = (state: RandomCatGifState, action: AllowedAction): RandomCatGifState => {

    const {type} = action;

    switch (type) {
        case "searchNext": {
            return {
                ...state,
                status: 'loading'
            }
        }
        case "showGif": {
            return {
                ...state,
                status: 'success',
                currentGif: action.payload.gifUrl
            }
        }
        case "errorInRequest": {
            return {
                ...state,
                status: 'error',
            }
        }
        default:
            throw new Error(`[randomCatGifReducer] invalid action ${action['type']}`)
    }
}
