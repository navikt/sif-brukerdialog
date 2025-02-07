import { isDevMode } from '@navikt/sif-common-env';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { FormLayout } from '@navikt/sif-common-ui';
import { InnvilgedeVedtak } from '../../../hooks/useInnvilgedeVedtakForRegistrerteBarn';
import { AppText, useAppIntl } from '../../../i18n';
import { BarnSammeAdresse } from '../../../types/BarnSammeAdresse';
import { SøkersRelasjonTilBarnet } from '../../../types/SøkersRelasjonTilBarnet';
import IkkeHøyereRisikoForFraværAlert from './alert/IkkeHøyereRisikoForFraværAlert';
import IkkeKroniskEllerFunksjonshemningAlert from './alert/IkkeKroniskEllerFuksjonshemningAlert';
import IkkeSammeAdresseAlert from './alert/IkkeSammeAdresseAlert';
import TrengerIkkeSøkeForBarnAlert from './alert/TrengerIkkeSøkeForBarnAlert';
import { omBarnetFormComponents } from './omBarnetFormComponents';
import { OmBarnetFormValues } from './OmBarnetStep';
import AnnetBarnFnrSpørsmål from './spørsmål/AnnetBarnFnrSpørsmål';
import AnnetBarnFødselsdatoSpørsmål from './spørsmål/AnnetBarnFødselsdatoSpørsmål';
import AnnetBarnNavnSpørsmål from './spørsmål/AnnetBarnNavnSpørsmål';
import AnnetBarnRelasjonSpørsmål from './spørsmål/AnnetBarnRelasjonSpørsmål';
import BorSammenMedBarnetSpørsmål from './spørsmål/BorSammenMedBarnetSpørsmål';
import HøyereRisikoForFraværBeskrivelseSpørsmål from './spørsmål/HøyereRisikoForFraværBeskrivelseSpørsmål';
import HøyereRisikoForFraværSpørsmål from './spørsmål/HøyereRisikoForFraværSpørsmål';
import KroniskEllerFunksjonshemningSpørsmål from './spørsmål/KroniskEllerFunksjonshemningSpørsmål';
import RegistrertBarnSpørsmål from './spørsmål/RegistrertBarnSpørsmål';
import { RegistrertBarn, Søker } from '@navikt/sif-common-api';

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

const OmBarnetForm = ({
    isSubmitting,
    registrerteBarn,
    values,
    innvilgedeVedtak,
    søker,
    onBack,
    onVelgAnnetBarn,
}: Props) => {
    const { intl } = useAppIntl();
    const {
        barnetSøknadenGjelder,
        søknadenGjelderEtAnnetBarn,
        kroniskEllerFunksjonshemming,
        sammeAdresse,
        søkersRelasjonTilBarnet,
        høyereRisikoForFravær,
    } = values;

    const valgtBarn = registrerteBarn.find((barn) => barn.aktørId === barnetSøknadenGjelder);
    const vedtakForValgtBarn = innvilgedeVedtak[barnetSøknadenGjelder || ''];
    const harInnvilgetVedtakForValgtBarn = valgtBarn && vedtakForValgtBarn?.harInnvilgedeBehandlinger;

    const visIkkeSammeAdresseAlert =
        sammeAdresse === BarnSammeAdresse.NEI && søkersRelasjonTilBarnet !== SøkersRelasjonTilBarnet.FOSTERFORELDER;

    const harIkkeBarn = registrerteBarn.length === 0;

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'steg.omBarnet.validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            onBack={onBack}
            runDelayedFormValidation={true}
            submitDisabled={harInnvilgetVedtakForValgtBarn}>
            <FormLayout.Questions>
                {harIkkeBarn === false && (
                    <>
                        <RegistrertBarnSpørsmål
                            registrerteBarn={registrerteBarn}
                            søknadenGjelderEtAnnetBarn={søknadenGjelderEtAnnetBarn}
                            onAnnetBarnSelected={onVelgAnnetBarn}
                        />
                        {harInnvilgetVedtakForValgtBarn && (
                            <FormLayout.QuestionRelatedMessage>
                                <TrengerIkkeSøkeForBarnAlert barnetsFornavn={valgtBarn.fornavn} />
                            </FormLayout.QuestionRelatedMessage>
                        )}
                    </>
                )}
                {harInnvilgetVedtakForValgtBarn !== true && (
                    <>
                        {(søknadenGjelderEtAnnetBarn || harIkkeBarn) && (
                            <FormLayout.Section>
                                <FormLayout.SectionHeading>
                                    <AppText id="steg.omBarnet.annetBarn.tittel" />
                                </FormLayout.SectionHeading>
                                <FormLayout.Questions>
                                    <AnnetBarnFnrSpørsmål søkersFnr={søker.fødselsnummer} allowHnr={isDevMode()} />
                                    <AnnetBarnNavnSpørsmål />
                                    <AnnetBarnFødselsdatoSpørsmål />
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
