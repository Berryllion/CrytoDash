import {
  ADD_SUBSCRIPTION,
  UPDATE_CRYPTO
} from '../constants/action-types';

export function addSubscription(payload) {
  return { type: ADD_SUBSCRIPTION, payload }
};

export function updateCrypto(payload) {
  return { type: UPDATE_CRYPTO, payload }
};