import React from 'react';
import { FormControl, Input, InputLabel, Button, FormHelperText } from '@material-ui/core';
import { FormGroup } from 'reactstrap';
import 'fetch-polyfill';
import { getLogin } from '../utils/helpers';
import { Redirect } from 'react-router-dom';

export default function XRequestSms() {
    const [result, setResult] = React.useState(false);
    const [messageId, setMessageId] = React.useState(false);
    const handleChange = (event) => {
        setMessageId(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },

        };

        fetch('api/request/message_by_id/' + messageId, requestOptions)
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                setResult(result.status)
            });
    }

    if (getLogin()) {
        return (
            <div>

                <p>This component demonstrates fetching data from the sms service</p>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Message Id</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text" onChange={handleChange} />
                            <Button type="submit" fullWidth variant="contained" color="primary" >Request</Button>
                            <FormHelperText id="my-helper-text">{result}  </FormHelperText>
                        </FormControl>
                    </FormGroup>
                </form>
            </div>
        );
    }
    else {
        return (<Redirect to='/' />)
    }
}
