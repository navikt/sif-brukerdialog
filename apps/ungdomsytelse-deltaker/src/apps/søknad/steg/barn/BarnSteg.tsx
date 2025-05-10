import { Alert, BodyLong, GuidePanel, Heading, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import AriaLiveRegion from '../../../../components/aria-live-region/AriaLiveRegion';
import SkjemaFooter from '../../components/steg-skjema/SkjemaFooter';
import SøknadSteg from '../../components/søknad-steg/SøknadSteg';
import { useSøknadContext } from '../../hooks/context/useSøknadContext';
import { useSøknadNavigation } from '../../hooks/utils/useSøknadNavigation';
import { Spørsmål, Steg } from '../../types';
import BarnInfo from './BarnInfo';
import RegistrerteBarnListeHeading from '@navikt/sif-common-ui/src/components/registrerte-barn-liste/RegistrerteBarnListeHeading';
import ExternalLink from '../../components/external-link/ExternalLink';
import getLenker from '../../../../utils/lenker';

export const getBarnSpørsmål = (antallBarn: number): string => {
    if (antallBarn === 0) {
        return 'Stemmer det at du ikke har barn';
    }
    if (antallBarn === 1) {
        return 'Stemmer informasjonen om barnet?';
    }
    return 'Stemmer informasjonen om barna?';
};

const BarnSteg = () => {
    const { setSpørsmålSvar, svar, barn } = useSøknadContext();
    const { gotoSteg } = useSøknadNavigation();

    const infoStemmer = svar[Spørsmål.BARN];
    const [error, setError] = useState<string | undefined>(undefined);

    const handleOnSubmit = () => {
        const err = getYesOrNoValidator()(infoStemmer);
        if (err) {
            setError('Du må svare på spørsmålet');
            return;
        }
        setError(undefined);
        gotoSteg(Steg.OPPSUMMERING);
    };

    return (
        <SøknadSteg tittel="Barn" steg={Steg.BARN}>
            <VStack gap="8">
                <GuidePanel>Hvis du deltar i ungdomsprogrammet og har barn, har du rett på et barnetillegg.</GuidePanel>

                <form
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        handleOnSubmit();
                    }}>
                    <VStack gap="8">
                        <VStack gap="4">
                            <RegistrerteBarnListeHeading level="2" size="xsmall">
                                Barn vi har registrert på deg:
                            </RegistrerteBarnListeHeading>

                            <BarnInfo barn={barn} />
                        </VStack>
                        <VStack gap="4">
                            <RadioGroup
                                name="barnOk"
                                legend={getBarnSpørsmål(barn.length)}
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
                            <AriaLiveRegion visible={infoStemmer === YesOrNo.NO}>
                                <Alert variant="info">
                                    <Heading level="3" size="small" spacing>
                                        Vi henter opplysninger fra folkeregisteret
                                    </Heading>
                                    <BodyLong>
                                        Du må være registrert som forelder med foreldreansvar i Folkeregisteret for å ha
                                        rett på barnetillegg. Hvis du mener opplysningene fra Folkeregisteret er feil,
                                        må du ta{' '}
                                        <ExternalLink href={getLenker().skatteetaten}>
                                            kontakt med Skatteetaten
                                        </ExternalLink>
                                        . Hos Skatteetaten kan du registrere foreldreansvar.
                                    </BodyLong>
                                </Alert>
                            </AriaLiveRegion>
                        </VStack>
                        <SkjemaFooter
                            forrige={{ tittel: 'Forrige steg', onClick: () => gotoSteg(Steg.KONTONUMMER) }}
                            submit={{ tittel: 'Neste steg', erSendInn: false }}
                        />
                    </VStack>
                </form>
            </VStack>
        </SøknadSteg>
    );
};

export default BarnSteg;
