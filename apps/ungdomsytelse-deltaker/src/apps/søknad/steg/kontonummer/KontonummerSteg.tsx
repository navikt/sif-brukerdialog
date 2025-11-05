import { Alert, BodyLong, BodyShort, Heading, Radio, RadioGroup } from '@navikt/ds-react';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { FormLayout } from '@navikt/sif-common-ui';
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

import ExternalLink from '../../../../components/external-link/ExternalLink';
import { HarKontonummerEnum } from '../oppsummering/oppsummeringUtils';

const KontonummerSteg = () => {
    const { text } = useAppIntl();
    const { setSpørsmålSvar, svar, kontonummerInfo } = useSøknadContext();
    const { gotoSteg } = useSøknadNavigation();

    const infoStemmer = svar[Spørsmål.KONTONUMMER];
    const [error, setError] = useState<string | undefined>(undefined);

    const handleOnSubmit = () => {
        if (kontonummerInfo.harKontonummer === HarKontonummerEnum.JA) {
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
        <SøknadSteg tittel={text('kontonummerSteg.tittel')} steg={Steg.KONTONUMMER}>
            <FormLayout.Guide>
                <AppText id="kontonummerSteg.beskrivelse" />
            </FormLayout.Guide>
            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    handleOnSubmit();
                }}>
                <FormLayout.Questions>
                    {kontonummerInfo.harKontonummer === HarKontonummerEnum.JA && (
                        <>
                            <RadioGroup
                                legend={text('kontonummerSteg.kontonummer.spm', {
                                    kontonummer: kontonummerInfo.formatertKontonummer,
                                })}
                                error={error}
                                value={infoStemmer}
                                onChange={(value: YesOrNo) => {
                                    setError(undefined);
                                    setSpørsmålSvar(Spørsmål.KONTONUMMER, value);
                                }}>
                                <Radio value={YesOrNo.YES} checked={infoStemmer === YesOrNo.YES}>
                                    <AppText id="kontonummerSteg.kontonummer.ja.label" />
                                </Radio>
                                <Radio value={YesOrNo.NO} checked={infoStemmer === YesOrNo.NO}>
                                    <AppText id="kontonummerSteg.kontonummer.nei.label" />
                                </Radio>
                            </RadioGroup>
                            <AriaLiveRegion visible={infoStemmer === YesOrNo.NO}>
                                <FormLayout.QuestionRelatedMessage>
                                    <Alert variant="info">
                                        <BodyShort spacing>
                                            <AppText
                                                id="kontonummerSteg.kontonummer.stemmerIkke.info"
                                                values={{
                                                    Lenke: (children) => (
                                                        <ExternalLink href={getLenker().personopplysninger}>
                                                            {children}
                                                        </ExternalLink>
                                                    ),
                                                }}
                                            />
                                        </BodyShort>
                                        <BodyShort>
                                            <AppText id="kontonummerSteg.kontonummer.stemmerIkke.info.2" />
                                        </BodyShort>
                                    </Alert>
                                </FormLayout.QuestionRelatedMessage>
                            </AriaLiveRegion>
                        </>
                    )}
                    {kontonummerInfo.harKontonummer === HarKontonummerEnum.NEI && (
                        <Alert variant="warning">
                            <Heading level="3" size="small" spacing>
                                <AppText id="kontonummerSteg.harIkkeKontonummer.info.1" />
                            </Heading>
                            <BodyLong spacing>
                                <AppText
                                    id="kontonummerSteg.harIkkeKontonummer.info.2"
                                    values={{
                                        Lenke: (children) => (
                                            <ExternalLink href={getLenker().endreKontonummer}>{children}</ExternalLink>
                                        ),
                                    }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <AppText id="kontonummerSteg.harIkkeKontonummer.info.3" />
                            </BodyLong>
                        </Alert>
                    )}
                    {kontonummerInfo.harKontonummer === HarKontonummerEnum.UVISST && (
                        <Alert variant="warning">
                            <Heading level="3" size="small" spacing>
                                <AppText id="kontonummerSteg.kontonummerInfoMangler.info.1" />
                            </Heading>
                            <BodyLong spacing>
                                <AppText
                                    id="kontonummerSteg.kontonummerInfoMangler.info.2"
                                    values={{
                                        Lenke: (children) => (
                                            <ExternalLink href={getLenker().endreKontonummer}>{children}</ExternalLink>
                                        ),
                                    }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <AppText id="kontonummerSteg.kontonummerInfoMangler.info.3" />
                            </BodyLong>
                        </Alert>
                    )}
                    <SkjemaFooter submit={{ tittel: text('søknadApp.nesteSteg.label'), erSendInn: false }} />
                </FormLayout.Questions>
            </form>
        </SøknadSteg>
    );
};

export default KontonummerSteg;
