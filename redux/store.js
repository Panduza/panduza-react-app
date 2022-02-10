import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import pzaMiddleware from './pzaMiddleware'

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, pzaMiddleware)
    )
)

export default store;
