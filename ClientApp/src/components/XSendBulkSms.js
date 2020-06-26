import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormLabel, FormControl, RadioGroup, Radio, Grid, Typography, Checkbox, FormControlLabel, TextField, FormHelperText, CircularProgress, Box } from '@material-ui/core';
import { getLogin } from '../utils/helpers';
import { CloudUpload } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import { Fragment } from 'react';
import { blue } from '@material-ui/core/colors';

const useStylesForm = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	input: {
		display: 'none',
	},
	helperTextError: { color: 'red', marginLeft: theme.spacing(1) },
	helperTextSuccess: { color: 'green', marginLeft: theme.spacing(1) }
}));

const useStylesRadioButton = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(3),
	},
	button: {
		margin: theme.spacing(1, 1, 0, 0),
	},
}));



export default function XSendBulkSms() {
	const [content, setContent] = React.useState('');
	const [visible, setVisible] = React.useState(true);
	const [value, setValue] = React.useState('single');
	const [data, setData] = React.useState('');
	const [result, setResult] = React.useState('Select file to import');
	const [isSuccess, setIsSuccess] = React.useState(false);
	const [progress, setProgress] = React.useState(0);
	let reader;
	const classesform = useStylesForm();
	const classesRaidoButton = useStylesRadioButton();
	const handleFileRead = () => {
		setData(reader.result);
	};

	const [seconds, setSeconds] = React.useState(0);
	const [isActive, setIsActive] = React.useState(false);

	useEffect(() => {
		let interval = null;
		if (isActive) {
			interval = setInterval(() => {
				setProgress(progress => progress + 1);
			}, 1000);
		} else if (!isActive && progress !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isActive, progress]);

	const handleFileChoosen = (file) => {
		reader = new FileReader();
		// Read file content on file loaded event
		reader.onloadend = handleFileRead;
		// Convert data to base64
		reader.readAsDataURL(file);
		file = "";
	};

	const handleRadioChange = (event) => {
		setResult('');
		setValue(event.target.value);

		if (event.target.value === 'single') {
			setVisible(true);

		} else {
			setVisible(false);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (value === 'single') {
			if (content === '') {

				setResult('Please fill sms content.');
				return;
			}
		}

		if (data === '') {
			setResult('Please select file to upload.');
			return;
		}


		const fileData = {
			content: content,
			data: data,
			contentType: value
		};

		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"Accept": "text/plain"
			},
			body: JSON.stringify(fileData),
			credentials: 'same-origin'
		};

		setResult('File is importing..');

		setIsActive(true);

		fetch('api/request/bulk_sms/send_bulk_sms', requestOptions)
			.then(function (response) {
				return response.json();
			})
			.then(response => {
				if (response.success === true) {
					setIsSuccess(true);
					setIsActive(false);
				}
				else {
					setIsSuccess(false);
					setIsActive(false);
				}
				setResult(response.description);
			});

		

	};

	const getContent = () => {

		if (visible === true)

			return (<Grid item xs={12} sm={6}>
				<TextField
					required
					id="content-message"
					name="content"
					label="Content"
					fullWidth
					autoComplete="given-name"
					onChange={event => { setContent(event.target.value) }}
				/>
			</Grid>);
		else {
			return (<Grid item xs={12} sm={6}></Grid>);
		}
	}

	if (getLogin()) {
		return (

			<Fragment>
				<Typography variant="h6" gutterBottom>
					Send Bulk Sms
				</Typography>

				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<FormControl component="fieldset" className={classesRaidoButton.formControl}>
							<FormLabel component="legend">Choose Content is...</FormLabel>
							<RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
								<FormControlLabel value="single" control={<Radio />} label="Single Content" />
								<FormControlLabel value="different" control={<Radio />} label="Different Content" />
							</RadioGroup>
						</FormControl>
					</Grid>

					{getContent()}
				</Grid>

				<Grid container spacing={1}>
					<Grid item xs={12}>
						<div className={classesform.root}>
							<input
								accept=".txt"
								className={classesform.input}
								id="contained-button-file"
								onChange={e => handleFileChoosen(e.target.files[0])}
								onClick={(e) => { e.target.value = null }}
								multiple
								type="file"
							/>

							<label htmlFor="contained-button-file">
								<Button variant="contained"
									color="primary"
									component="span" startIcon={<CloudUpload />}
								>
									Upload
							    </Button>
							</label>
							<Button variant="contained" color="primary" component="span" onClick={handleSubmit}>SEND</Button>
						</div>
					</Grid>
				</Grid>

				<Grid container spacing={3}>

					<Grid item xs>
						<FormHelperText
							className={isSuccess ? classesform.helperTextSuccess : classesform.helperTextError}
						> {result} </FormHelperText>

					</Grid>

					<Grid item xs>
						<FormHelperText> {progress} sn </FormHelperText>
					</Grid>
					<Grid item xs>
						
					</Grid>
					<Grid item  xs>
						
					</Grid>
					<Grid item xs>

					</Grid>
					<Grid item xs>

					</Grid>
				</Grid>
			</Fragment >
		);
	}
	else {
		return (<Redirect to='/' />);
	}
}