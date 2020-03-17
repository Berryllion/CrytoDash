import {
  ADD_SUBSCRIPTION,
  UPDATE_CRYPTO,
  LOG_USER
} from '../constants/action-types';

export function logUser(payload) {
  return { type: LOG_USER, payload }
};

export function addSubscription(payload) {
  return { type: ADD_SUBSCRIPTION, payload }
};

export function updateCrypto(payload) {
  return { type: UPDATE_CRYPTO, payload }
};