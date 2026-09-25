import { VStack } from '@navikt/ds-react';
import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { isDevMode } from '@navikt/sif-common-env';
import { getIntlFormErrorHandler, YesOrNo } from '@navikt/sif-common-formik-ds';
import { VelgBarn_AnnetBarnValue } from '@navikt/sif-common-forms-ds';
import { FormLayout } from '@navikt/sif-common-ui';

import { InnvilgedeVedtak } from '../../../hooks/useInnvilgedeVedtakForRegistrerteBarn';
import { useAppIntl } from '../../../i18n';
import { BarnSammeAdresse } from '../../../types/BarnSammeAdresse';
import { SøkersRelasjonTilBarnet } from '../../../types/SøkersRelasjonTilBarnet';
import IkkeHøyereRisikoForFraværAlert from './alert/IkkeHøyereRisikoForFraværAlert';
import IkkeKroniskEllerFunksjonshemningAlert from './alert/IkkeKroniskEllerFuksjonshemningAlert';
import IkkeSammeAdresseAlert from './alert/IkkeSammeAdresseAlert';
import VedtakForBarnInfo from './alert/VedtakForBarnInfo';
import { omBarnetFormComponents } from './omBarnetFormComponents';
import { OmBarnetFormFields, OmBarnetFormValues } from './OmBarnetStep';
import { utledVedtakInfoForBarn } from './omBarnetStepUtils';
import AnnetBarnFnrSpørsmål from './spørsmål/AnnetBarnFnrSpørsmål';
import AnnetBarnFødselsdatoSpørsmål from './spørsmål/AnnetBarnFødselsdatoSpørsmål';
import AnnetBarnNavnSpørsmål from './spørsmål/AnnetBarnNavnSpørsmål';
import AnnetBarnRelasjonSpørsmål from './spørsmål/AnnetBarnRelasjonSpørsmål';
import BorSammenMedBarnetSpørsmål from './spørsmål/BorSammenMedBarnetSpørsmål';
import HøyereRisikoForFraværBeskrivelseSpørsmål from './spørsmål/HøyereRisikoForFraværBeskrivelseSpørsmål';
import HøyereRisikoForFraværSpørsmål from './spørsmål/HøyereRisikoForFraværSpørsmål';
import KroniskEllerFunksjonshemningSpørsmål from './spørsmål/KroniskEllerFunksjonshemningSpørsmål';
import RegistrertBarnSpørsmål from './spørsmål/RegistrertBarnSpørsmål';

interface Props {
    values: Partial<OmBarnetFormValues>;
    registrerteBarn: RegistrertBarn[];
    isSubmitting: boolean;
    innvilgedeVedtak: InnvilgedeVedtak;
    søker: Søker;
    onVelgAnnetBarn: () => void;
    onBack?: () => void;
}

const { Form } = omBarnetFormComponents;

const OmBarnetForm = ({ isSubmitting, registrerteBarn, values, innvilgedeVedtak, søker, onBack }: Props) => {
    const { intl, text } = useAppIntl();
    const {
        barnetSøknadenGjelder,
        kroniskEllerFunksjonshemming,
        sammeAdresse,
        søkersRelasjonTilBarnet,
        høyereRisikoForFravær,
    } = values;

    const valgtBarn = registrerteBarn.find((barn) => barn.aktørId === barnetSøknadenGjelder);

    const vedtakForValgtBarn = utledVedtakInfoForBarn(valgtBarn, innvilgedeVedtak);

    const visIkkeSammeAdresseAlert =
        sammeAdresse === BarnSammeAdresse.NEI && søkersRelasjonTilBarnet !== SøkersRelasjonTilBarnet.FOSTERFORELDER;

    const harIkkeBarn = registrerteBarn.length === 0;
    const søknadenGjelderEtAnnetBarn = values[OmBarnetFormFields.barnetSøknadenGjelder] === VelgBarn_AnnetBarnValue;

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'steg.omBarnet.validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            onBack={onBack}
            runDelayedFormValidation={true}
            submitDisabled={vedtakForValgtBarn !== undefined}>
            <FormLayout.Questions>
                {harIkkeBarn === false && (
                    <VStack gap="space-16">
                        <RegistrertBarnSpørsmål registrerteBarn={registrerteBarn} innvilgedeVedtak={innvilgedeVedtak} />
                        <div aria-live="polite">
                            {valgtBarn && vedtakForValgtBarn && (
                                <VedtakForBarnInfo barnetsFornavn={valgtBarn.fornavn} vedtak={vedtakForValgtBarn} />
                            )}
                        </div>
                    </VStack>
                )}
                {!vedtakForValgtBarn && (
                    <>
                        {(søknadenGjelderEtAnnetBarn || harIkkeBarn) && (
                            <FormLayout.Section title={text('steg.omBarnet.annetBarn.tittel')}>
                                <FormLayout.Questions>
                                    <AnnetBarnFødselsdatoSpørsmål />
                                    <AnnetBarnFnrSpørsmål søkersFnr={søker.fødselsnummer} allowHnr={isDevMode()} />
                                    <AnnetBarnNavnSpørsmål />
                                    <AnnetBarnRelasjonSpørsmål />
                                </FormLayout.Questions>
                            </FormLayout.Section>
                        )}
                        {(barnetSøknadenGjelder !== undefined || søknadenGjelderEtAnnetBarn || harIkkeBarn) && (
                            <FormLayout.Questions>
                                <BorSammenMedBarnetSpørsmål />
                                {visIkkeSammeAdresseAlert && (
                                    <FormLayout.QuestionRelatedMessage>
                                        <IkkeSammeAdresseAlert />
                                    </FormLayout.QuestionRelatedMessage>
                                )}

                                <KroniskEllerFunksjonshemningSpørsmål />
                                {kroniskEllerFunksjonshemming === YesOrNo.NO && (
                                    <FormLayout.QuestionRelatedMessage>
                                        <IkkeKroniskEllerFunksjonshemningAlert />
                                    </FormLayout.QuestionRelatedMessage>
                                )}

                                {kroniskEllerFunksjonshemming === YesOrNo.YES && (
                                    <>
                                        <HøyereRisikoForFraværSpørsmål />
                                        {høyereRisikoForFravær === YesOrNo.NO && (
                                            <FormLayout.QuestionRelatedMessage>
                                                <IkkeHøyereRisikoForFraværAlert />
                                            </FormLayout.QuestionRelatedMessage>
                                        )}
                                        {høyereRisikoForFravær === YesOrNo.YES && (
                                            <HøyereRisikoForFraværBeskrivelseSpørsmål />
                                        )}
                                    </>
                                )}
                            </FormLayout.Questions>
                        )}
                    </>
                )}
            </FormLayout.Questions>
        </Form>
    );
};

export default OmBarnetForm;
