import React, { forwardRef } from 'react';
import {Button, FormControl, Select, TextField, Link, Dialog, DialogActions,DialogContent, DialogContentText, DialogTitle, MenuItem, InputLabel} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Send } from '@material-ui/icons';
import { getLogin } from '../utils/helpers';
import { Redirect } from 'react-router-dom';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const useStylesForm = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(3),
    },
}));

const useStylesFormButton = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(5),
        marginLeft: theme.spacing(1),
        minWidth: 120,
    },
}));

const useStylesFormSelect = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
        minWidth: 120,
    },
}));

export default function XBulkSmsList() {
    const [rows, setRows] = React.useState([]);

    const [isLoading, setLoading] = React.useState(false);
    const [selectedBeginingDate, setSelectedBeginingDate] = React.useState(new Date('2020-05-12T21:11:54'));
    const [selectedEndingDate, setSelectedEndingDate] = React.useState(new Date('2020-05-25T21:11:54'));
    const [selectedCustomer, setSelectedCustomer] = React.useState('');
    const [selectedPhone, setSelectedPhone] = React.useState('');
    const [selectedStatus, setSelectedStatus] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState('');
    const [errorCode, setErrorCode] = React.useState('');

    const classesSearch = useStyles();
    const classesForm = useStylesForm();
    const classesFormButton = useStylesFormButton();
    const classesFormSelect = useStylesFormSelect();
    const columns =
        [
            { title: 'Id', field: 'mesajId' },
            { title: 'Phone', field: 'telefon' },
            { title: 'Text', field: 'mesaj' },
            { title: 'Date', field: 'gonderimTarihi' },
            { title: 'Status', field: 'status' },
            {
                title: 'Code',
                field: 'errorCode',
                render: rowdata => <Link component="button"
                    variant="body2" onClick={(event) => {
                        event.preventDefault();
                        showError(event);
                    }}> {rowdata.errorCode} </Link>

            }
        ];

    const handleClose = () => {
        setOpen(false);
    };

    const showError = (event) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },

        };

        fetch('api/request/error_by_code/' + event.target.textContent, requestOptions)
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                setError(result.description);
                setErrorCode(result.code);
                setOpen(true);
            });
    }

    const handleSelectedStatus = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleBeginingDateChange = (date) => {
        setSelectedBeginingDate(date);
    };

    const handleEndingDateChange = (date) => {
        setSelectedEndingDate(date);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const cust = {
            beginingDate: selectedBeginingDate,
            endingDate: selectedEndingDate,
            customer: selectedCustomer,
            phone: selectedPhone,
            status: selectedStatus
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cust)
        };
        setLoading(true);
        fetch('api/request/bulk_list/list_all', requestOptions)
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                setRows(result);
                setLoading(false);
            });
    };

    const onRowStatusRequest = (event, rowdata) => {
        event.preventDefault();

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },

        };

        fetch('api/request/message_by_id/' + rowdata.mesajId, requestOptions)
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                let result = rows.map((rows, id) => {
                    if (rows.mesajId === rowdata.mesajId) {
                        return { ...rows, status: res.status };
                    }

                    else {
                        return { ...rows };
                    }
                });
                setRows(result);
            });
    };

    const renderShowError = () => {
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Error Code: " + errorCode}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {error}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            OK
          </Button>
                    </DialogActions>
                </Dialog>
            </div>);

    }

    const renderSmsTable = (rows) => {
        return (<div style={{ maxWidth: '100%' }}>
            <MaterialTable
                columns={columns}
                data={rows}
                title="Customer Sms List"
                icons={tableIcons}
                isLoading={isLoading}
                actions={[
                    {
                        icon: Send,
                        tooltip: 'Request Status',
                        onClick: (event, rowData) => { onRowStatusRequest(event, rowData) }
                    }
                ]}
            />
        </div>);
    }

    if (getLogin())
    {
        return (
            <div>
                {/*h1 id="tabelLabel" >Bulk Sms List</h1>*/}
                <p>This component demonstrates fetching data from the bulk sms</p>

                <form className={classesSearch.container} onSubmit={(e) => handleSubmit(e)}>
                    <FormControl className={classesForm.formControl}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            label="Customer"
                            value={selectedCustomer}
                            onChange={e => { setSelectedCustomer(e.target.value); }}
                        />

                        <TextField
                            variant="standard"
                            margin="normal"
                            label="Phone"
                            value={selectedPhone}
                            onChange={e => { setSelectedPhone(e.target.value); }}
                        />
                    </FormControl>
                    <FormControl className={classesForm.formControl}>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog-start"
                                label="Begining Date"
                                format="MM/dd/yyyy"
                                value={selectedBeginingDate}
                                onChange={handleBeginingDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />

                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog-end"
                                label="Ending Date"
                                format="MM/dd/yyyy"
                                value={selectedEndingDate}
                                onChange={handleEndingDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />

                        </MuiPickersUtilsProvider>

                    </FormControl>

                    <FormControl className={classesFormSelect.formControl}>
                        <InputLabel id="demo-simple-select-readonly-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-readonly-label"
                            id="demo-simple-select-readonly"
                            value={selectedStatus}
                            onChange={handleSelectedStatus}
                            inputProps={{ readOnly: false }}
                        >
                            <MenuItem value={"5"}>
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value={"1"}>Success</MenuItem>
                            <MenuItem value={"2"}>Error</MenuItem>
                            <MenuItem value={"3"}>Waiting</MenuItem>
                            <MenuItem value={"4"}>Report Not Request</MenuItem>
                            <MenuItem value={"5"}>Invalid</MenuItem>
                            <MenuItem value={"6"}>Unsufficient Limit</MenuItem>
                        </Select>
                        <FormControl className={classesFormButton.formControl}>
                            <Button
                                type="submit"
                                size="small"
                                variant="contained"
                                color="primary">
                                Refresh

               </Button>
                        </FormControl>
                    </FormControl>
                </form>

                {renderSmsTable(rows)}
                {renderShowError()}
            </div>
        );
    }
    else {
        return (<Redirect to='/' />)
    }
}
