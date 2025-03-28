import { debounce } from '@navikt/ds-react';
import { useFormikContext } from 'formik';
import { useEffect, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';

interface Props<FormValues> {
    onChange: (values: FormValues) => void;
    delay?: number;
}

const useEffectOnce = (callback?: () => void) => {
    const [hasRun, setHasRun] = useState(false);
    useEffect(() => {
        if (callback) {
            if (!hasRun) {
                callback();
                setHasRun(true);
            }
        }
    }, [hasRun, callback]);
};

function FormikValuesObserver<FormValues>({ onChange, delay = 100 }: Props<FormValues>) {
    const { values } = useFormikContext<FormValues>();
    const prefValuesRef = useRef<any>(null);
    const [mounted, setMounted] = useState(false);

    const emitChanged = debounce((v: FormValues) => {
        onChange(v);
    }, delay);

    useEffect(() => {
        if (mounted) {
            if (!isEqual(prefValuesRef.current, values)) {
                emitChanged(values);
            }
        }
    }, [mounted, emitChanged, prefValuesRef, values]);

    useEffectOnce(() => {
        setMounted(true);
    });

    useEffect(() => {
        prefValuesRef.current = values;
    });

    return null;
}

export default FormikValuesObserver;
