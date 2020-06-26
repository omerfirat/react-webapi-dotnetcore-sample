import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button'
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import XRequestSms from '../components/XRequestSms';
import XFastSmsList from '../components/XFastSmsList';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { useHistory, Redirect } from 'react-router-dom';
import { setLogin, getLogin, clearLogin } from '../utils/helpers';
import XVpnSmsList from './XVpnSmsList';
import XBulkSmsList from './XBulkSmsList';
import XSendBulkSms from './XSendBulkSms';
import { FormHelperText, Grid } from '@material-ui/core';



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: 'auto',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    loginProps: { color: 'red', fontSize: 10},

}));


export default function XMenuAppBar(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [fastCollapseOpen, setFastCollapseOpen] = React.useState(false);
    const [bulkCollapseOpen, setBulkCollapseOpen] = React.useState(false);
    const [components, SetComponent] = React.useState(false);
    const history = useHistory();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClickFast = () => {
        setFastCollapseOpen(!fastCollapseOpen);
    };

    const handleClickBulk = () => {
        setBulkCollapseOpen(!bulkCollapseOpen);
    };



    const leftMenuOnClik = (event) => {
        if (event.target.innerText === "Request") {
            SetComponent(<XRequestSms />);
        }
        else if (event.target.innerText === "Fast Sms List") {
            SetComponent(<XFastSmsList />);
        }
        else if (event.target.innerText === "Bulk Sms List") {
            SetComponent(<XBulkSmsList />);
        }
        else if (event.target.innerText === "Vpn Sms List") {
            SetComponent(<XVpnSmsList />);
        }
        else if (event.target.innerText === "Send Bulk Sms") {
            SetComponent(<XSendBulkSms />);
        }
    };



    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button onClick={handleClickFast}>
                    <ListItemText primary="Fast Sms" />
                    {fastCollapseOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={fastCollapseOpen} timeout="auto" unmountOnExit>
                    {['Request', 'Fast Sms List', 'Vpn Sms List', 'Send Sms'].map((text, index) => (
                        <ListItem button key={text} onClick={leftMenuOnClik}>
                            { /* <ListItemIcon>*/}
                            { /*index % 2 === 0 ? <InboxIcon /> : <MailIcon />*/}
                            { /* </ListItemIcon>*/}
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </Collapse>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={handleClickBulk}>
                    <ListItemText primary="Bulk Sms" />
                    {bulkCollapseOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={bulkCollapseOpen} timeout="auto" unmountOnExit>
                    {['Request', 'Bulk Sms List', 'Send Bulk Sms'].map((text, index) => (
                        <ListItem button key={text} onClick={leftMenuOnClik} >
                            { /* <ListItemIcon>*/}
                            { /*index % 2 === 0 ? <InboxIcon /> : <MailIcon />*/}
                            { /* </ListItemIcon>*/}
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </Collapse>
            </List>
        </div>
    );

    if (getLogin()) {
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}

                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" style={{ flex: 1 }} noWrap >Sms App</Typography>


                        <Button onClick={() => {
                            setLogin(false);
                            clearLogin();
                            history.push('/');
                        }
                        } color="inherit"> LOGOUT

                        </Button>

                        <FormHelperText className={classes.loginProps}>{props.location.state.userName}</FormHelperText>
                    </Toolbar>
                </AppBar>
                {
                    /*<nav className={classes.drawer} aria-label="mailbox folders"> */
                }
                {
                    /* The implementation can be swapped with js to avoid SEO duplication of links. */
                }
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div>
                        {components}
                    </div >
                </main>
            </div >
        );
    }
    else {
        return (<Redirect to='/' />)
    }
}

