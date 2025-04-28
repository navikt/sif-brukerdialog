import { Alert, BodyLong, Heading, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import SøknadSteg from '../../components/søknad-steg/SøknadSteg';
import { Steg } from '../../types/Steg';
import { useDeltakerContext } from '../../../../context/DeltakerContext';
import { useState } from 'react';
import SkjemaFooter from '../../components/steg-skjema/SkjemaFooter';
import { Spørsmål, useSøknadContext } from '../../context/søknadContext';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { getYesOrNoValidator } from '@navikt/sif-validation';

const KontonummerSteg = () => {
    const { kontonummer } = useDeltakerContext();
    const { oppdaterSvar, setAktivtSteg, svar } = useSøknadContext();
    const [infoStemmer, setInfoStemmer] = useState<YesOrNo>(svar[Spørsmål.KONTONUMMER] || YesOrNo.UNANSWERED);
    const [error, setError] = useState<string | undefined>(undefined);

    const harKontonummer = kontonummer !== undefined && kontonummer !== null;

    const handleOnSubmit = () => {
        if (harKontonummer) {
            const error = getYesOrNoValidator()(infoStemmer);
            if (error) {
                setError('Du må svare på spørsmålet');
                return;
            }
            setError(undefined);
            oppdaterSvar(Spørsmål.KONTONUMMER, infoStemmer);
            return;
        }
        setAktivtSteg(Steg.OPPSUMMERING);
    };

    return (
        <SøknadSteg tittel="Kontonummer for utbetaling" steg={Steg.OPPSTART}>
            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    handleOnSubmit();
                }}>
                <VStack gap="10" marginBlock="4 0">
                    {harKontonummer ? (
                        <>
                            <VStack gap="4">
                                <RadioGroup
                                    name="barnOk"
                                    legend={`Er kontonummeret ditt ${kontonummer}?`}
                                    error={error}
                                    value={infoStemmer}
                                    onChange={(value: YesOrNo) => {
                                        setError(undefined);
                                        setInfoStemmer(value);
                                    }}>
                                    <Radio value={YesOrNo.YES} checked={infoStemmer === YesOrNo.YES}>
                                        Ja
                                    </Radio>
                                    <Radio value={YesOrNo.NO} checked={infoStemmer === YesOrNo.NO}>
                                        Nei
                                    </Radio>
                                </RadioGroup>
                                {infoStemmer === YesOrNo.NO && (
                                    <Alert variant="info">
                                        <BodyLong spacing>
                                            Gå til personopplysninger på min side for å endre kontonummer.
                                        </BodyLong>
                                        <BodyLong>
                                            Vi anbefaler å endre kontonummer før du sender inn søknaden for å unngå
                                            utbetaling til feil konto.
                                        </BodyLong>
                                    </Alert>
                                )}
                            </VStack>
                        </>
                    ) : (
                        <>
                            <Alert variant="warning">
                                <Heading level="3" size="small" spacing>
                                    Du har ikke registrert kontonummer hos oss
                                </Heading>
                                <BodyLong spacing>
                                    For å få utbetalt penger til rett konto må du registrere kontonummer hos oss. Gå til
                                    personopplysninger på min side for å legge inn kontonummeret ditt.
                                </BodyLong>
                                <BodyLong>
                                    Du kan fremdeles sende inn søknaden, men vi anbefaler å legge inn kontonummer med en
                                    gang for å unngå forsinkelser i utbetalingen.
                                </BodyLong>
                            </Alert>
                        </>
                    )}
                </VStack>
                <SkjemaFooter
                    forrige={{ tittel: 'Forrige steg', onClick: () => setAktivtSteg(Steg.BARN) }}
                    neste={{ tittel: 'Neste steg', erSendInn: false, onClick: handleOnSubmit }}
                />
            </form>
        </SøknadSteg>
    );
};

export default KontonummerSteg;
