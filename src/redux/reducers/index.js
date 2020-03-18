import {
  LOG_USER,
  ADD_SUBSCRIPTION,
  REMOVE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION,
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
    case ADD_SUBSCRIPTION: {
      return {
        ...state,
        subscriptions: state.subscriptions.concat(action.payload)
      }
    }
    case REMOVE_SUBSCRIPTION: {
      return {
        ...state,
        subscriptions: state.subscriptions.filter(
          e => e.crypto !== action.payload.crypto
        )
      }
    }
    case UPDATE_SUBSCRIPTION: {
      return {
        ...state,
        subscriptions: state.subscriptions.map((e) => {
          if (e.crypto !== action.payload.crypto) {
              return (e);
          }
          return (action.payload);
        })
      }
    }
    case UPDATE_CRYPTO: {
      return {
        ...state,
        cryptocurrencies: action.payload.slice()
      }
    }
    default:
      return state;
  }
};

export default rootReducer;