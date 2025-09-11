import InfoJobberNormaltTimerAnsatt from './info/InfoJobberNormaltTimerAnsatt';
import { Arbeidsgiver } from '../../../../types/Arbeidsgiver';
import { DateRange, ValidationError, YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Alert, Box, Heading, HStack, VStack } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { getJobberNormaltTimerValidator } from '../../../../utils/jobberNormaltTimerValidator';
import { AppText, useAppIntl } from '../../../../i18n';
import { Buildings3Icon } from '@navikt/aksel-icons';
import { yesOrNoIsAnswered } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';

export enum AnsattFormFields {
    arbeidsgiver = 'arbeidsgiver',
    jobberNormaltTimer = 'jobberNormaltTimer',
    erAnsatt = 'erAnsatt',
}

export interface AnsattFormData {
    arbeidsgiver: Arbeidsgiver;
    [AnsattFormFields.jobberNormaltTimer]?: string;
    [AnsattFormFields.erAnsatt]?: YesOrNo;
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
            <>
                <Heading level="3" size="medium">
                    <HStack gap="3" align="center">
                        <Buildings3Icon height="1.8rem" width="1.5rem" />
                        <Box>{arbeidsforhold.arbeidsgiver.navn}</Box>
                    </HStack>
                </Heading>

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
            </>
            {yesOrNoIsAnswered(arbeidsforhold.erAnsatt) && (
                <FormBlock margin="l">
                    <VStack gap="8">
                        {arbeidsforhold.erAnsatt === YesOrNo.NO && (
                            <Alert variant="info">
                                <AppText id="arbeidsforhold.ikkeAnsatt.info" />
                            </Alert>
                        )}

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
                            maxLength={5}
                            value={arbeidsforhold ? arbeidsforhold.jobberNormaltTimer || '' : ''}
                        />
                    </VStack>
                </FormBlock>
            )}
        </>
    );
};

export default ArbeidssituasjonAnsatt;
