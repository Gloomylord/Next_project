import Head from 'next/head';
import Header from "../src/Header";
import User from "../src/userPage/User";
import Box from "@material-ui/core/Box";
import DataList from "../src/userPage/DataList";
import {useEffect, useState} from "react";
import DataForm from "../src/userPage/DataForm/DataForm";
import classes from '../styles/pages.module.css';

export default function Home() {
    const [isRefactor, setIsRefactor] = useState(false);
    const [fullName, setFullName] = useState('Иванова Анна Михайловна');
    const [mail, setMail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        if (localStorage.getItem('userData')) {
            const {fullName, mail, phoneNumber} = JSON.parse(localStorage.getItem('userData'));
            if (fullName) setFullName(fullName);
            if (mail) setMail(mail);
            if (phoneNumber) setPhoneNumber(phoneNumber);
        }
    }, []);

    return (
        <Box className={classes.container}>
            <Head>
                <title>User page</title>
            </Head>
            <Header name={fullName ? fullName.split(' ')[1] : 'Анна'}
                    surname={fullName ? fullName.split(' ')[0] : 'Иванова'}/>
            <Box className={classes.pageName}>
                <h3>Личный профиль</h3>
                <label>Главная/Личный профиль</label>
            </Box>
            <User fullName={fullName ? fullName : 'Иванова Анна Михайловна'}
                  isRefactor={isRefactor}
                  setIsRefactor={setIsRefactor}/>
            {!isRefactor ?
                <DataList mail={mail ? mail : 'Ivanova@mail.ru'}
                          phoneNumber={phoneNumber}/> :
                <DataForm fullName={fullName}
                          setFullName={setFullName}
                          mail={mail}
                          setMail={setMail}
                          phoneNumber={phoneNumber}
                          setPhoneNumber={setPhoneNumber}
                />
            }
        </Box>
    )
}
