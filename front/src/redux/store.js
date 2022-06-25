import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import app from './app/appSlice';
import user from './user/userSlice';
import list from './list/listSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga';


// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const rootReducer = combineReducers({
  app,
  user,
  list
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'list'] // will be persisted
}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middelware = [thunk, sagaMiddleware]

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middelware)) )


sagaMiddleware.run(rootSaga)
let persistor = persistStore(store)

export default { store, persistor }
