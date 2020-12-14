/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            duplicatePassword: '',
            firstName: '',
        };
    }

    onChange(key, event) {
        this.setState({
            [key]: event.target.value,
        });
    }

    render() {
        return(
        <>
            <h1>add new user</h1>
            <div>
                <label for="firstname"></label>
                <input id="firstname" value={this.state.firstname} onChange={(e) => this.onChange('firstname', e)} />

                <label for="username"></label>
                <input id="username" value={this.state.username} onChange={(e) => this.onChange('username', e)} />

                <label for="password"></label>
                <input id="password" type="password" value={this.state.username} onChange={(e) => this.onChange('password', e)} />

                <label for="duppassword"></label>
                <input id="duppassword" type="password" value={this.state.duplicatePassword} onChange={(e) => this.onChange('duppassword', e)} />

                <div>
                        <Link to="/"> Click to add user</Link>
                    </div>

            </div>
        </>
        )
    }



    randomFunction(bananana) {
        console.log("banana")
    }




}
