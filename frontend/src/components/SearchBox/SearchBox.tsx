import React, { FunctionComponent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as H from 'history';

interface OwnProps {
    history: H.History;
}

type Props = OwnProps;

const SearchBox: FunctionComponent<Props> = ({ history }) => {
    const [keyword, setKeyword] = useState('');

    const submitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push('/');
        }
    };

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type="text"
                name="q"
                onChange={e => setKeyword(e.target.value)}
                placeholder="Search Books..."
                className="mr-sm-2 ml-sm-5"></Form.Control>
            <Button type="submit" className="btn btn-info p-2">
                Search
            </Button>
        </Form>
    );
};

export { SearchBox };
