import { Alert, BodyLong, Heading, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import AriaLiveRegion from '../../../../components/aria-live-region/AriaLiveRegion';
import SkjemaFooter from '../../components/steg-skjema/SkjemaFooter';
import SøknadSteg from '../../components/søknad-steg/SøknadSteg';
import { useSøknadContext } from '../../hooks/context/useSøknadContext';
import { useSøknadNavigation } from '../../hooks/utils/useSøknadNavigation';
import { Spørsmål, Steg } from '../../types';

const KontonummerSteg = () => {
    const { setSpørsmålSvar, svar, kontonummer } = useSøknadContext();
    const { gotoSteg } = useSøknadNavigation();

    const infoStemmer = svar[Spørsmål.KONTONUMMER];
    const [error, setError] = useState<string | undefined>(undefined);

    const harKontonummer = kontonummer !== undefined;

    const handleOnSubmit = () => {
        if (harKontonummer) {
            const err = getYesOrNoValidator()(infoStemmer);
            if (err) {
                setError('Du må svare på spørsmålet');
                return;
            }
            setError(undefined);
        }
        gotoSteg(Steg.BARN);
    };

    return (
        <SøknadSteg tittel="Kontonummer for utbetaling" steg={Steg.KONTONUMMER}>
            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    handleOnSubmit();
                }}>
                <VStack gap="8">
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
                                        setSpørsmålSvar(Spørsmål.KONTONUMMER, value);
                                    }}>
                                    <Radio value={YesOrNo.YES} checked={infoStemmer === YesOrNo.YES}>
                                        Ja
                                    </Radio>
                                    <Radio value={YesOrNo.NO} checked={infoStemmer === YesOrNo.NO}>
                                        Nei
                                    </Radio>
                                </RadioGroup>
                                <AriaLiveRegion visible={infoStemmer === YesOrNo.NO}>
                                    <Alert variant="info">
                                        <BodyLong spacing>
                                            Gå til personopplysninger på min side for å endre kontonummer.
                                        </BodyLong>
                                        <BodyLong>
                                            Vi anbefaler å endre kontonummer før du sender inn søknaden for å unngå
                                            utbetaling til feil konto.
                                        </BodyLong>
                                    </Alert>
                                </AriaLiveRegion>
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
                    <SkjemaFooter
                        forrige={{ tittel: 'Forrige steg', onClick: () => gotoSteg(Steg.BARN) }}
                        submit={{ tittel: 'Neste steg', erSendInn: false }}
                    />
                </VStack>
            </form>
        </SøknadSteg>
    );
};

export default KontonummerSteg;
