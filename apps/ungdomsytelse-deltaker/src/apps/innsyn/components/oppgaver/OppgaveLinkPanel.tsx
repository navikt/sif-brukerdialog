import { Box, Heading, HGrid, LinkPanel, Tag, VStack } from '@navikt/ds-react';
import { CheckmarkCircleFillIcon, PencilFillIcon } from '@navikt/aksel-icons';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Oppgave, OppgaveStatus } from '@navikt/ung-common';
import { useAppIntl } from '../../i18n';
import { getOppgaveBeskrivelse, getOppgaveTittel } from '../../utils/textUtils';

interface Props {
    oppgave: Oppgave;
    onGotoOppgave: (oppgave: Oppgave) => void;
}

const OppgaveStatusIcon = ({ oppgavestatus }: { oppgavestatus: OppgaveStatus }) => {
    switch (oppgavestatus) {
        case 'ULØST':
            return <PencilFillIcon fill="red" color="#C95100" width="2rem" height="2rem" />;
        case 'LØST':
            return <CheckmarkCircleFillIcon fill="red" color="#00893c" width="2rem" height="2rem" />;
        default:
            return null;
    }
};

const OppgaveStatusTag = ({ oppgave }: { oppgave: Oppgave }) => {
    if (oppgave.status === 'ULØST') {
        return (
            <Tag variant="warning" size="small" className="mb-2">
                Svarfrist: {dateFormatter.dayCompactDate(oppgave.svarfrist)}
            </Tag>
        );
    }
    if (oppgave.løstDato) {
        return (
            <Tag variant="info-moderate" size="small" className="mb-2">
                Sendt inn: {dateFormatter.compact(oppgave.løstDato)}
            </Tag>
        );
    }
};

const OppgaveLinkPanel = ({ oppgave, onGotoOppgave }: Props) => {
    const intl = useAppIntl();
    return (
        <LinkPanel
            border={false}
            style={{ borderRadius: '0.5rem' }}
            href="#"
            className="w-full"
            onClick={(evt) => {
                evt.stopPropagation();
                evt.preventDefault();
                onGotoOppgave(oppgave);
            }}>
            <HGrid columns="1fr auto" gap="2" className="w-full" align="center">
                <Box paddingInline="3">
                    <OppgaveStatusIcon oppgavestatus={oppgave.status} />
                </Box>
                <VStack gap="2">
                    <Heading level="3" size="small">
                        {getOppgaveTittel(oppgave.oppgavetype, intl)}
                    </Heading>
                    {getOppgaveBeskrivelse(oppgave)}
                    <div>
                        <OppgaveStatusTag oppgave={oppgave} />
                    </div>
                </VStack>
            </HGrid>
        </LinkPanel>
    );
};

export default OppgaveLinkPanel;
