import { Alert, BodyLong, Box, Switch, VStack } from '@navikt/ds-react';
import { default as NextLink } from 'next/link';
import { useMemo, useState } from 'react';

import { AppText, useAppIntl } from '../../i18n';
import { Inntektsmelding, Sak } from '../../types';
import { ProcessStepData } from '../../types/ProcessStepData';
import { getAlleHendelserISak } from '../../utils/sakUtils';
import SkrivTilOssLenke from '../lenker/SkrivTilOssLenke';
import LinkButton from '../link-button/LinkButton';
import StatusISakHeading from './parts/StatusISakHeading';
import StatusISakSteps from './StatusISakSteps';
import { getProcessStepsFraSakshendelser } from './statusISakUtils';

interface Props {
    sak: Sak;
    tittel?: string;
    visAlleHendelser?: boolean;
    inntektsmeldinger: Inntektsmelding[];
}

const sortProcessStepDescending = (a: ProcessStepData, b: ProcessStepData) =>
    (b.timestamp?.getTime() || 0) - (a.timestamp?.getTime() || 0);

const sortProcessStepAscending = (a: ProcessStepData, b: ProcessStepData) =>
    (a.timestamp?.getTime() || 0) - (b.timestamp?.getTime() || 0);

const StatusISak = ({ sak, visAlleHendelser, tittel, inntektsmeldinger }: Props) => {
    const [sortDescending, setSortDescending] = useState(true);
    const { text } = useAppIntl();

    const processSteps = useMemo(() => {
        const sakshendelser = getAlleHendelserISak(sak, inntektsmeldinger);
        const steps = getProcessStepsFraSakshendelser(text, sakshendelser);
        return steps.sort(sortDescending ? sortProcessStepDescending : sortProcessStepAscending);
    }, [sak, inntektsmeldinger, text, sortDescending]);

    const visibleSteps = useMemo(
        () => (visAlleHendelser ? processSteps : processSteps.slice(0, 3)),
        [visAlleHendelser, processSteps],
    );

    const finnesFlereHendelser = visibleSteps.length < processSteps.length;

    if (processSteps.length === 0) {
        return (
            <VStack gap="space-12">
                {tittel ? <StatusISakHeading tittel={tittel} /> : null}
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

    return (
        <VStack gap="space-12">
            {tittel ? <StatusISakHeading tittel={tittel} /> : null}
            {visAlleHendelser ? (
                <Box>
                    <Switch
                        checked={sortDescending}
                        onChange={(e) => {
                            setSortDescending(e.target.checked);
                        }}>
                        Vis nyeste øverst
                    </Switch>
                </Box>
            ) : null}
            <Box background="default" borderRadius="16" padding="space-24">
                <VStack gap="space-32">
                    <StatusISakSteps steps={visibleSteps} isTruncated={finnesFlereHendelser ? 'end' : undefined} />
                    {finnesFlereHendelser && !visAlleHendelser ? (
                        <div>
                            <LinkButton direction="right" as={NextLink} href={`/sak/${sak.saksnummer}/historikk`}>
                                Se tidligere hendelser
                            </LinkButton>
                        </div>
                    ) : null}
                </VStack>
            </Box>
        </VStack>
    );
};

export default StatusISak;
