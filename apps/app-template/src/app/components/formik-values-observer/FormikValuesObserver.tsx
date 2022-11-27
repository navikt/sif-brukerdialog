import { useEffect, useRef, useState } from 'react';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
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
    const [mounted, setMounted] = useState(false);

    const emitChanged = debounce((values: FormValues) => {
        onChange(values);
    }, delay);

    useEffect(() => {
        if (mounted || true) {
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
