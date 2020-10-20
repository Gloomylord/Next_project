import {useCallback, useState} from 'react';
import TextField from "@material-ui/core/TextField";

export default function InputPhoneNumber({value, setValue, errorValues, setErrorValues, defaultValue}) {
    const [error, setError] = useState(false);

    const onChange = useCallback((e) => {
        const value = e.target.value.replace(/[^0123456789+ ()-]/g, '').trim();
        setValue(value);

        const re = /^((\+7)|8)[( ]?\d{3}[) -]?\d{3}[- ]?\d{2}[- ]?\d{2}$/;
        const phone = value.replace(/[^0123456789+]/g, '');
        const test = re.test(value);
        if (!test && defaultValue !== phone) {
            setErrorValues({...errorValues, phoneNumber: true})
            setError(true);
        } else if (defaultValue === phone) {
            setErrorValues({...errorValues, phoneNumber: null});
            setError(false);
        } else {
            setErrorValues({...errorValues, phoneNumber: false});
            setError(false);
        }
        console.log(defaultValue, phone)
    }, [value, errorValues, defaultValue]);

    return <TextField
        value={value}
        error={error}
        onChange={onChange}
        id="phoneNumber"
        label="Номер телефона"
        variant="outlined"
        helperText={error ? "Incorrect entry. Example: +7(888)888-88-88" : ''}
    />
}
