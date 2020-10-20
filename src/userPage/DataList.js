import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import Divider from "@material-ui/core/Divider";
import PhoneIcon from '@material-ui/icons/Phone';
import classes from '../../styles/data.module.css';

export default function DataList({mail, phoneNumber}) {
    return <List component="nav" className={classes.list} aria-label="user data">
        <ListItem>
            <AlternateEmailIcon className={classes.icon}/>
            <ListItemText primary={mail}/>
        </ListItem>
        <Divider/>
        <ListItem>
            <PhoneIcon className={classes.icon}/>
            <ListItemText primary={phoneNumber ? phoneNumber : 'Укажите номер телефона'} className={classes.text}/>
        </ListItem>
    </List>
}
