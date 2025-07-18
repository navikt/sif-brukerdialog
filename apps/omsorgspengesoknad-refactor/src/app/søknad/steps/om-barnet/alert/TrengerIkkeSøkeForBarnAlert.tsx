import { Alert, BodyLong, Heading, Link } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { AppText } from '../../../../i18n';
import { appEnv } from '../../../../utils/appEnv';

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
                        Lenke: (child: ReactNode) => <Link href={appEnv.SIF_PUBLIC_MINSIDE_URL}>{child}</Link>,
                    }}
                />
            </BodyLong>
        </Alert>
    );
};

export default TrengerIkkeSøkeForBarnAlert;
