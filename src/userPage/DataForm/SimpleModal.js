import {useCallback, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Box} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import classes from '../../../styles/simpleModal.module.css'

const SaveButton = withStyles((theme) => ({
    root: {
        '& span': {
            color: '#fff',
            fontSize: '14px',
            textTransform: 'none',
        },
        borderRadius: '36px',
        backgroundColor: '#01BDA7',
        padding: '15px 26px',
        minWidth: '202px',
        margin: '0 0 26px',
        '&:hover': {
            backgroundColor: '#01b09a',
        },
    },
}))(Button);

const NoSaveButton = withStyles((theme) => ({
    root: {
        '& span': {
            color: '#01BDA7',
            fontSize: '14px',
            textTransform: 'none',
        },
        borderRadius: '36px',
        border: '1px solid #01BDA7',
        backgroundColor: '#fff',
        minWidth: '202px',
        padding: '15px 26px',
        '&:hover': {
            backgroundColor: '#fbfbfb',
        },
    },
}))(Button);

export default function SimpleModal({onSubmit, errorValues}) {

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('notSave');

    const handleOpen = () => {
        setStatus('notSave');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveHandler = useCallback(async (e) => {
        setStatus('loading');
        await onSubmit(e);
        setOpen(true);
        setStatus('save')

    }, [onSubmit, errorValues]);

    const isDisabled = () => {
        const check = Object.values(errorValues).reduce((res, item) => {
            if (res || item) return true;
            if (item === false || res === false) return false;
            return null
        }, null);
        return check || check === null
    };

    return (
        <>
            <SaveButton onSubmit={onSubmit}
                        variant="contained"
                        disabled={isDisabled()}
                        color="primary"
                        onClick={handleOpen}
                        className={classes.formButton}>
                Сохранить&nbsp;изменения
            </SaveButton>
            <Modal open={open}
                   onClose={handleClose}
                   aria-labelledby="simple-modal-title"
                   aria-describedby="simple-modal-description"
            >
                {status === 'notSave' ?
                    <Box className={classes.modal}>
                        <Box className={classes.iconBox}>
                            <CloseIcon onClick={handleClose} className={classes.icon}/>
                        </Box>
                        <h3 className={classes.title}>Сохранить изменения?</h3>
                        <SaveButton type='submit'
                                    variant="contained"
                                    color="primary"
                                    onClick={saveHandler}
                        >
                            Сохранить
                        </SaveButton>
                        <NoSaveButton variant="outlined"
                                      onClick={handleClose}>
                            Не сохранять
                        </NoSaveButton>
                    </Box> : (status === 'save') ?
                        <Box className={classes.completeModal}>
                            <h3 className={classes.title}>Данные успешно сохнанены</h3>
                            <SaveButton variant="contained"
                                        color="primary"
                                        onClick={handleClose}
                            >
                                Хорошо
                            </SaveButton>
                        </Box> :
                        <Box className={classes.completeModal}>
                            <h3 className={classes.title}>
                                Отправляем данные...
                            </h3>
                        </Box>
                }
            </Modal>
        </>
    );
}
