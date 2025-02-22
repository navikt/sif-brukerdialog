import {
    Alert,
    BodyShort,
    Box,
    Button,
    ExpansionCard,
    Heading,
    HStack,
    Radio,
    RadioGroup,
    ReadMore,
    Textarea,
    VStack,
} from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveEndretStartdato } from '@navikt/ung-common';
import BlueBox from '../../../../components/blue-box/BlueBox';
import Melding from '../melding/Melding';
import { useState } from 'react';
import { ClipboardCheckmarkIcon, PaperplaneIcon } from '@navikt/aksel-icons';

interface Props {
    oppgave: OppgaveEndretStartdato;
}

const EndretStartdatoOppgave = ({ oppgave }: Props) => {
    const [godkjenner, setGodkjenner] = useState<string>('');
    const [harKontaktetVeileder, setHarKontaktetVeileder] = useState<string>('');
    const nyStartdatoTekst = dateFormatter.dayDateMonthYear(oppgave.oppgavetypeData.nyStartdato);
    return (
        <BlueBox>
            <Heading level="2" size="medium" spacing={true}>
                Ny oppgave: Bekreft endret startdato
            </Heading>
            <VStack gap="6">
                <BodyShort>
                    Veileder har bedt deg bekrefte en endring for når du startet i ungdomsprogrammet. Startdatoen er
                    endret til{' '}
                    <BodyShort as="span" className="inline-block nowrap" weight="semibold">
                        {nyStartdatoTekst}
                    </BodyShort>
                    . Du må bekrefte at din deltakelse nå skal gjelde fra og med denne datoen.
                </BodyShort>

                {oppgave.svarfrist ? (
                    <Alert variant="info" inline>
                        Fristen din for å svare på er <strong>{dateFormatter.full(oppgave.svarfrist)}</strong>. Hvis du
                        ikke svarer, vil oppgaven løses automatisk ved at datoen endres til dato veileder har angitt.
                    </Alert>
                ) : null}
                <ExpansionCard aria-label="Demo med bare tittel" size="small">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title>
                            <HStack gap="2" align={'center'}>
                                <ClipboardCheckmarkIcon />
                                <Box>Åpne oppgave</Box>
                            </HStack>
                        </ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack gap="4">
                            {oppgave.oppgavetypeData.meldingFraVeileder ? (
                                <Melding
                                    tekst={oppgave.oppgavetypeData.meldingFraVeileder}
                                    avsender={oppgave.veilederReferanse}
                                />
                            ) : null}

                            <VStack gap="6" marginBlock="2 0">
                                <RadioGroup
                                    name="svar"
                                    legend={`Godkjenner du at startdato din for ungdomsprogrammet endres til ${nyStartdatoTekst}`}
                                    onChange={(value) => setGodkjenner(value)}
                                    description={
                                        <>
                                            <ReadMore header="Hva betyr dette for meg">
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed corporis
                                                quasi id fugiat eveniet quisquam quia quam voluptate officiis dolores
                                                quidem sunt velit, cum nemo, minima eligendi. Temporibus, dolores
                                                facere.
                                            </ReadMore>
                                        </>
                                    }
                                    value={godkjenner}>
                                    <Radio value="ja">Ja</Radio>
                                    <Radio value="nei">Nei</Radio>
                                </RadioGroup>
                                {godkjenner === 'nei' ? (
                                    <>
                                        <Alert variant="info">
                                            <BodyShort spacing={true}>
                                                Når du ikke ønsker å godkjenne denne endringen, bør du først ta kontakt
                                                med din veileder for å se om dere kan oppklare hvorfor du ikke ønsker å
                                                godkjenne.
                                            </BodyShort>
                                            <BodyShort>
                                                Hvis du allerede har vært i kontakt med din veileder om dette, kan du
                                                sende inn at du ikke godkjenner endringen, men du må gi en kort
                                                beskrivelse av hvorfor du ikke ønsker å godkjenne.
                                            </BodyShort>
                                        </Alert>

                                        <RadioGroup
                                            name="harKontaktetVeileder"
                                            legend="Har du hatt kontakt med veileder for å diskutere hvorfor du ikke ønsker å godkjenne denne endringen?"
                                            onChange={(value) => setHarKontaktetVeileder(value)}
                                            value={harKontaktetVeileder}>
                                            <Radio value="ja">Ja</Radio>
                                            <Radio value="nei">Nei</Radio>
                                        </RadioGroup>
                                        <Textarea
                                            label="Skriv en kort begrunnelse for hvorfor du ikke ønsker å godkjenne"
                                            maxLength={250}
                                        />
                                    </>
                                ) : null}
                            </VStack>
                            <HStack gap="4">
                                <Button
                                    variant="primary"
                                    type="button"
                                    icon={<PaperplaneIcon />}
                                    onClick={(evt) => {
                                        evt.preventDefault();
                                        evt.stopPropagation();
                                        alert('TODO');
                                    }}>
                                    Send svar
                                </Button>
                            </HStack>
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>
            </VStack>
        </BlueBox>
    );
};

export default EndretStartdatoOppgave;
