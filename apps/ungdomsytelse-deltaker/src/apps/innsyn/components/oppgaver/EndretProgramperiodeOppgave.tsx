import { Box, Button, Heading, Tag, VStack } from '@navikt/ds-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { EnvKey } from '@navikt/sif-common-env';
import { usePrevious } from '@navikt/sif-common-hooks';
import { dateFormatter } from '@navikt/sif-common-utils';
import { EndretProgramperiodeEndringType, EndretProgramperiodeOppgave, OppgaveStatus } from '@navikt/ung-common';
import { getAppEnv } from '../../../../utils/appEnv';
import { useDeprOppgaveContext } from '../oppgavebekreftelse/DeprOppgaveContext';
import UtalelseForm from '../uttalelse-form/UtalelseForm';
import EndretSluttdatoOppgaveInfo from './parts/EndretSluttdatoOppgaveInfo';
import EndretStartdatoOppgaveInfo from './parts/EndretStartdatoOppgaveInfo';
import OppgaveInfoWrapper from './parts/OppgaveInfoWrapper';
import OppgaveKvittering from './parts/OppgaveKvittering';
import OppgaveUttalelse from './parts/OppgaveUttalelse';

interface Props {
    deltakelseId: string;
    oppgave: EndretProgramperiodeOppgave;
    deltakerNavn: string;
}

const EndretProgramperiodeOppgaveForm = ({ oppgave, deltakerNavn }: Props) => {
    const { visKvittering } = useDeprOppgaveContext();
    const navigate = useNavigate();
    const alertRef = useRef<HTMLDivElement>(null);

    const prevVisKvittering = usePrevious(visKvittering);

    useEffect(() => {
        if (visKvittering && !prevVisKvittering && alertRef.current) {
            alertRef.current.focus();
        }
    });

    const erLøst = oppgave.status !== OppgaveStatus.ULØST;

    const TilForsidenLenke = () => (
        <Box>
            <Button
                as="a"
                href="#"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate(getAppEnv()[EnvKey.PUBLIC_PATH]);
                }}
                variant="secondary"
                icon={<ChevronLeftIcon />}
                iconPosition="left">
                Tilbake til oversikten
            </Button>
        </Box>
    );

    const gjelderStartdato = oppgave.oppgavetypeData.endringType === EndretProgramperiodeEndringType.ENDRET_STARTDATO;

    return (
        <VStack gap="6">
            {oppgave.løstDato && !visKvittering && (
                <Box>
                    <Tag variant="success">Sendt inn {dateFormatter.full(oppgave.løstDato)}</Tag>
                </Box>
            )}
            <Heading level="1" size="large">
                {gjelderStartdato ? 'Ny startdato i ungdomsprogrammet' : 'Ny sluttdato i ungdomsprogrammet'}
            </Heading>

            {visKvittering ? (
                <>
                    <OppgaveKvittering ref={alertRef} />
                    <TilForsidenLenke />
                </>
            ) : (
                <VStack gap="6">
                    <OppgaveInfoWrapper løst={erLøst} svarfrist={oppgave.svarfrist} deltakerNavn={deltakerNavn}>
                        {gjelderStartdato && (
                            <EndretStartdatoOppgaveInfo endretDato={oppgave.oppgavetypeData.programperiode.fraOgMed} />
                        )}
                        {!gjelderStartdato && oppgave.oppgavetypeData.programperiode.tilOgMed && (
                            <EndretSluttdatoOppgaveInfo endretDato={oppgave.oppgavetypeData.programperiode.tilOgMed} />
                        )}
                    </OppgaveInfoWrapper>
                    {erLøst && oppgave.bekreftelse && (
                        <>
                            <OppgaveUttalelse
                                godtarSpørsmål="Forstår og godtar du at startdatoen din er endret"
                                bekreftelse={oppgave.bekreftelse}
                            />
                        </>
                    )}
                    {!erLøst ? (
                        <UtalelseForm oppgaveReferanse={oppgave.oppgaveReferanse} onSuccess={() => null} />
                    ) : (
                        <TilForsidenLenke />
                    )}
                </VStack>
            )}
        </VStack>
    );
};

export default EndretProgramperiodeOppgaveForm;
