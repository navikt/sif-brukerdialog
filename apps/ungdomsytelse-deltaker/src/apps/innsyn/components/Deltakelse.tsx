import { Deltakelse } from '../../../api/types';
import { VStack } from '@navikt/ds-react';
import {
    getTidligereRapporteringsperioder,
    getÅpenRapporteringsperiode,
    sorterRapporteringsperioderDesc,
} from '../utils/deltakelseUtils';
import Inntektsrapportering from './Inntektsrapportering';
import TidligerePerioder from './TidligerePerioder';

interface Props {
    deltakelse: Deltakelse;
}

const Deltakelse = ({ deltakelse }: Props) => {
    const { rapporteringsPerioder } = deltakelse;
    const åpenPeriode = getÅpenRapporteringsperiode(rapporteringsPerioder || []);
    const tidligerePerioder = getTidligereRapporteringsperioder(rapporteringsPerioder || []).sort(
        sorterRapporteringsperioderDesc,
    );

    return (
        <VStack gap="8">
            {åpenPeriode ? (
                <Inntektsrapportering deltakelseId={deltakelse.id} rapporteringsperiode={åpenPeriode} />
            ) : null}

            <TidligerePerioder perioder={tidligerePerioder || []} />
        </VStack>
    );
};

export default Deltakelse;
