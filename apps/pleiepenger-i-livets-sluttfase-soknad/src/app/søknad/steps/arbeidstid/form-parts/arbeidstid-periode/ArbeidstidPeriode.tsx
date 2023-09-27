import React, { useState } from 'react';
import { DateDurationMap } from '@navikt/sif-common-utils/lib';
import { getDagerMedTidFraArbeidstidPeriodeData } from './arbeidstidPeriodeUtils';
import { ArbeidstidPeriodeFormProps } from '../../../../../local-sif-common-pleiepenger/arbeidstid/arbeidstid-periode-dialog/components/arbeidstid-periode-form/ArbeidstidPeriodeForm';
import { ArbeidstidPeriodeData } from '../../../../../local-sif-common-pleiepenger/arbeidstid/arbeidstid-periode-dialog/types';
import { ArbeidstidPeriodeDialog } from '../../../../../local-sif-common-pleiepenger';
import { Button } from '@navikt/ds-react';

interface Props {
    registrerKnappLabel: string;
    formProps: Pick<ArbeidstidPeriodeFormProps, 'arbeidsstedNavn' | 'intlValues' | 'periode'> & {
        jobberNormaltTimer: number;
    };
    onPeriodeChange: (tid: DateDurationMap, formData: ArbeidstidPeriodeData) => void;
}

const ArbeidstidPeriode: React.FunctionComponent<Props> = ({ registrerKnappLabel, formProps, onPeriodeChange }) => {
    const [visPeriode, setVisPeriode] = useState(false);

    const handleFormSubmit = (data: ArbeidstidPeriodeData) => {
        setVisPeriode(false);
        setTimeout(() => {
            onPeriodeChange(getDagerMedTidFraArbeidstidPeriodeData(data), data);
        });
    };

    return (
        <>
            <Button type="button" variant="primary" size="small" onClick={() => setVisPeriode(true)}>
                {registrerKnappLabel}
            </Button>
            <ArbeidstidPeriodeDialog
                formProps={{
                    ...formProps,
                    onCancel: () => setVisPeriode(false),
                    onSubmit: handleFormSubmit,
                }}
                isOpen={visPeriode}
            />
        </>
    );
};

export default ArbeidstidPeriode;
