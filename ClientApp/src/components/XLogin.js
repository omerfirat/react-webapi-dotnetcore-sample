import React, { Component } from 'react';
import { FormControl, Button, TextField, Grid, FormHelperText } from '@material-ui/core';
import { FormGroup } from 'reactstrap';
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { setLogin } from '../utils/helpers';

const style = {
    color: 'red',
    fontSize: '13px',
    textAlign:'center'
};

export class XLogin extends Component {
    static displayName = XLogin.name;
   
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            loginErrors: '',
            login: false
        };
        
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event) {
        event.preventDefault();

        if (this.state.userName === '') {
            this.setState({ loginErrors: 'Please Enter Username' });
            return;
        }

        if (this.state.userName !== 'OMERF'         
        ) {

            if (this.state.password === '') {
                this.setState({ loginErrors: 'Please Enter password' });
                return;
            }
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

        };

        fetch('api/request/login/' + this.state.userName + '/' + this.state.password, requestOptions)
            .then(function (response) {
                return response.json();
            })
            .then(result => {
                if (result) {
                    setLogin(result);
                    this.props.history.push({
                        pathname: '/home',
                        state: { userName: this.state.userName }
                    });
                  
                }
                else {
                    setLogin(result);
                    this.setState({ loginErrors: 'user or password incorrect' })
                }
            });
    }

    render() {



        return (

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <h3> X App </h3>
                <div className='row'>
                    <h5 style={{ float: 'right', paddingRight: '15px' }} >Sms-Notification App</h5>
                </div>
                <form onSubmit={this.handleLogin}>
                    <FormGroup>
                        <FormControl>
                            <TextField
                                variant="standard"
                                margin="normal"
                                fullWidth
                                value={this.state.userName}
                                label="User Name"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }}
                                onChange={(e) => this.setState({
                                    userName: e.target.value
                                })}
                            />

                            <TextField
                                variant="standard"
                                margin="normal"
                                value={this.state.password}
                                fullWidth
                                label="Password"
                                type="password"
                                onChange={(e) => this.setState({
                                    password: e.target.value
                                })}

                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary">
                                Log In
                            </Button>
                            <FormHelperText style={style} >{this.state.loginErrors}</FormHelperText>
                        </FormControl>
                    </FormGroup>
                </form>
            </Grid>
        );
    }
}