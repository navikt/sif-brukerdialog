import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';

interface Props {
    barnetsFornavn: string;
}

const TrengerIkkeSøkeForBarnAlert = ({ barnetsFornavn }: Props) => {
    return (
        <Alert variant="warning">
            <Heading size="small" level="3">
                Du trenger ikke søke for {barnetsFornavn}
            </Heading>
            <BodyShort>
                Du har allerede et gyldig vedtak som gjelder til og med det kalenderåret {barnetsFornavn} fyller 18 år.
                Du trenger derfor ikke å søke på nytt. Du kan finne melding og dokumentasjon om vedtaket på{' '}
                <Link href={getEnvironmentVariable('MINSIDE_URL')}>Min side</Link>.
            </BodyShort>
        </Alert>
    );
};

export default TrengerIkkeSøkeForBarnAlert;
