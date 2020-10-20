import {useCallback, useState} from "react";
import {List, ListItem, Box, Button} from "@material-ui/core";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneIcon from '@material-ui/icons/Phone';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import InputMail from "./InputMail";
import InputName from "./InputName";
import InputPhoneNumber from "./InputPhoneNumber";
import SimpleModal from "./SimpleModal";
import classes from '../../../styles/dataForm.module.css';

export default function DataForm({
                                     fullName: fullNameProps = '',
                                     setFullName: setFullNameProps,
                                     mail: mailProps = '',
                                     setMail: setMailProps,
                                     phoneNumber: phoneNumberProps = '',
                                     setPhoneNumber: setPhoneNumberProps,
                                 }) {
    const [fullName, setFullName] = useState(fullNameProps);
    const [mail, setMail] = useState(mailProps);
    const [phoneNumber, setPhoneNumber] = useState(phoneNumberProps);
    const [errorValues, setErrorValues] = useState({});

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        const phone = phoneNumber.replace(/[^0123456789+]/, '');

        localStorage.setItem('userData', JSON.stringify({
            fullName,
            mail,
            phoneNumber: phone
        }));

        const formData = new FormData();
        if (fullName) {
            formData.append('fullName', fullName);
            setFullNameProps(fullName);
        }
        if (mail) {
            formData.append('mail', mail);
            setMailProps(mail);
        }
        if (phoneNumber) {
            formData.append('phoneNumber', phoneNumber);
            setPhoneNumberProps(phone);
        }

        let response = await fetch('/api/echo', {
            method: 'POST',
            body: formData
        });

        let result = await response.json();

        console.log(result, response.ok);
        setErrorValues([]);
    }, [fullName, mail, phoneNumber]);

    return <Box component={'form'} className={classes.form} onSubmit={onSubmit}>
        <List className={classes.list} component="ul" aria-label="user data">
            <ListItem>
                <AssignmentIndIcon className={classes.icon}/>
                <InputName value={fullName}
                           setValue={setFullName}
                           defaultValue={fullNameProps}
                           errorValues={errorValues}
                           setErrorValues={setErrorValues}/>
            </ListItem>
            <ListItem>
                <AlternateEmailIcon className={classes.icon}/>
                <InputMail value={mail}
                           setValue={setMail}
                           errorValues={errorValues}
                           defaultValue={mailProps}
                           setErrorValues={setErrorValues}/>
            </ListItem>
            <ListItem>
                <PhoneIcon className={classes.icon}/>
                <InputPhoneNumber value={phoneNumber}
                                  setValue={setPhoneNumber}
                                  errorValues={errorValues}
                                  defaultValue={phoneNumberProps}
                                  setErrorValues={setErrorValues}/>
            </ListItem>
        </List>
        <SimpleModal errorValues={errorValues} onSubmit={onSubmit}/>
    </Box>
}