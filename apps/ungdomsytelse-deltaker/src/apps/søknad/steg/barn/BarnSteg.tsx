import { Alert, BodyLong, Heading, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { FormLayout, RegistrerteBarnListeHeading } from '@navikt/sif-common-ui';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import AriaLiveRegion from '@shared/components/aria-live-region/AriaLiveRegion';
import { AppText, useAppIntl } from '@shared/i18n';
import getLenker from '@shared/utils/lenker';
import SøknadSteg from '@søknad/components/søknad-steg/SøknadSteg';
import SkjemaFooter from '@søknad/components/steg-skjema/SkjemaFooter';
import { useSøknadContext } from '@søknad/hooks/context/useSøknadContext';
import { useSøknadNavigation } from '@søknad/hooks/utils/useSøknadNavigation';
import { Spørsmål, Steg } from '@søknad/types';
import { useState } from 'react';

import BarnInfo from './BarnInfo';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

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
            <FormLayout.Guide>
                <AppText id="barnSteg.beskrivelse" />
            </FormLayout.Guide>

            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    handleOnSubmit();
                }}>
                <FormLayout.Questions>
                    <VStack gap="4">
                        <RegistrerteBarnListeHeading level="2" size="xsmall">
                            {text('barnSteg.registrerteBarn.tittel')}
                        </RegistrerteBarnListeHeading>

                        <BarnInfo barn={barn} />
                    </VStack>

                    <RadioGroup
                        legend={text(barn.length === 0 ? 'barnSteg.spørsmål.ingenBarn' : 'barnSteg.spørsmål.harBarn', {
                            antallBarn: barn.length,
                        })}
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
                        <FormLayout.QuestionRelatedMessage>
                            <Alert variant="info">
                                <Heading level="3" size="small" spacing>
                                    <AppText id="barnSteg.opplysninger.info.tittel" />
                                </Heading>
                                <BodyLong>
                                    <AppText
                                        id="barnSteg.opplysninger.info.text"
                                        values={{
                                            Lenke: (children) => (
                                                <ExternalLinkIcon href={getLenker().skatteetaten}>
                                                    {children}
                                                </ExternalLinkIcon>
                                            ),
                                        }}
                                    />
                                </BodyLong>
                            </Alert>
                        </FormLayout.QuestionRelatedMessage>
                    </AriaLiveRegion>

                    <SkjemaFooter
                        forrige={{
                            tittel: text('søknadApp.forrigeSteg.label'),
                            onClick: () => gotoSteg(Steg.KONTONUMMER),
                        }}
                        submit={{ tittel: text('søknadApp.nesteSteg.label'), erSendInn: false }}
                    />
                </FormLayout.Questions>
            </form>
        </SøknadSteg>
    );
};

export default BarnSteg;
