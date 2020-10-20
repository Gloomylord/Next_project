import {useCallback} from "react";
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import classes from '../../styles/user.module.css';

export default function User({fullName, isRefactor, setIsRefactor, avatarUrl}) {

    const changeRefactor = useCallback(() => {
        setIsRefactor(!isRefactor);
    },[isRefactor]);

    return <Box className={classes.user}>

        <Box className={classes.avatar}>
            <Avatar alt='avatar'
                    src={avatarUrl ? avatarUrl : '/avatar.svg'}
                    style={{height: '100%', width: '100%'}}/>
        </Box>

        <h1 className={classes.username}>{fullName}</h1>

        <Box className={classes.refactor} onClick={changeRefactor}>
            <label className={classes.refactor__text}>{isRefactor ? 'Закрыть' : 'Редактировать'}</label>
            <Box className={classes.icon}>
                {
                    !isRefactor ? <CreateIcon style={{fontSize: 'inherit'}}/> :
                        <CloseIcon style={{fontSize: 'inherit'}}/>
                }
            </Box>
        </Box>
    </Box>
}
