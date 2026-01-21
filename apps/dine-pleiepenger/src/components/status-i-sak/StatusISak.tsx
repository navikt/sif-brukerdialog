import { ChevronRightIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Box, Link, Switch, VStack } from '@navikt/ds-react';
import { default as NextLink } from 'next/link';
import { useState } from 'react';

import { AppText, useAppIntl } from '../../i18n';
import { Inntektsmelding, Sak } from '../../types';
import { getAlleHendelserISak } from '../../utils/sakUtils';
import SkrivTilOssLenke from '../lenker/SkrivTilOssLenke';
import StatusISakHeading from './parts/StatusISakHeading';
import StatusISakSteps from './StatusISakSteps';
import { getProcessStepsFraSakshendelser } from './statusISakUtils';

interface Props {
    sak: Sak;
    tittel?: string;
    visAlleHendelser?: boolean;
    inntektsmeldinger: Inntektsmelding[];
}

const StatusISak = ({ sak, visAlleHendelser, tittel, inntektsmeldinger }: Props) => {
    const [reverseDirection, setReverseDirection] = useState(false);
    const { text } = useAppIntl();
    const sakshendelser = getAlleHendelserISak(sak, inntektsmeldinger);
    const processSteps = getProcessStepsFraSakshendelser(text, sakshendelser);

    if (processSteps.length === 0) {
        return (
            <VStack gap="space-12">
                <StatusISakHeading tittel={tittel} />
                <Alert variant="info">
                    <AppText
                        id="statusISak.ingenHendelser"
                        values={{
                            p: (txt: string) => <BodyLong>{txt}</BodyLong>,
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
    const finnesFlereHendelser = visibleSteps.length < processSteps.length;

    return (
        <VStack gap="space-12">
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
            <Box className="bg-white p-6 pb-4 pt-6 rounded-large" background="default" borderRadius="16">
                <VStack gap="space-32">
                    <StatusISakSteps steps={visibleSteps} isTruncated={finnesFlereHendelser ? 'start' : undefined} />
                    {finnesFlereHendelser && visAlleHendelser === undefined ? (
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
