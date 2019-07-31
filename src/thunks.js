import {fetchPricesBegin, fetchPricesFailure, fetchPricesSuccess} from "./actions";

export const fetchPrices = () => (dispatch, getState) => {
    const state = getState();
    if ( state.prices.loading ) return;
    dispatch(fetchPricesBegin());
    fetch('https://wallet.swissx.com/api/ticker')
        .then(res => res.json())
        .then(prices => {
            dispatch(fetchPricesSuccess(prices));
            return prices;
        }).catch(err => dispatch(fetchPricesFailure(err)));
};
