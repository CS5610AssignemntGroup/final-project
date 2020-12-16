import React from 'react';
import { Container } from 'react-bootstrap';
import { Header, Footer } from './components';
import {
    BrowserRouter as Router,
    Route,
    RouteComponentProps,
} from 'react-router-dom';
import { HomePage } from './pages';
import { BookPage } from './pages';
import { NotFoundPage } from './pages';
import { LoginPage } from './pages';
import './App.css';
import './bootstrap.min.css';

interface MatchParams {
    id: string;
    keyword: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

function App() {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/notfound/" component={NotFoundPage} />
                    <Route
                        path="/book/:id"
                        render={({ match }: MatchProps) => (
                            <BookPage id={match.params.id} />
                        )}
                    />
                    <Route
                        path="/search/:keyword"
                        render={({ match }: MatchProps) => (
                            <HomePage keyword={match.params.keyword} />
                        )}
                        exact
                    />

                    <Route path="/" component={HomePage} exact />
                </Container>
            </main>
            {/*<Footer />*/}
        </Router>
    );
}

export default App;
