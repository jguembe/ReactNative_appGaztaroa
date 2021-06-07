import { AsyncStorage } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';
import { favoritos } from './favoritos';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
    excursiones,
    comentarios,
    cabeceras,
    actividades,
    favoritos,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // create a persisted reducer
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
