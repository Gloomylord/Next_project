import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import classes from '../../styles/header.module.css';

export default function Header({name, surname, avatarUrl}) {
    return (
        <Box className={classes.pageLine}>
            <Box className={classes.icon}>
                <NotificationsNoneIcon style={{fontSize: 'inherit'}}/>
            </Box>
            <Box className={classes.headerLine}/>
            <Box className={classes.avatar}>
                <Avatar alt='avatar'
                        src={avatarUrl ? avatarUrl : '/avatar.svg'}
                        style={{height: '100%', width: '100%'}}/>
            </Box>
            <Box className={classes.name}>{surname + ' ' + name.slice(0, 1)}.</Box>
        </Box>
    )
}