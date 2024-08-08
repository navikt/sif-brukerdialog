import InfoJobberNormaltTimerAnsatt from './info/InfoJobberNormaltTimerAnsatt';
import { Arbeidsgiver } from '../../../../types/Arbeidsgiver';
import { DateRange, ValidationError, YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Alert, Heading } from '@navikt/ds-react';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { getJobberNormaltTimerValidator } from '../../../../utils/jobberNormaltTimerValidator';
import { AppText, useAppIntl } from '../../../../i18n';

export enum AnsattFormFields {
    arbeidsgiver = 'arbeidsgiver',
    jobberNormaltTimer = 'jobberNormaltTimer',
    erAnsatt = 'erAnsatt',
    sluttetFørSøknadsperiode = 'sluttetFørSøknadsperiode',
}

export interface AnsattFormData {
    arbeidsgiver: Arbeidsgiver;
    [AnsattFormFields.jobberNormaltTimer]?: string;
    [AnsattFormFields.erAnsatt]?: YesOrNo;
    [AnsattFormFields.sluttetFørSøknadsperiode]?: YesOrNo;
}

const { YesOrNoQuestion, NumberInput } = getTypedFormComponents<AnsattFormFields, AnsattFormData, ValidationError>();

interface Props {
    arbeidsforhold: AnsattFormData;
    parentFieldName: string;
    søknadsperiode: DateRange;
}

const ArbeidssituasjonAnsatt = ({ arbeidsforhold, parentFieldName, søknadsperiode }: Props) => {
    const { text } = useAppIntl();
    const erAvsluttet = arbeidsforhold.erAnsatt === YesOrNo.NO;

    const intlValues = {
        hvor: text('arbeidsforhold.part.som.ANSATT', { navn: arbeidsforhold.arbeidsgiver.navn }),
        jobber: erAvsluttet ? text('arbeidsforhold.part.jobbet') : text('arbeidsforhold.part.jobber'),
        periodeFra: prettifyDateExtended(søknadsperiode.from),
        periodeTil: prettifyDateExtended(søknadsperiode.to),
    };

    const getFieldName = (field: AnsattFormFields): AnsattFormFields => `${parentFieldName}.${field}` as any;

    return (
        <>
            <FormBlock>
                <Block padBottom="m">
                    <Heading level="3" size="medium">
                        {arbeidsforhold.arbeidsgiver.navn}
                    </Heading>
                </Block>
                <Block>
                    <YesOrNoQuestion
                        legend={text('arbeidsforhold.erAnsatt.spm', {
                            navn: arbeidsforhold.arbeidsgiver.navn,
                        })}
                        name={getFieldName(AnsattFormFields.erAnsatt)}
                        validate={(value) => {
                            return getYesOrNoValidator()(value)
                                ? {
                                      key: 'validation.arbeidsforhold.erAnsatt.yesOrNoIsUnanswered',
                                      values: { navn: arbeidsforhold.arbeidsgiver.navn },
                                      keepKeyUnaltered: true,
                                  }
                                : undefined;
                        }}
                    />
                </Block>
            </FormBlock>
            {(arbeidsforhold.erAnsatt === YesOrNo.YES || arbeidsforhold.erAnsatt === YesOrNo.NO) && (
                <FormBlock margin="l">
                    {erAvsluttet && (
                        <Block padBottom={arbeidsforhold.sluttetFørSøknadsperiode === YesOrNo.NO ? 'xl' : 'none'}>
                            <Alert variant="info">
                                <AppText id="arbeidsforhold.ikkeAnsatt.info" />
                            </Alert>
                            <FormBlock>
                                <YesOrNoQuestion
                                    name={getFieldName(AnsattFormFields.sluttetFørSøknadsperiode)}
                                    legend={text('arbeidsforhold.sluttetFørSøknadsperiode.spm', {
                                        navn: arbeidsforhold.arbeidsgiver.navn,
                                        fraDato: prettifyDateExtended(søknadsperiode.from),
                                    })}
                                    validate={(value) => {
                                        const error = getRequiredFieldValidator()(value);
                                        return error
                                            ? {
                                                  key: 'validation.arbeidsforhold.sluttetFørSøknadsperiode.yesOrNoIsUnanswered',
                                                  values: {
                                                      navn: arbeidsforhold.arbeidsgiver.navn,
                                                      fraDato: prettifyDateExtended(søknadsperiode.from),
                                                  },
                                                  keepKeyUnaltered: true,
                                              }
                                            : undefined;
                                    }}
                                />
                            </FormBlock>
                        </Block>
                    )}
                    {((erAvsluttet && arbeidsforhold.sluttetFørSøknadsperiode === YesOrNo.NO) || !erAvsluttet) && (
                        <>
                            <NumberInput
                                label={text(
                                    erAvsluttet
                                        ? `arbeidsforhold.jobberNormaltTimer.avsluttet.spm`
                                        : `arbeidsforhold.jobberNormaltTimer.spm`,
                                    {
                                        navn: arbeidsforhold.arbeidsgiver.navn,
                                    },
                                )}
                                name={getFieldName(AnsattFormFields.jobberNormaltTimer)}
                                description={<InfoJobberNormaltTimerAnsatt />}
                                validate={getJobberNormaltTimerValidator(intlValues)}
                                value={arbeidsforhold ? arbeidsforhold.jobberNormaltTimer || '' : ''}
                            />
                        </>
                    )}
                </FormBlock>
            )}
        </>
    );
};

export default ArbeidssituasjonAnsatt;
