import { Alert, BodyShort, Button, HStack, Radio, RadioGroup, ReadMore, Textarea, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveEndretSluttdato } from '@navikt/ung-common';
import Melding from '../melding/Melding';
import { useState } from 'react';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import OppgaveLayout from './OppgaveLayout';

interface Props {
    oppgave: OppgaveEndretSluttdato;
    opprinneligSluttdato?: Date;
}

const EndretSluttdatoOppgave = ({ oppgave, opprinneligSluttdato }: Props) => {
    const [godkjenner, setGodkjenner] = useState<string>('');
    const [harKontaktetVeileder, setHarKontaktetVeileder] = useState<string>('');
    const nySluttdatoTekst = dateFormatter.dayDateMonthYear(oppgave.oppgavetypeData.nySluttdato);
    const opprinneligSluttdatoTekst = opprinneligSluttdato
        ? dateFormatter.dayDateMonthYear(opprinneligSluttdato)
        : 'å ikke være bestemt';
    return (
        <OppgaveLayout
            tittel="Godkjenn endret sluttdato"
            beskrivelse={
                <BodyShort>
                    Veileder har bedt deg godkjenne en endring for når du går ut av ungdoms&shy;programmet. Sluttdatoen
                    er endret til{' '}
                    <BodyShort as="span" className="inline-block nowrap" weight="semibold">
                        {nySluttdatoTekst}
                    </BodyShort>{' '}
                    fra {opprinneligSluttdatoTekst}.
                </BodyShort>
            }>
            <VStack gap="4">
                {oppgave.oppgavetypeData.meldingFraVeileder ? (
                    <Melding tekst={oppgave.oppgavetypeData.meldingFraVeileder} avsender={oppgave.veilederReferanse} />
                ) : null}

                <VStack gap="6" marginBlock="2 0">
                    <RadioGroup
                        name="svar"
                        legend={`Godkjenner du at sluttdato endres til ${nySluttdatoTekst}?`}
                        onChange={(value) => setGodkjenner(value)}
                        description={
                            <>
                                <ReadMore header="Hva betyr dette for meg">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed corporis quasi id
                                    fugiat eveniet quisquam quia quam voluptate officiis dolores quidem sunt velit, cum
                                    nemo, minima eligendi. Temporibus, dolores facere.
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
                                    Når du ikke ønsker å godkjenne, bør du først ta kontakt med veileder for å se om
                                    dere kan oppklare hvorfor du ikke ønsker å godkjenne.
                                </BodyShort>
                                <BodyShort>
                                    Hvis du allerede har vært i kontakt med din veileder om dette, kan du sende inn at
                                    du ikke godkjenner endringen, men du må gi en kort beskrivelse av hvorfor du ikke
                                    ønsker å godkjenne.
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
        </OppgaveLayout>
    );
};

export default EndretSluttdatoOppgave;
