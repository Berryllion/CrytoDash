import {
  LOG_USER,
  ADD_SUBSCRIPTION,
  UPDATE_CRYPTO,
} from '../constants/action-types';

const initialState = {
  username: '',
  email: '',
  subscriptions: [],
  cryptocurrencies: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_USER: {
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
      }
    }
    case ADD_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: state.subscriptions.concat(action.payload)
      }
    case UPDATE_CRYPTO:
      return {
        ...state,
        cryptocurrencies: action.payload.slice()
      }
    default:
      return state;
  }
};

export default rootReducer;