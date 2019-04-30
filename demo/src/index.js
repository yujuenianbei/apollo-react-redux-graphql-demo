import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Ap from './App';
// import Mu from './mutationSimple';
// import Mu from './mutationUpdate';
// import Mu from './mutationId';
import Mu from './mutationLoading';
// import Mu from './localStateDirect'
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
// const networkInterface = createNetworkInterface({
//     uri: 'https://48p1r2roz4.sse.codesandbox.io'
// });

// 默认情况客户端会发送到相同主机名(域名)下的/graphql端点
const client = new ApolloClient({
    // uri: 'https://48p1r2roz4.sse.codesandbox.io'
    uri: 'http://localhost:4000'
});

const App = () => (
    <ApolloProvider client={client}>
        {/* <Ap /> */}
        <Mu />
    </ApolloProvider>
);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
