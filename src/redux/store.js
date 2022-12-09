
import { configureStore } from "@reduxjs/toolkit";
import root from "./combine";
import storage from 'redux-persist/lib/storage'
import {persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST,PURGE, REGISTER} from 'redux-persist'


const persistConfig = {
    key : 'counter',
    storage
}

const PersistReducer = persistReducer(persistConfig, root)

const store = configureStore({
    reducer:PersistReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions:[FLUSH, REHYDRATE,PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    
   
})

export default store

