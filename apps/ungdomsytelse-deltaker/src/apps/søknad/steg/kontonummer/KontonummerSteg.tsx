import { Alert, BodyLong, BodyShort, GuidePanel, Heading, Link, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import AriaLiveRegion from '../../../../components/aria-live-region/AriaLiveRegion';
import SkjemaFooter from '../../components/steg-skjema/SkjemaFooter';
import SøknadSteg from '../../components/søknad-steg/SøknadSteg';
import { useSøknadContext } from '../../hooks/context/useSøknadContext';
import { useSøknadNavigation } from '../../hooks/utils/useSøknadNavigation';
import { Spørsmål, Steg } from '../../types';
import getLenker from '../../../../lenker';
import ExternalLink from '../../components/external-link/ExternalLink';

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
                    <GuidePanel>
                        For å få pengene inn på bankkontoen din, må du ha registrert kontonummeret ditt hos Nav.
                    </GuidePanel>
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
                                        <BodyShort spacing>
                                            Gå til{' '}
                                            <ExternalLink href={getLenker().personopplysninger}>
                                                personopplysninger på Min side
                                            </ExternalLink>{' '}
                                            for å endre bankkontonummeret ditt.
                                        </BodyShort>
                                        <BodyShort>
                                            Vi anbefaler at du endrer kontonummeret ditt før du sender inn søknaden,
                                            slik at pengene ikke blir forsinket.
                                        </BodyShort>
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
                                    Registrer bankkontonummeret ditt hos Nav slik at du får pengene utbetalt til rett
                                    konto. Gå til{' '}
                                    <Link href={getLenker().endreKontonummer}>personopplysninger på Min side</Link> for
                                    å legge inn kontonummeret ditt.
                                </BodyLong>
                                <BodyLong>
                                    Du kan fremdeles sende inn søknaden, men vi anbefaler at du legger inn kontonummeret
                                    med én gang slik at pengene ikke blir forsinket.
                                </BodyLong>
                            </Alert>
                        </>
                    )}
                    <SkjemaFooter submit={{ tittel: 'Neste steg', erSendInn: false }} />
                </VStack>
            </form>
        </SøknadSteg>
    );
};

export default KontonummerSteg;
