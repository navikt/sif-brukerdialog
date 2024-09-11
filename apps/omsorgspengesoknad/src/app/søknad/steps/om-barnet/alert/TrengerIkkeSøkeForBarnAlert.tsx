import { Alert, BodyLong, Heading, Link } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { AppText } from '../../../../i18n';

interface Props {
    barnetsFornavn: string;
}

const TrengerIkkeSøkeForBarnAlert = ({ barnetsFornavn }: Props) => {
    return (
        <Alert variant="warning">
            <Heading size="small" level="3">
                <AppText id="steg.omBarnet.alert.trengerIkkeSøke.tittel" values={{ barnetsFornavn }} />
            </Heading>
            <BodyLong>
                <AppText
                    id="steg.omBarnet.alert.trengerIkkeSøke.tekst"
                    values={{
                        barnetsFornavn,
                        Lenke: (child: ReactNode) => <Link href={getEnvironmentVariable('MINSIDE_URL')}>{child}</Link>,
                    }}
                />
            </BodyLong>
        </Alert>
    );
};

export default TrengerIkkeSøkeForBarnAlert;
