import { VStack } from '@navikt/ds-react';
import { TilsynsordningApiData } from '@types';

interface Props {
    tilsynsordning: TilsynsordningApiData;
}

const TilsynsordningOppsummering = ({ tilsynsordning }: Props) => {
    // const { locale } = useIntl();
    return <VStack gap="space-32">Antall endringer {Object.keys(tilsynsordning.perioder).length}</VStack>;
};

export default TilsynsordningOppsummering;
