import { Box, Button } from '@navikt/ds-react';
import { Deltaker } from '../../api/types';
import { useState } from 'react';
import MeldInnDeltakerForm from '../../forms/meld-inn-deltaker-form/MeldInnDeltakerForm';

interface Props {
    deltaker: Deltaker;
    onDeltakelseRegistrert: () => void;
}

const NyDeltakelse = ({ deltaker, onDeltakelseRegistrert }: Props) => {
    const [showForm, setShowForm] = useState(false);

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
                    minStartDato={deltaker.førsteMuligeInnmeldingsdato}
                    onCancel={() => setShowForm(false)}
                    onDeltakelseRegistrert={onDeltakelseRegistrert}
                />
            </Box>
        </Box>
    );
};

export default NyDeltakelse;
