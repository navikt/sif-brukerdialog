import { Alert, Checkbox, CheckboxGroup, FormSummary, VStack } from '@navikt/ds-react';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { ApiErrorAlert } from '@navikt/sif-common-query';
import { useSendSøknad } from '@shared/hooks/api/useSendSøknad';
import { useSøknadContext } from '@shared/hooks/context/useSøknadContext';
import { useSøknadNavigation } from '@shared/hooks/utils/useSøknadNavigation';
import { AppText, useAppIntl } from '@shared/i18n';
import { SøknadSkjemaId } from '@shared/types/SøknadSkjemaId';
import SøknadSteg from '@søknad/components/søknad-steg/SøknadSteg';
import SkjemaFooter from '@søknad/components/steg-skjema/SkjemaFooter';
import { Spørsmål, Steg } from '@søknad/types';
import { useState } from 'react';

import { useAnalyticsInstance } from '../../../analytics/analytics';
import BarnInfo from '../barn/BarnInfo';
import { buildSøknadFromSvar, HarKontonummerEnum } from './oppsummeringUtils';

const OppsummeringSteg = () => {
    const { text } = useAppIntl();
    const {
        søker,
        setSøknadSendt,
        kontonummerInfo,
        registrerteBarn,
        søknadsdata: { svar },
    } = useSøknadContext();
    const { gotoSteg, gotoKvittering } = useSøknadNavigation();
    const { logSkjemaFeilet } = useAnalyticsInstance();

    const [bekrefterOpplysninger, setBekrefterOpplysninger] = useState<boolean>(false);
    const [bekreftError, setBekreftError] = useState<string | undefined>();
    const { error, isPending, mutateAsync } = useSendSøknad();

    const søknad = buildSøknadFromSvar({
        svar,
        søkerNorskIdent: søker.fødselsnummer,
        kontonummerInfo,
    });

    const søknadError = søknad ? undefined : text('oppsummeringSteg.søknadIkkeGyldig');

    const handleOnSubmit = async () => {
        if (søknad) {
            setBekreftError(undefined);
            if (!bekrefterOpplysninger) {
                setBekreftError(text('oppsummeringSteg.bekreft.validering.bekreftIkkeValgt'));
                return;
            }
            try {
                await mutateAsync({ ...søknad, harBekreftetOpplysninger: bekrefterOpplysninger });
                setSøknadSendt();
                gotoKvittering();
            } catch {
                // Håndteres gjennom error objektet i useSendSøknad
                logSkjemaFeilet(SøknadSkjemaId.SØKNAD);
            }
        }
    };

    return (
        <SøknadSteg tittel={text('oppsummeringSteg.tittel')} steg={Steg.OPPSUMMERING}>
            <VStack gap="space-32">
                <VStack gap="space-16">
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">
                                <AppText id="søknad.tittel" />
                            </FormSummary.Heading>
                        </FormSummary.Header>
                    </FormSummary>
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">
                                <AppText id="oppsummeringSteg.kontonummer.tittel" />
                            </FormSummary.Heading>
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            {kontonummerInfo.harKontonummer === HarKontonummerEnum.JA && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText
                                            id="kontonummerSteg.kontonummer.spm"
                                            values={{ kontonummer: kontonummerInfo.formatertKontonummer }}
                                        />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        {svar[Spørsmål.KONTONUMMER] === YesOrNo.YES
                                            ? text('kontonummerSteg.kontonummer.ja.label')
                                            : text('kontonummerSteg.kontonummer.nei.label')}
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                            {kontonummerInfo.harKontonummer === HarKontonummerEnum.NEI && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="oppsummeringSteg.kontonummer.ingenKontonummer.tittel" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <AppText id="oppsummeringSteg.kontonummer.ingenKontonummer.tekst" />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                            {kontonummerInfo.harKontonummer === HarKontonummerEnum.UVISST && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="oppsummeringSteg.kontonummer.kontonummerInfoMangler.tittel" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <AppText id="oppsummeringSteg.kontonummer.kontonummerInfoMangler.tekst" />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                        </FormSummary.Answers>
                        <FormSummary.Footer>
                            <FormSummary.EditLink
                                href="#"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    evt.stopPropagation();
                                    gotoSteg(Steg.KONTONUMMER);
                                }}
                            />
                        </FormSummary.Footer>
                    </FormSummary>
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">
                                <AppText id="oppsummeringSteg.barn.tittel" />
                            </FormSummary.Heading>
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="barnSteg.registrerteBarn.tittel" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <BarnInfo barn={registrerteBarn} />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText
                                        id={
                                            registrerteBarn.length === 0
                                                ? 'barnSteg.spørsmål.ingenBarn'
                                                : 'barnSteg.spørsmål.harBarn'
                                        }
                                        values={{
                                            antallBarn: registrerteBarn.length,
                                        }}
                                    />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {svar[Spørsmål.BARN] === YesOrNo.YES
                                        ? text('barnSteg.barnStemmer.ja.label')
                                        : text('barnSteg.barnStemmer.nei.label')}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        </FormSummary.Answers>
                        <FormSummary.Footer>
                            <FormSummary.EditLink
                                href="#"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    evt.stopPropagation();
                                    gotoSteg(Steg.BARN);
                                }}
                            />
                        </FormSummary.Footer>
                    </FormSummary>
                </VStack>

                {søknadError ? <Alert variant="error">{søknadError}</Alert> : null}

                <form
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        setBekreftError(undefined);
                        handleOnSubmit();
                    }}>
                    <VStack gap="space-16">
                        <CheckboxGroup
                            name="bekrefterInnsending"
                            hideLegend={true}
                            legend={text('oppsummeringSteg.bekreft.hiddenLegend')}
                            error={bekreftError}>
                            <Checkbox
                                value="bekrefter"
                                onChange={(evt) => {
                                    setBekreftError(undefined);
                                    setBekrefterOpplysninger(evt.target.checked);
                                }}>
                                <AppText id="oppsummeringSteg.bekreft.tekst" />
                            </Checkbox>
                        </CheckboxGroup>

                        {error ? <ApiErrorAlert error={error} /> : null}
                        <SkjemaFooter
                            pending={isPending}
                            forrige={{
                                tittel: text('søknadApp.forrigeSteg.label'),
                                onClick: () => gotoSteg(Steg.BARN),
                            }}
                            submit={{
                                tittel: text('søknadApp.sendSøknad.label'),
                                disabled: !!søknadError,
                                erSendInn: true,
                            }}
                        />
                    </VStack>
                </form>
            </VStack>
        </SøknadSteg>
    );
};
export default OppsummeringSteg;
