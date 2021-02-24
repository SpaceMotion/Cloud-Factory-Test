import {getRates} from '../api/rates';
import {action, observable} from 'mobx';

type Rates = {
  name: string;
  last: string;
  highestBid: string;
  percentChange: string;
}[];

const rates: {
  error: boolean;
  data: Rates;
} = observable({
  error: false,
  data: [],
});

export const RatesManager: {
  readonly FETCH_DELAY: number;
  timerId: any | undefined;
  startFetching(): void;
  stopFetching(): void;
  getData(): Rates;
  isError(): boolean;
} = {
  FETCH_DELAY: 5 * 1000,
  timerId: undefined,
  startFetching() {
    const _getRates = () => {
      getRates()
        .then(
          action((data) => {
            if (this.timerId !== undefined) {
              rates.data = [
                ...Object.keys(data).map((rateId) => ({
                  name: rateId,
                  last: data[rateId].last,
                  highestBid: data[rateId].highestBid,
                  percentChange: data[rateId].percentChange,
                })),
              ];
              rates.error = false;
            }
          }),
        )
        .catch(
          action((error) => {
            if (this.timerId !== undefined) {
              console.log(error);
              rates.error = true;
            }
          }),
        )
        .then(() => {
          if (this.timerId !== undefined) {
            fetch();
          }
        });
    };
    const fetch = () => {
      this.timerId = setTimeout(_getRates, this.FETCH_DELAY);
    };

    this.timerId = -1;
    _getRates();
  },
  stopFetching() {
    this.timerId = undefined;
  },
  getData() {
    return rates.data;
  },
  isError() {
    return rates.error;
  },
};
