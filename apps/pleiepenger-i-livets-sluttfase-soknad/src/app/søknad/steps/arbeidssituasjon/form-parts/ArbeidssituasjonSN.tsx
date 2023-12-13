import { FormattedMessage, useIntl } from 'react-intl';
import InfoJobberNormaltTimerSN from './info/InfoJobberNormaltTimerSN';
import { Virksomhet } from '@navikt/sif-common-forms-ds';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { DateRange, ValidationError, YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { Alert, Heading, Link } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import VirksomhetInfoAndDialog from '@navikt/sif-common-forms-ds/src/forms/virksomhet/VirksomhetInfoAndDialog';
import { getJobberNormaltTimerValidator } from '../../../../utils/jobberNormaltTimerValidator';
import { getSelvstendigIPeriodeValidator } from '../../../../utils/selvstendigValidator';

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
    const intl = useIntl();
    const { harHattInntektSomSN, virksomhet, harFlereVirksomheter, jobberNormaltTimer } = formValues;
    const søkerHarFlereVirksomheter = harFlereVirksomheter === YesOrNo.YES;
    const intlValues = {
        hvor: intlHelper(intl, 'arbeidsforhold.part.som.SELVSTENDIG'),
        jobber: intlHelper(intl, 'arbeidsforhold.part.jobber'),
    };

    return (
        <>
            <Heading level="2" size="large">
                <FormattedMessage id="steg.arbeidssituasjon.sn.tittel" />
            </Heading>
            <Block margin="l">
                <YesOrNoQuestion
                    name={SelvstendigFormFields.harHattInntektSomSN}
                    legend={intlHelper(intl, 'selvstendig.harDuHattInntekt.spm')}
                    validate={getYesOrNoValidator()}
                    description={
                        <ExpandableInfo title={intlHelper(intl, 'selvstendig.harDuHattInntekt.hjelpetekst.tittel')}>
                            <>
                                {intlHelper(intl, 'selvstendig.harDuHattInntekt.hjelpetekst')}{' '}
                                <Link href={urlSkatteetatenSN} target="_blank">
                                    <FormattedMessage id="selvstendig.harDuHattInntekt.hjelpetekst.snSkatteetatenLenke" />
                                </Link>
                            </>
                        </ExpandableInfo>
                    }
                />
            </Block>
            {harHattInntektSomSN === YesOrNo.YES && (
                <FormBlock margin="l">
                    <YesOrNoQuestion
                        name={SelvstendigFormFields.harFlereVirksomheter}
                        legend={intlHelper(intl, 'selvstendig.harFlereVirksomheter.spm')}
                        validate={getYesOrNoValidator()}
                    />

                    {søkerHarFlereVirksomheter && (
                        <FormBlock>
                            <Alert variant="info">
                                <FormattedMessage id="selvstendig.veileder.flereAktiveVirksomheter" />
                            </Alert>
                        </FormBlock>
                    )}

                    {(harFlereVirksomheter === YesOrNo.YES || harFlereVirksomheter === YesOrNo.NO) && (
                        <FormBlock>
                            <VirksomhetInfoAndDialog
                                name={SelvstendigFormFields.virksomhet}
                                harFlereVirksomheter={søkerHarFlereVirksomheter}
                                labels={{
                                    infoTitle: virksomhet
                                        ? intlHelper(intl, 'selvstendig.infoDialog.infoTittel')
                                        : undefined,
                                    editLabel: intlHelper(intl, 'selvstendig.infoDialog.endreKnapp'),
                                    deleteLabel: intlHelper(intl, 'selvstendig.infoDialog.fjernKnapp'),
                                    addLabel: intlHelper(intl, 'selvstendig.infoDialog.registrerKnapp'),
                                    modalTitle: intlHelper(intl, 'selvstendig.infoDialog.tittel'),
                                }}
                                validate={(value) => {
                                    if (getRequiredFieldValidator()(value) !== undefined) {
                                        return getRequiredFieldValidator()(value);
                                    }
                                    return getSelvstendigIPeriodeValidator(søknadsperiode, virksomhet);
                                }}
                            />
                        </FormBlock>
                    )}
                    {virksomhet !== undefined && (
                        <FormBlock>
                            <FormBlock>
                                <NumberInput
                                    label={intlHelper(intl, `sn.arbeidsforhold.spm`)}
                                    name={SelvstendigFormFields.jobberNormaltTimer}
                                    description={<InfoJobberNormaltTimerSN />}
                                    validate={getJobberNormaltTimerValidator(intlValues)}
                                    value={jobberNormaltTimer ? jobberNormaltTimer || '' : ''}
                                />
                            </FormBlock>
                        </FormBlock>
                    )}
                </FormBlock>
            )}
        </>
    );
};

export default ArbeidssituasjonSN;
