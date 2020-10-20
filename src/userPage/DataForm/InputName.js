import {useCallback, useState} from 'react';
import TextField from "@material-ui/core/TextField";

export default function InputName({value, setValue, errorValues, setErrorValues, defaultValue}) {
    const [error, setError] = useState(false);

    const onChange = useCallback((e) => {
        const value = e.target.value.trim();
        setValue(value);

        const re = /^([А-ЯЁ][а-яё]+ ){2}[А-ЯЁ][а-яё]+$/;
        setError(!re.test(value));
        const test = re.test(value);
        if (!test && defaultValue !== value) {
            setError(true);
            setErrorValues({...errorValues, name: true})
        } else if (defaultValue === value) {
            setErrorValues({...errorValues, name: null})
            setError(false);
        } else {
            setErrorValues({...errorValues, name: false})
            setError(false);
        }
    }, [value, defaultValue, errorValues]);

    return <TextField
        value={value}
        error={error}
        onChange={onChange}
        id="phoneNumber"
        label="Фамилия и имя"
        variant="outlined"
        helperText={error ? "Incorrect entry." : ''}
    />
}
