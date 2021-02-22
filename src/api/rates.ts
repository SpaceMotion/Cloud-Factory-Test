import {fetchAPI, RequestMethodType} from './api';

interface GetRatesResponse {
  [key: string]: {
    baseVolume: string;
    high24hr: string;
    highestBid: string;
    id: number;
    isFrozen: string;
    last: string;
    low24hr: string;
    lowestAsk: string;
    percentChange: string;
    quoteVolume: string;
  };
}

export function getRates(): Promise<GetRatesResponse> {
  return fetchAPI('https://poloniex.com/public?command=returnTicker', {
    method: RequestMethodType.GET,
  });
}
