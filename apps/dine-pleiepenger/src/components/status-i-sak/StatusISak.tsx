import { ChevronRightIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Box, Link, Switch, VStack } from '@navikt/ds-react';
import { default as NextLink } from 'next/link';
import { useState } from 'react';

import { AppText, useAppIntl } from '../../i18n';
import { Sak } from '../../server/api-models/SakSchema';
import { getAlleHendelserISak } from '../../utils/sakUtils';
import SkrivTilOssLenke from '../lenker/SkrivTilOssLenke';
import StatusISakHeading from './parts/StatusISakHeading';
import StatusISakSteps from './StatusISakSteps';
import { getProcessStepsFraSakshendelser } from './statusISakUtils';

interface Props {
    sak: Sak;
    tittel?: string;
    visAlleHendelser?: boolean;
}

const StatusISak = ({ sak, visAlleHendelser, tittel }: Props) => {
    const [reverseDirection, setReverseDirection] = useState(false);
    const { text } = useAppIntl();
    const hendelser = getAlleHendelserISak(sak);
    const processSteps = getProcessStepsFraSakshendelser(text, hendelser);

    if (processSteps.length === 0) {
        return (
            <VStack gap="3">
                <StatusISakHeading tittel={tittel} />
                <Alert variant="info">
                    <AppText
                        id="statusISak.ingenHendelser"
                        values={{
                            p: (txt) => <BodyLong>{txt}</BodyLong>,
                            lenke: <SkrivTilOssLenke tekst={text('statusISak.ingenHendelser.skrivTilOssLenkeTekst')} />,
                        }}
                    />
                </Alert>
            </VStack>
        );
    }

    if (reverseDirection) {
        processSteps.reverse();
    }
    const visibleSteps = visAlleHendelser ? processSteps : [...processSteps].splice(-3);
    const finnnesFlereHendelser = visibleSteps.length < processSteps.length;

    return (
        <VStack gap="3">
            <StatusISakHeading tittel={tittel} />
            {visAlleHendelser ? (
                <Box>
                    <Switch
                        checked={reverseDirection}
                        onChange={(e) => {
                            setReverseDirection(e.target.checked);
                        }}>
                        Vis nyeste øverst
                    </Switch>
                </Box>
            ) : null}
            <Box className="bg-white p-6 pb-4 pt-6 rounded-large">
                <VStack gap="8">
                    <StatusISakSteps steps={visibleSteps} />
                    {finnnesFlereHendelser && visAlleHendelser === undefined ? (
                        <Box className="ml-4 mb-4">
                            <Link as={NextLink} href={`/sak/${sak.saksnummer}/historikk`}>
                                Se alle hendelser
                                <ChevronRightIcon role="presentation" />
                            </Link>
                        </Box>
                    ) : null}
                </VStack>
            </Box>
        </VStack>
    );
};

export default StatusISak;
