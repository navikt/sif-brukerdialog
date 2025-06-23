import { Alert, BodyLong, GuidePanel, Heading, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import RegistrerteBarnListeHeading from '@navikt/sif-common-ui/src/components/registrerte-barn-liste/RegistrerteBarnListeHeading';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import AriaLiveRegion from '../../../../components/aria-live-region/AriaLiveRegion';
import { AppText, useAppIntl } from '../../../../i18n';
import getLenker from '../../../../utils/lenker';
import ExternalLink from '../../components/external-link/ExternalLink';
import SkjemaFooter from '../../components/steg-skjema/SkjemaFooter';
import SøknadSteg from '../../components/søknad-steg/SøknadSteg';
import { useSøknadContext } from '../../hooks/context/useSøknadContext';
import { useSøknadNavigation } from '../../hooks/utils/useSøknadNavigation';
import { Spørsmål, Steg } from '../../types';
import BarnInfo from './BarnInfo';

const BarnSteg = () => {
    const { text } = useAppIntl();
    const { setSpørsmålSvar, svar, barn } = useSøknadContext();
    const { gotoSteg } = useSøknadNavigation();

    const infoStemmer = svar[Spørsmål.BARN];
    const [error, setError] = useState<string | undefined>(undefined);

    const handleOnSubmit = () => {
        const err = getYesOrNoValidator()(infoStemmer);
        if (err) {
            setError(text('barnSteg.validering.ikkeSvart'));
            return;
        }
        setError(undefined);
        gotoSteg(Steg.OPPSUMMERING);
    };

    return (
        <SøknadSteg tittel={text('barnSteg.tittel')} steg={Steg.BARN}>
            <VStack gap="8">
                <GuidePanel>
                    <AppText id="barnSteg.beskrivelse" />
                </GuidePanel>

                <form
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        handleOnSubmit();
                    }}>
                    <VStack gap="8">
                        <VStack gap="4">
                            <RegistrerteBarnListeHeading level="2" size="xsmall">
                                {text('barnSteg.registrerteBarn.tittel')}
                            </RegistrerteBarnListeHeading>

                            <BarnInfo barn={barn} />
                        </VStack>
                        <VStack gap="4">
                            <RadioGroup
                                legend={text(
                                    barn.length === 0 ? 'barnSteg.spørsmål.ingenBarn' : 'barnSteg.spørsmål.harBarn',
                                    {
                                        antallBarn: barn.length,
                                    },
                                )}
                                error={error}
                                value={infoStemmer}
                                onChange={(value: YesOrNo) => {
                                    setError(undefined);
                                    setSpørsmålSvar(Spørsmål.BARN, value);
                                }}>
                                <Radio value={YesOrNo.YES} checked={infoStemmer === YesOrNo.YES}>
                                    <AppText id="barnSteg.barnStemmer.ja.label" />
                                </Radio>
                                <Radio value={YesOrNo.NO} checked={infoStemmer === YesOrNo.NO}>
                                    <AppText id="barnSteg.barnStemmer.nei.label" />
                                </Radio>
                            </RadioGroup>
                            <AriaLiveRegion visible={infoStemmer === YesOrNo.NO}>
                                <Alert variant="info">
                                    <Heading level="3" size="small" spacing>
                                        <AppText id="barnSteg.opplysninger.info.tittel" />
                                    </Heading>
                                    <BodyLong>
                                        <AppText
                                            id="barnSteg.opplysninger.info.text"
                                            values={{
                                                Lenke: (children) => (
                                                    <ExternalLink href={getLenker().skatteetaten}>
                                                        {children}
                                                    </ExternalLink>
                                                ),
                                            }}
                                        />
                                    </BodyLong>
                                </Alert>
                            </AriaLiveRegion>
                        </VStack>
                        <SkjemaFooter
                            forrige={{
                                tittel: text('søknadApp.forrigeSteg.label'),
                                onClick: () => gotoSteg(Steg.KONTONUMMER),
                            }}
                            submit={{ tittel: text('søknadApp.nesteSteg.label'), erSendInn: false }}
                        />
                    </VStack>
                </form>
            </VStack>
        </SøknadSteg>
    );
};

export default BarnSteg;
