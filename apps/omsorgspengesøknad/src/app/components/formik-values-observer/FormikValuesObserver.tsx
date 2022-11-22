import { useEffect, useRef } from 'react';
import isEqual from 'react-fast-compare';
import { useFormikContext } from 'formik';
import debounce from 'lodash.debounce';

interface Props<FormValues> {
    onChange: (values: FormValues) => void;
    delay?: number;
}

function FormikValuesObserver<FormValues>({ onChange, delay = 100 }: Props<FormValues>) {
    const { values } = useFormikContext<FormValues>();
    const prefValuesRef = useRef<any>();

    const emitChanged = debounce((values: FormValues) => {
        onChange(values);
    }, delay);

    useEffect(() => {
        if (!isEqual(prefValuesRef.current, values)) {
            emitChanged(values);
        }
    });

    useEffect(() => {
        prefValuesRef.current = values;
    });

    return null;
}

export default FormikValuesObserver;
