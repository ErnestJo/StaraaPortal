import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import SharedState from './reducers/sharedReducers'
import { persistStore, persistReducer } from 'redux-persist'
import changeState from './reducers/layoutReducers'
import storage from 'redux-persist/lib/storage'
const middleware = [thunk]

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['SharedState'],
}

const rootReducer = combineReducers({
  SharedState: SharedState,
  changeState: changeState,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)))
const persistor = persistStore(store)
export { persistor }
export default store
