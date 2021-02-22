import {fetchAPI, RequestMethodType} from './api';

export function getRates() {
  return fetchAPI('https://poloniex.com/public?command=returnTicker', {
    method: RequestMethodType.GET,
  });
}
