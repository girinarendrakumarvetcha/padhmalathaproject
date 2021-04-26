import { createStore, combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import reducers from '../reducers';

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers,form
    }),
    {},
  );
}