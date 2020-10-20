import TextField from "@material-ui/core/TextField";
import {useCallback, useState} from "react";

export default function InputMail({value, setValue, errorValues, setErrorValues, defaultValue}) {
    const [error, setError] = useState(false);

    const onChange = useCallback((e) => {
        const value = e.target.value.replace(/\s/g, '');
        setValue(value);

        const re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        const test = re.test(value);
        if (!test && defaultValue !== value) {
            setErrorValues({...errorValues, mail: true});
            setError(true);
        } else if (defaultValue === value) {
            setErrorValues({...errorValues, mail: null});
            setError(false);
        } else {
            setErrorValues({...errorValues, mail: false});
            setError(false);
        }
    }, [value, defaultValue, errorValues]);

    return <TextField
        error={error}
        value={value}
        onChange={onChange}
        id="E-mail"
        label="E-mail"
        variant="outlined"
        helperText={error ? "Incorrect entry." : ''}
    />
}
