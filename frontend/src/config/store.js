import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import { reducer as form } from 'redux-form';
import rootSaga from "../sagas";
import { combineReducers } from "redux";
import { logger } from 'redux-logger'
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  let store = null;
  if (process.env.REACT_APP_ENV === "dev" || 1) {
    const composeEnhancers = composeWithDevTools({});
    store = createStore(
      combineReducers({
        ...rootReducer,form
      }),
      composeEnhancers(applyMiddleware(sagaMiddleware,logger))
      //composeEnhancers(applyMiddleware(sagaMiddleware))
    );
  } else {
    store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  }
  sagaMiddleware.run(rootSaga);
  return store;
}
