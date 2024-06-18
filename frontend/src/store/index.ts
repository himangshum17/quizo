import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore,} from 'redux-persist'
import {configureStore} from '@reduxjs/toolkit'
import { rootReducer } from './root.reducer';
const persistConfig = {
    key: 'root',
    storage: localStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
reducer: persistedReducer,
middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:{
        ignoredActions: [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
    }
}),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;

