import { ArrowRightIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Box, Button, Switch, VStack } from '@navikt/ds-react';
import { default as NextLink } from 'next/link';
import { useMemo, useState } from 'react';

import { AppText, useAppIntl } from '../../i18n';
import { Inntektsmelding, Sak } from '../../types';
import { ProcessStepData } from '../../types/ProcessStepData';
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

    return (
        <VStack gap="space-12">
            <StatusISakHeading tittel={tittel} />
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
            <Box className="p-6 pb-4 pt-6" background="default" borderRadius="16">
                <VStack gap="space-32">
                    <StatusISakSteps steps={visibleSteps} isTruncated={finnesFlereHendelser ? 'end' : undefined} />
                    {finnesFlereHendelser && !visAlleHendelser ? (
                        <Box className="ml-4 mb-4">
                            <Button
                                variant="secondary"
                                type="button"
                                as={NextLink}
                                icon={<ArrowRightIcon />}
                                iconPosition="right"
                                size="small"
                                href={`/sak/${sak.saksnummer}/historikk`}>
                                Se tidligere hendelser
                            </Button>
                        </Box>
                    ) : null}
                </VStack>
            </Box>
        </VStack>
    );
};

export default StatusISak;
