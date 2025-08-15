import { Alert, BodyLong, BodyShort, GuidePanel, Heading, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
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
            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    handleOnSubmit();
                }}>
                <VStack gap="8">
                    <GuidePanel>
                        <AppText id="kontonummerSteg.beskrivelse" />
                    </GuidePanel>
                    {kontonummerInfo.harKontonummer === HarKontonummerEnum.JA && (
                        <VStack gap="4">
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
                            </AriaLiveRegion>
                        </VStack>
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
                    {kontonummerInfo.harKontonummer === HarKontonummerEnum.UKJENT && (
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
                </VStack>
            </form>
        </SøknadSteg>
    );
};

export default KontonummerSteg;
