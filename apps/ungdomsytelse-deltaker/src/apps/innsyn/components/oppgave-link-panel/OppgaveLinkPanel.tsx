import { CheckmarkCircleFillIcon, CircleSlashFillIcon, PencilFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Heading, HGrid, LinkPanel, Show, Tag, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveStatus } from '@navikt/ung-common';

interface Props {
    tittel: string;
    beskrivelse?: React.ReactNode;
    status: OppgaveStatus;
    svarfrist?: Date;
    løstDato?: Date;
    onClick: () => void;
}

const OppgaveStatusIcon = ({ oppgavestatus }: { oppgavestatus: OppgaveStatus }) => {
    switch (oppgavestatus) {
        case OppgaveStatus.ULØST:
            return <PencilFillIcon fill="red" color="#C95100" width="1.8rem" height="1.8rem" aria-label="Penn-ikon" />;
        case OppgaveStatus.LØST:
            return (
                <CheckmarkCircleFillIcon
                    fill="red"
                    color="#00893c"
                    width="1.8rem"
                    height="1.8rem"
                    aria-label="Gjennomført ikon"
                />
            );
        case OppgaveStatus.UTLØPT:
        case OppgaveStatus.AVBRUTT:
        case OppgaveStatus.LUKKET:
            return (
                <CircleSlashFillIcon
                    fill="red"
                    color="#49515e"
                    width="1.8rem"
                    height="1.8rem"
                    aria-label="Gjennomført ikon"
                />
            );
    }
};

const OppgaveStatusTag = ({
    status,
    svarfrist,
    løstDato,
}: {
    status: OppgaveStatus;
    svarfrist?: Date;
    løstDato?: Date;
}) => {
    if (status === 'ULØST' && svarfrist) {
        return (
            <Tag variant="warning-moderate" size="small" className="mb-2">
                Frist: {dateFormatter.dayCompactDate(svarfrist)}
            </Tag>
        );
    }
    if (løstDato) {
        switch (status) {
            case OppgaveStatus.LØST:
                return <BodyShort className="text-text-subtle">Løst: {dateFormatter.compact(løstDato)}</BodyShort>;
            case OppgaveStatus.UTLØPT:
                return <BodyShort className="text-text-subtle">Utløpt: {dateFormatter.compact(løstDato)}</BodyShort>;
            case OppgaveStatus.AVBRUTT:
                return <BodyShort className="text-text-subtle">Avbrutt: {dateFormatter.compact(løstDato)}</BodyShort>;
            case OppgaveStatus.LUKKET:
                return <BodyShort className="text-text-subtle">Lukket: {dateFormatter.compact(løstDato)}</BodyShort>;
            default:
                return null;
        }
    }
};

const OppgaveLinkPanel = ({ tittel, beskrivelse, status, svarfrist, løstDato, onClick }: Props) => {
    return (
        <LinkPanel
            href="#"
            className="w-full"
            border={false}
            style={{ borderRadius: '0.5rem' }}
            onClick={(evt) => {
                evt.stopPropagation();
                evt.preventDefault();
                onClick();
            }}>
            <HGrid columns={{ sm: '3rem auto' }} gap="2" className="w-full" align="center">
                <Show above="sm">
                    <Box paddingInline="2 3">
                        <OppgaveStatusIcon oppgavestatus={status} />
                    </Box>
                </Show>
                <VStack gap="1">
                    <Heading level="3" size="small">
                        {tittel}
                    </Heading>
                    {beskrivelse && <Box marginBlock="0 1">{beskrivelse}</Box>}
                    <div>
                        <OppgaveStatusTag status={status} svarfrist={svarfrist} løstDato={løstDato} />
                    </div>
                </VStack>
            </HGrid>
        </LinkPanel>
    );
};

export default OppgaveLinkPanel;
