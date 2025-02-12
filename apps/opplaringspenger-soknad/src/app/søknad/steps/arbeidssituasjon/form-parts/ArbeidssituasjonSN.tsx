import InfoJobberNormaltTimerSN from './info/InfoJobberNormaltTimerSN';
import { Virksomhet } from '@navikt/sif-common-forms-ds';
import { DateRange, ValidationError, YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-validation';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { Alert, Heading, Link, VStack } from '@navikt/ds-react';
import VirksomhetInfoAndDialog from '@navikt/sif-common-forms-ds/src/forms/virksomhet/VirksomhetInfoAndDialog';
import { getJobberNormaltTimerValidator } from '../../../../utils/jobberNormaltTimerValidator';
import { getSelvstendigIPeriodeValidator } from '../../../../utils/selvstendigValidator';
import { AppText, useAppIntl } from '../../../../i18n';
import { FormLayout } from '@navikt/sif-common-ui';

export enum SelvstendigFormFields {
    harHattInntektSomSN = 'selvstendig.harHattInntektSomSN',
    harFlereVirksomheter = 'selvstendig.harFlereVirksomheter',
    virksomhet = 'selvstendig.virksomhet',
    arbeidsforhold = 'selvstendig.arbeidsforhold',
    jobberNormaltTimer = 'selvstendig.jobberNormaltTimer',
}

export interface SelvstendigFormData {
    harHattInntektSomSN?: YesOrNo;
    harFlereVirksomheter?: YesOrNo;
    virksomhet?: Virksomhet;
    jobberNormaltTimer?: string;
}

interface Props {
    formValues: SelvstendigFormData;
    urlSkatteetatenSN: string;
    søknadsperiode: DateRange;
}

const { YesOrNoQuestion, NumberInput } = getTypedFormComponents<
    SelvstendigFormFields,
    SelvstendigFormData,
    ValidationError
>();

const ArbeidssituasjonSN = ({ formValues, urlSkatteetatenSN, søknadsperiode }: Props) => {
    const { text } = useAppIntl();
    const { harHattInntektSomSN, virksomhet, harFlereVirksomheter, jobberNormaltTimer } = formValues;
    const søkerHarFlereVirksomheter = harFlereVirksomheter === YesOrNo.YES;
    const intlValues = {
        hvor: text('arbeidsforhold.part.som.SELVSTENDIG'),
        jobber: text('arbeidsforhold.part.jobber'),
    };

    return (
        <>
            <Heading level="2" size="medium">
                <AppText id="steg.arbeidssituasjon.sn.tittel" />
            </Heading>
            <VStack gap="3">
                <YesOrNoQuestion
                    name={SelvstendigFormFields.harHattInntektSomSN}
                    legend={text('selvstendig.harDuHattInntekt.spm')}
                    validate={getYesOrNoValidator()}
                    description={
                        <ExpandableInfo title={text('selvstendig.harDuHattInntekt.hjelpetekst.tittel')}>
                            <>
                                {text('selvstendig.harDuHattInntekt.hjelpetekst')}{' '}
                                <Link href={urlSkatteetatenSN} target="_blank">
                                    <AppText id="selvstendig.harDuHattInntekt.hjelpetekst.snSkatteetatenLenke" />
                                </Link>
                            </>
                        </ExpandableInfo>
                    }
                />

                {harHattInntektSomSN === YesOrNo.YES && (
                    <FormLayout.Panel>
                        <FormLayout.Questions>
                            <YesOrNoQuestion
                                name={SelvstendigFormFields.harFlereVirksomheter}
                                legend={text('selvstendig.harFlereVirksomheter.spm')}
                                validate={getYesOrNoValidator()}
                            />

                            {søkerHarFlereVirksomheter && (
                                <FormLayout.QuestionRelatedMessage>
                                    <Alert variant="info">
                                        <AppText id="selvstendig.veileder.flereAktiveVirksomheter" />
                                    </Alert>
                                </FormLayout.QuestionRelatedMessage>
                            )}

                            {(harFlereVirksomheter === YesOrNo.YES || harFlereVirksomheter === YesOrNo.NO) && (
                                <VirksomhetInfoAndDialog
                                    name={SelvstendigFormFields.virksomhet}
                                    harFlereVirksomheter={søkerHarFlereVirksomheter}
                                    labels={{
                                        infoTitle: virksomhet ? text('selvstendig.infoDialog.infoTittel') : undefined,
                                        editLabel: text('selvstendig.infoDialog.endreKnapp'),
                                        deleteLabel: text('selvstendig.infoDialog.fjernKnapp'),
                                        addLabel: text('selvstendig.infoDialog.registrerKnapp'),
                                        modalTitle: text('selvstendig.infoDialog.tittel'),
                                    }}
                                    validate={(value) => {
                                        if (getRequiredFieldValidator()(value) !== undefined) {
                                            return getRequiredFieldValidator()(value);
                                        }
                                        return getSelvstendigIPeriodeValidator(søknadsperiode, virksomhet);
                                    }}
                                />
                            )}
                            {virksomhet !== undefined && (
                                <NumberInput
                                    label={text(`sn.arbeidsforhold.spm`)}
                                    name={SelvstendigFormFields.jobberNormaltTimer}
                                    description={<InfoJobberNormaltTimerSN />}
                                    validate={getJobberNormaltTimerValidator(intlValues)}
                                    maxLength={5}
                                    value={jobberNormaltTimer ? jobberNormaltTimer || '' : ''}
                                />
                            )}
                        </FormLayout.Questions>{' '}
                    </FormLayout.Panel>
                )}
            </VStack>
        </>
    );
};

export default ArbeidssituasjonSN;
