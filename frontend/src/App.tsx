import React from 'react';
import { Container } from 'react-bootstrap';
import { Header, Footer } from './components';
import {
    BrowserRouter as Router,
    Route,
    RouteComponentProps,
} from 'react-router-dom';
import {
    HomePage,
    UserEditPage,
    UserListPage,
    BookPage,
    NotFoundPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    AdminBookListPage,
    AdminBookEditPage,
} from './pages';

import './App.css';
import './bootstrap.min.css';

interface MatchParams {
    id: string;
    keyword: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

function App() {
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/admin/userlist" component={UserListPage} />
                    <Route
                        path="/admin/user/:id/edit"
                        render={({ match }: MatchProps) => (
                            <UserEditPage id={match.params.id} />
                        )}
                    />
                    <Route
                        path="/admin/booklist"
                        component={AdminBookListPage}
                        exact
                    />

                    <Route
                        path="/admin/book/:id/edit"
                        render={({ match }: MatchProps) => (
                            <AdminBookEditPage id={match.params.id} />
                        )}
                    />

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
