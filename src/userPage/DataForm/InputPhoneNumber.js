import {useCallback, useState} from 'react';
import TextField from "@material-ui/core/TextField";

export default function InputPhoneNumber({value, setValue, errorValues, setErrorValues, defaultValue}) {
    const [error, setError] = useState(false);

    const onChange = useCallback((e) => {
        const value = e.target.value
            .replace(/[^0123456789+ ()-]/g, '')
            .trim()
            .replace(/\s+|-+|\(+|\)+/g, (str) => str.slice(0, 1));
        setValue(value);

        const re = /^((\+7)|8) ?((\(\d{3}\) ?)|(\d{3}-?))[ ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/;
        const test = re.test(value);
        const phone = value.replace(/[^0123456789+]/g, '');

        if (!test && defaultValue !== phone) {
            setErrorValues({...errorValues, phoneNumber: true})
            setError(true);
        } else if (defaultValue === phone) {
            setErrorValues({...errorValues, phoneNumber: null});
            setError(!test);
        } else {
            setErrorValues({...errorValues, phoneNumber: false});
            setError(false);
        }
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
