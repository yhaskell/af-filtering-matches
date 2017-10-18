import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose // tslint:disable-line

const middlewares = [
    thunk
]

export default () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))
}
