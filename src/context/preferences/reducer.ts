export type PreferencesState = {
    preferences: { sports: number[], teams: number[] },
    isLoading: boolean,
    isError: boolean,
    errorMessage: string
}

type Preferences = {
    sports: number[],
    teams: number[]
}
type Id = {
    id: number
}
export type Actions =
    | { type: "FETCH_PREFERENCES_REQUEST" }
    | { type: "FETCH_PREFERENCES_SUCCESS", payload: Preferences }
    | { type: "FETCH_PREFERENCES_ERROR", payload: string }
    | { type: "UPDATE_SPORT_PREFERENCES", payload: Id }
    | { type: "UPDATE_TEAM_PREFERENCES", payload: Id }
    | { type: "UPDATE_PREFERENCES_SUCCESS", payload: Preferences }

export const preferencesReducer = (state: PreferencesState, action: Actions) => {
    switch (action.type) {
        case "FETCH_PREFERENCES_REQUEST":
            return { ...state, isLoading: true }
        case "FETCH_PREFERENCES_SUCCESS":
            return { ...state, preferences: action.payload, isLoading: false }
        case "FETCH_PREFERENCES_ERROR":
            return { ...state, isError: true, errorMessage: action.payload }
        case "UPDATE_SPORT_PREFERENCES":
            return state.preferences.sports.includes(action.payload.id) ? {
                ...state,
                preferences: {
                    sports: state.preferences.sports.filter(e => e != action.payload.id),
                    teams: [...state.preferences.teams]
                }
            } :
                {
                    ...state,
                    preferences: {
                        sports: [...state.preferences.sports, action.payload.id],
                        teams: [...state.preferences.teams],
                    }
                }
        case "UPDATE_TEAM_PREFERENCES":
            return state.preferences.teams.includes(action.payload.id) ? {
                ...state,
                preferences: {
                    sports: [...state.preferences.sports],
                    teams: state.preferences.teams.filter(e => e != action.payload.id),
                }
            } : {
                ...state,
                preferences: {
                    sports: [...state.preferences.sports],
                    teams: [...state.preferences.teams, action.payload.id],
                }
            }
        case "UPDATE_PREFERENCES_SUCCESS":
            return { ...state, preferences: action.payload }
        default:
            return state;
    }
} 