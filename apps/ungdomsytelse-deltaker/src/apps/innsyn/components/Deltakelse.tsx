import { Deltakelse } from '../../../api/types';
import { VStack } from '@navikt/ds-react';
import { getGjeldendeRapporteringsperiode, getTidligereRapporteringsperioder } from '../utils/deltakelseUtils';
import FremhevetInntektsperiode from './fremhevet-inntektsperiode/FremhevetInntektsperiode';
import TidligerePerioder from './TidligerePerioder';

interface Props {
    deltakelse: Deltakelse;
}

const Deltakelse = ({ deltakelse }: Props) => {
    const { rapporteringsPerioder } = deltakelse;
    const gjeldendePeriode = getGjeldendeRapporteringsperiode(rapporteringsPerioder || []);
    const tidligerePerioder = getTidligereRapporteringsperioder(rapporteringsPerioder || []);

    return (
        <VStack gap="8">
            {gjeldendePeriode ? <FremhevetInntektsperiode rapporteringsperiode={gjeldendePeriode} /> : null}
            <TidligerePerioder
                perioder={tidligerePerioder || []}
                programperiodeStartDato={deltakelse.programPeriode.from}
            />
        </VStack>
    );
};

export default Deltakelse;
