import { CheckmarkCircleFillIcon, PencilFillIcon } from '@navikt/aksel-icons';
import { Box, Heading, HGrid, LinkPanel, Tag, VStack } from '@navikt/ds-react';
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
        case 'ULØST':
            return <PencilFillIcon fill="red" color="#C95100" width="2.25rem" height="2.25rem" />;
        case 'LØST':
            return <CheckmarkCircleFillIcon fill="red" color="#00893c" width="2.25rem" height="2.25rem" />;
        default:
            return null;
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
            <Tag variant="warning" size="small" className="mb-2">
                Svarfrist: {dateFormatter.dayCompactDate(svarfrist)}
            </Tag>
        );
    }
    if (løstDato) {
        return <Box className="text-text-subtle">Sendt inn: {dateFormatter.compact(løstDato)}</Box>;
    }
};

const OppgaveLinkPanel = ({ tittel, beskrivelse, status, svarfrist, løstDato, onClick }: Props) => {
    return (
        <LinkPanel
            border={false}
            style={{ borderRadius: '0.5rem' }}
            href="#"
            className="w-full"
            onClick={(evt) => {
                evt.stopPropagation();
                evt.preventDefault();
                onClick();
            }}>
            <HGrid columns="1fr auto" gap="2" className="w-full" align="center">
                <Box paddingInline="3">
                    <OppgaveStatusIcon oppgavestatus={status} />
                </Box>
                <VStack gap="1">
                    <Heading level="3" size="small">
                        {tittel}
                    </Heading>
                    {beskrivelse}
                    <div>
                        <OppgaveStatusTag status={status} svarfrist={svarfrist} løstDato={løstDato} />
                    </div>
                </VStack>
            </HGrid>
        </LinkPanel>
    );
};

export default OppgaveLinkPanel;
