import React from 'react';
import ApolloClient from 'apollo-boost';
import { Container } from 'react-bootstrap';
import { Header, Footer } from './components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomePage } from './pages';

import './App.css';
import './bootstrap.min.css';

const client = new ApolloClient({
    uri: '[Insert URI of GraphQL endpoint]',
});

function App() {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/" component={HomePage} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
