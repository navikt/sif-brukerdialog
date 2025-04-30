import { Alert, BodyLong, BodyShort, GuidePanel, Heading, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import SøknadSteg from '../../components/søknad-steg/SøknadSteg';
import { Steg } from '../../types/Steg';
import { useState } from 'react';
import SkjemaFooter from '../../components/steg-skjema/SkjemaFooter';
import { Spørsmål, useSøknadContext } from '../../context/søknadContext';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import BarnInfo from './BarnInfo';
import { useSøknadNavigation } from '../../hooks/useSøknadNavigation';

const BarnSteg = () => {
    const { setSpørsmålSvar, svar, barn } = useSøknadContext();
    const { gotoSteg } = useSøknadNavigation();

    const harBarn = barn.length > 0;

    const infoStemmer = svar[Spørsmål.BARN];
    const [error, setError] = useState<string | undefined>(undefined);

    const handleOnSubmit = () => {
        const err = getYesOrNoValidator()(infoStemmer);
        if (err) {
            setError('Du må svare på spørsmålet');
            return;
        }
        setError(undefined);
        gotoSteg(Steg.KONTONUMMER);
    };

    return (
        <SøknadSteg tittel="Barn" steg={Steg.BARN}>
            <VStack gap="8">
                <GuidePanel>
                    Hvis du som deltaker i ungdomsprogrammet forsørger barn, har du rett på ett barnetillegg.
                </GuidePanel>

                <form
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        handleOnSubmit();
                    }}>
                    <VStack gap="8">
                        <VStack gap="4">
                            <BodyShort weight="semibold">Barn vi har registrert på deg:</BodyShort>
                            <BarnInfo barn={barn} />
                        </VStack>
                        <VStack gap="4">
                            <RadioGroup
                                name="barnOk"
                                legend={harBarn ? 'Stemmer informasjonen om barn?' : 'Stemmer det at du ikke har barn'}
                                error={error}
                                value={infoStemmer}
                                onChange={(value: YesOrNo) => {
                                    setError(undefined);
                                    setSpørsmålSvar(Spørsmål.BARN, value);
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
                                    <Heading level="3" size="small" spacing>
                                        Vi henter opplysninger fra folkeregisteret
                                    </Heading>
                                    <BodyLong>
                                        Du må være registrert som forelder med foreldreansvar i Folkeregisteret for å ha
                                        rett på barnetillegg. Mener du opplysningene er feil, må du ta kontakt med
                                        Skatteetaten hvor du kan registrere foreldreansvar.
                                    </BodyLong>
                                </Alert>
                            )}
                        </VStack>
                        <SkjemaFooter
                            forrige={{ tittel: 'Forrige steg', onClick: () => gotoSteg(Steg.OPPSTART) }}
                            submit={{ tittel: 'Neste steg', erSendInn: false }}
                        />
                    </VStack>
                </form>
            </VStack>
        </SøknadSteg>
    );
};

export default BarnSteg;
