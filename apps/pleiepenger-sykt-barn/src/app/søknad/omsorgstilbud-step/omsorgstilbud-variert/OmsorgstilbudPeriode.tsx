import React, { useState } from 'react';
import { DateRange } from '@navikt/sif-common-formik-ds/src';
import {
    DateDurationMap,
    dateToISODate,
    getDatesInDateRange,
    getDurationForISOWeekdayNumber,
    ISODateToDate,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { OmsorgstilbudPeriodeData } from '../../../local-sif-common-pleiepenger/components/omsorgstilbud-periode/components/omsorgstilbud-periode-form/OmsorgstilbudPeriodeForm';
import OmsorgstilbudPeriodeDialog from '../../../local-sif-common-pleiepenger/components/omsorgstilbud-periode/components/omsorgstilbud-periode-dialog/OmsorgstilbudPeriodeDialog';
import { Button } from '@navikt/ds-react';
import { AppText } from '../../../i18n';

interface Props {
    periode: DateRange;
    onPeriodeChange: (tid: DateDurationMap) => void;
}

const oppdaterDagerMedOmsorgstilbudIPeriode = ({
    fom,
    tom,
    tidFasteDager,
}: OmsorgstilbudPeriodeData): DateDurationMap => {
    const datoerIPeriode = getDatesInDateRange({ from: fom, to: tom }, true);
    const dagerSomSkalEndres: DateDurationMap = {};
    datoerIPeriode.forEach((dato) => {
        const isoDate = dateToISODate(dato);
        const varighet = getDurationForISOWeekdayNumber(tidFasteDager, dayjs(ISODateToDate(isoDate)).isoWeekday());
        if (varighet) {
            dagerSomSkalEndres[isoDate] = { ...varighet };
        }
    });
    return dagerSomSkalEndres;
};

const OmsorgstilbudPeriode: React.FC<Props> = ({ periode, onPeriodeChange }) => {
    const [visPeriode, setVisPeriode] = useState(false);

    const handleFormSubmit = (data: OmsorgstilbudPeriodeData) => {
        setVisPeriode(false);
        setTimeout(() => {
            onPeriodeChange(oppdaterDagerMedOmsorgstilbudIPeriode(data));
        });
    };

    return (
        <>
            <Button type="button" onClick={() => setVisPeriode(true)} size={'small'}>
                <AppText id="omsorgstilbudPeriode.leggTilTidIOmsorgstilbudLabel" />
            </Button>
            <OmsorgstilbudPeriodeDialog
                formProps={{
                    periode,

                    onCancel: () => setVisPeriode(false),
                    onSubmit: handleFormSubmit,
                }}
                isOpen={visPeriode}
            />
        </>
    );
};

export default OmsorgstilbudPeriode;
