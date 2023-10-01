import { Article } from "../types"

export type ArticleState = {
    articles: Article[],
    isLoading: boolean,
    isError: boolean,
    errorMessage: string
}
export type ArticleActions = 
| { type: "FETCH_ARTICLES_REQUEST" }
| { type: "FETCH_ARTICLES_SUCCESS", payload: Article[] }
| { type: "FETCH_ARTICLES_ERROR", payload: string }

export const articleReducer = (state: ArticleState, action:ArticleActions) => {
    switch(action.type){
        case "FETCH_ARTICLES_REQUEST" :
            return {...state, isLoading: true}
        case "FETCH_ARTICLES_SUCCESS":
            return {...state, articles: action.payload, isLoading: false}
        case "FETCH_ARTICLES_ERROR":
            return {...state, isError: true, errorMessage: action.payload}
        default:
            return state
    }
}