import { Deltakelse } from '../../../api/types';
import { VStack } from '@navikt/ds-react';
import {
    getGjeldendeRapporteringsperiode,
    getTidligereRapporteringsperioder,
    sorterRapporteringsperioderDesc,
} from '../utils/deltakelseUtils';
import Inntektsperiode from './Inntektsperiode';
import TidligerePerioder from './TidligerePerioder';

interface Props {
    deltakelse: Deltakelse;
}

const Deltakelse = ({ deltakelse }: Props) => {
    const { rapporteringsPerioder } = deltakelse;
    const periode = getGjeldendeRapporteringsperiode(rapporteringsPerioder || []);
    const tidligerePerioder = getTidligereRapporteringsperioder(rapporteringsPerioder || []).sort(
        sorterRapporteringsperioderDesc,
    );

    return (
        <VStack gap="8">
            {periode ? <Inntektsperiode deltakelseId={deltakelse.id} rapporteringsperiode={periode} /> : null}

            <TidligerePerioder perioder={tidligerePerioder || []} />
        </VStack>
    );
};

export default Deltakelse;
