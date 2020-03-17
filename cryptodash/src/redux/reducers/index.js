import {
  ADD_SUBSCRIPTION,
  UPDATE_CRYPTO
} from '../constants/action-types';

const initialState = {
  subscriptions: [],
  cryptocurrencies: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: state.subscriptions.concat(action.payload)
      }
    case UPDATE_CRYPTO:
      return {
        ...state,
        cryptocurrencies : state.cryptocurrencies
      }
    default:
      return state;
  }
};

export default rootReducer;