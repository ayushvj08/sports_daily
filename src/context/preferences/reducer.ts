import { Sport, Team } from "../types"

export type Preferences = {
    sports: Sport[],
    teams: Team[]
}

export type PreferencesState = {
    preferences: Preferences,
    isLoading: boolean,
    isError: boolean,
    errorMessage: string
}

export type Actions =
    | { type: "FETCH_PREFERENCES_REQUEST" }
    | { type: "FETCH_PREFERENCES_SUCCESS", payload: Preferences }
    | { type: "FETCH_PREFERENCES_ERROR", payload: string }
    | { type: "UPDATE_SPORT_PREFERENCES", payload: { sport: Sport } }
    | { type: "UPDATE_TEAM_PREFERENCES", payload: { team: Team } }
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
            return state.preferences.sports.some(e => e.id === action.payload.sport.id) ? {
                ...state,
                preferences: {
                    sports: state.preferences.sports.filter(e => e.id != action.payload.sport.id),
                    teams: [...state.preferences.teams]
                }
            } :
                {
                    ...state,
                    preferences: {
                        sports: [...state.preferences.sports, action.payload.sport],
                        teams: [...state.preferences.teams],
                    }
                }
        case "UPDATE_TEAM_PREFERENCES":
            return state.preferences.teams.some(e => e.id === action.payload.team.id) ? {
                ...state,
                preferences: {
                    sports: [...state.preferences.sports],
                    teams: state.preferences.teams.filter(e => e.id != action.payload.team.id),
                }
            } : {
                ...state,
                preferences: {
                    sports: [...state.preferences.sports],
                    teams: [...state.preferences.teams, action.payload.team],
                }
            }
        case "UPDATE_PREFERENCES_SUCCESS":
            return { ...state, preferences: action.payload }
        default:
            return state;
    }
} 