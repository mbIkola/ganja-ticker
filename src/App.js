import React, {useEffect} from 'react';
import {ReactComponent as Logo} from './logo.svg';
import logo from './logo.svg';
import './App.css';
import {fetchPrices} from "./thunks";
import {connect, Provider} from "react-redux";
import {store} from "./store";

import {ReactComponent as ArrowUp} from './arrow-up.svg';
import {ReactComponent as ArrowDown}  from './arrow-down.svg';


export const  App = () => (
        <Provider store={store}>

            <header>
                <div className="hero">
                <h1>
                    <Logo style={{height: '40px', float: 'left'}} />
                    Ticker Layouts
                </h1>
                </div>
            </header>

            <main style={{
                margin: '0 auto',
                padding: '30px',
                maxWidth: '1200px'
            }}>
                <h2> Layout variant  1 </h2>
            <Layout variant={1}>
                <WiredView/>
            </Layout>
            <hr/>
                <h2> Layout variant  2 </h2>
            <Layout variant={2}>
                <WiredView/>
            </Layout>
            <hr/>
                <h2> Layout variant  3 </h2>
            <Layout variant={3}>
                <WiredView/>
            </Layout>
            <hr/>
                <h2> Layout variant  4 </h2>
            <Layout variant={4}>
                <WiredView/>
            </Layout>

            <hr/>
                <h2> Layout variant  5 </h2>
            <Layout variant={5}>
                <WiredView/>
            </Layout>

            </main>

            <footer>
                If none of the available ticker layouts fulfills your needs,
                please contact us at <a href="mailto:info@swissx.com">info@swissx.com</a> for a custom layout.
            </footer>

        </Provider>
);

export const Layout = ({children, variant}) => {
    let element = children;

    if ( variant === 4) {
        element =  <marquee
            behavior="scroll"
            direction="left"
            scrollamount="80"
            scrolldelay="300"
            onMouseOver={ (e) => e.currentTarget.stop()} onMouseOut={(e) => e.currentTarget.start()}
        >{children}</marquee>
    }
    return (<div className={`box layout-${variant}`}>
        <div className="wrap">
            <img src={logo} alt="swissx logo" className="logo"/>
            {element}
        </div>
    </div>);
};

export const PercentChange = ({price_usd, percent_change_1h, percent_change_7d, percent_change_24h}) => {
    const percent_change = Number(percent_change_24h).toFixed(2);
    const price_change = Number(price_usd  / 100 * percent_change_24h ).toFixed(2);
    const className = percent_change_24h > 0 ? 'grow' : 'down';
    const Arrow = percent_change_24h > 0 ? ArrowUp : ArrowDown;

    return (
        <span className={className}>
            <Arrow  alt={className} className="arrow"/> {percent_change}%
            <span className="price-change">{price_change}$</span>
        </span>
    );
};

export const Name = ({name, id, symbol}) => (
    <span className="name">
        {symbol}
    </span>
);

export const Price = ({price_usd, price_swx, price_chf}) => {
    const price = Number(price_usd).toFixed(2);
    return (<span className="price"> {price} </span>)
};

export const GanjaItem = ({name, id, symbol, price_usd, price_swx, price_chf, percent_change_1h, percent_change_7d, percent_change_24h}) => {
    const classname = percent_change_24h > 0 ? 'positive' : 'negative';
    return (<div className={`item ${classname}`}>
        <Name {...{name, id, symbol}} />
        <Price {...{price_usd, price_chf, price_swx}} />
        <PercentChange {...{price_usd, percent_change_1h, percent_change_7d, percent_change_24h}} />
    </div>)
};

export const View = ({prices, fetchPrices}) => {
    useEffect(() => {
            fetchPrices();
        },
        [fetchPrices]);


    return (
        <span>
            {prices.map((price, i) => (<GanjaItem key={i} {...price} />))}
        </span>
    );
};

const mapStateToProps = (state) => ({
    prices: state.prices.data || []
});
const mapDispatchToProps = {
    fetchPrices
};
export const WiredView = connect(mapStateToProps, mapDispatchToProps)(View);

export default App;
