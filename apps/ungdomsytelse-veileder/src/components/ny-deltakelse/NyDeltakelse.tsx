import { Box, Button } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '../../api/types';
import { useMemo, useState } from 'react';
import MeldInnDeltakerForm from '../../forms/meld-inn-deltaker-form/MeldInnDeltakerForm';
import { DateRange, dateRangeUtils } from '@navikt/sif-common-utils';

interface Props {
    deltaker: Deltaker;
    alleDeltakelser: Deltakelse[];
    onDeltakelseRegistrert: () => void;
}

const NyDeltakelse = ({ alleDeltakelser, deltaker, onDeltakelseRegistrert }: Props) => {
    const [showForm, setShowForm] = useState(false);

    const alleDeltakelserHarSluttDato = alleDeltakelser.every((d) => !!d.periode);
    if (!alleDeltakelserHarSluttDato) {
        return null;
    }

    const minStartDato = useMemo(() => getMinFraOgMedDato(alleDeltakelser), [alleDeltakelser]);

    return !showForm ? (
        <Box>
            <Button type="button" variant="secondary" size="small" onClick={() => setShowForm(true)}>
                Meld deltaker inn til ny periode
            </Button>
        </Box>
    ) : (
        <Box className="rounded bg-gray-100 pb-10">
            <Box className=" p-3 pr-6 pl-6 border-b-2 border-b-gray-300 max-w-lg">
                <MeldInnDeltakerForm
                    deltaker={deltaker}
                    minStartDato={minStartDato}
                    onCancel={() => setShowForm(false)}
                    onDeltakelseRegistrert={onDeltakelseRegistrert}
                />
            </Box>
        </Box>
    );
};

const getMinFraOgMedDato = (alleDeltakelser: Deltakelse[]): Date => {
    const perioder = (alleDeltakelser.map((d) => d.periode).filter((p) => p !== undefined) as DateRange[]).sort(
        dateRangeUtils.sortDateRangeByToDate,
    );
    return perioder[perioder.length - 1].to;
};

export default NyDeltakelse;
