import { Alert, BodyLong, BodyShort, GuidePanel, Heading, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import SøknadSteg from '../../components/søknad-steg/SøknadSteg';
import { Steg } from '../../types/Steg';
import { useState } from 'react';
import SkjemaFooter from '../../components/steg-skjema/SkjemaFooter';
import { Spørsmål, useSøknadContext } from '../../context/søknadContext';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import BarnInfo from './BarnInfo';

const BarnSteg = () => {
    const { oppdaterSvar, setAktivtSteg: setAktivtSteg, svar, barn } = useSøknadContext();

    const harBarn = barn.length > 0;

    const [infoStemmer, setInfoStemmer] = useState<YesOrNo>(svar[Spørsmål.BARN] || YesOrNo.UNANSWERED);
    const [error, setError] = useState<string | undefined>(undefined);

    const handleOnSubmit = () => {
        const error = getYesOrNoValidator()(infoStemmer);
        if (error) {
            setError('Du må svare på spørsmålet');
            return;
        }
        setError(undefined);
        oppdaterSvar(Spørsmål.BARN, infoStemmer);
        setAktivtSteg(Steg.KONTONUMMER);
    };

    return (
        <SøknadSteg tittel="Barn" steg={Steg.BARN}>
            <GuidePanel>
                Hvis du som deltaker i ungdomsprogrammet forsørger barn, har du rett på ett barnetillegg.
            </GuidePanel>

            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    handleOnSubmit();
                }}>
                <VStack gap="10" marginBlock="8 0">
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
                </VStack>
                <SkjemaFooter
                    forrige={{ tittel: 'Forrige steg', onClick: () => setAktivtSteg(Steg.OPPSTART) }}
                    neste={{ tittel: 'Neste steg', erSendInn: false, onClick: handleOnSubmit }}
                />
            </form>
        </SøknadSteg>
    );
};

export default BarnSteg;
