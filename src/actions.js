export const FETCH_PRICES_BEGIN   = 'FETCH_PRICES_BEGIN';
export const FETCH_PRICES_SUCCESS = 'FETCH_PRICES_SUCCESS';
export const FETCH_PRICES_FAILURE = 'FETCH_PRICES_FAILURE';

export const fetchPricesBegin = () => ({
    type: FETCH_PRICES_BEGIN
});

export const fetchPricesSuccess = payload => ({
    type: FETCH_PRICES_SUCCESS,
    payload
});

export const fetchPricesFailure = error => ({
    type: FETCH_PRICES_FAILURE,
    payload: { error }
});
