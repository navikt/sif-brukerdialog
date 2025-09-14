import { Button } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import {
    DateDurationMap,
    dateToISODate,
    getDatesInDateRange,
    getDurationForISOWeekdayNumber,
    ISODateToDate,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { useState } from 'react';

import { AppText } from '../../../i18n';
import OmsorgstilbudPeriodeDialog from '../../../local-sif-common-pleiepenger/components/omsorgstilbud-periode/components/omsorgstilbud-periode-dialog/OmsorgstilbudPeriodeDialog';
import { OmsorgstilbudPeriodeData } from '../../../local-sif-common-pleiepenger/components/omsorgstilbud-periode/components/omsorgstilbud-periode-form/OmsorgstilbudPeriodeForm';

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

const OmsorgstilbudPeriode = ({ periode, onPeriodeChange }: Props) => {
    const [visPeriode, setVisPeriode] = useState(false);

    const handleFormSubmit = (data: OmsorgstilbudPeriodeData) => {
        setVisPeriode(false);
        setTimeout(() => {
            onPeriodeChange(oppdaterDagerMedOmsorgstilbudIPeriode(data));
        });
    };

    return (
        <div>
            <Button type="button" onClick={() => setVisPeriode(true)} size="small">
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
        </div>
    );
};

export default OmsorgstilbudPeriode;
