import { Alert } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import OfficeIconSvg from '../../../components/office-icon/OfficeIconSvg';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
import { ArbeidsforholdFormField, ArbeidsforholdFormValues } from '../../../types/ArbeidsforholdFormValues';
import ArbeidssituasjonPanel from './arbeidssituasjon-panel/ArbeidssituasjonPanel';
import { renderTidsrom } from './frilansoppdrag-liste/FrilansoppdragListe';
import NormalarbeidstidSpørsmål from './normalarbeidstid-spørsmål/NormalarbeidstidSpørsmål';

const AnsattFormComponents = getTypedFormComponents<
    ArbeidsforholdFormField,
    ArbeidsforholdFormValues,
    ValidationError
>();

interface Props {
    arbeidsforhold: ArbeidsforholdFormValues;
    parentFieldName: string;
    søknadsperiode: DateRange;
}

const ArbeidssituasjonAnsatt: React.FC<Props> = ({ arbeidsforhold, parentFieldName, søknadsperiode }) => {
    const intl = useIntl();
    const erAvsluttet = arbeidsforhold.erAnsatt === YesOrNo.NO;

    const getFieldName = (field: ArbeidsforholdFormField): ArbeidsforholdFormField =>
        `${parentFieldName}.${field}` as any;

    return (
        <div data-testid="arbeidssituasjonAnsatt">
            <ArbeidssituasjonPanel
                title={arbeidsforhold.arbeidsgiver.navn}
                titleIcon={<OfficeIconSvg />}
                description={renderTidsrom(arbeidsforhold.arbeidsgiver)}>
                <Block>
                    <AnsattFormComponents.RadioGroup
                        legend={intlHelper(intl, 'arbeidsforhold.erAnsatt.spm', {
                            navn: arbeidsforhold.arbeidsgiver.navn,
                        })}
                        data-testid="er-ansatt"
                        name={getFieldName(ArbeidsforholdFormField.erAnsatt)}
                        radios={[
                            {
                                label: 'Ja',
                                value: YesOrNo.YES,
                                'data-testid': 'er-ansatt_yes',
                            },
                            {
                                label: 'Nei',
                                value: YesOrNo.NO,
                                'data-testid': 'er-ansatt_no',
                            },
                        ]}
                        value={arbeidsforhold.erAnsatt}
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

                {(arbeidsforhold.erAnsatt === YesOrNo.YES || arbeidsforhold.erAnsatt === YesOrNo.NO) && (
                    <FormBlock margin="l">
                        {erAvsluttet && (
                            <Block padBottom={arbeidsforhold.sluttetFørSøknadsperiode === YesOrNo.NO ? 'xl' : 'none'}>
                                <Alert variant="info">
                                    <FormattedMessage id="arbeidsforhold.ikkeAnsatt.info" />
                                </Alert>
                                <FormBlock>
                                    <AnsattFormComponents.RadioGroup
                                        name={getFieldName(ArbeidsforholdFormField.sluttetFørSøknadsperiode)}
                                        legend={intlHelper(intl, 'arbeidsforhold.sluttetFørSøknadsperiode.spm', {
                                            navn: arbeidsforhold.arbeidsgiver.navn,
                                            fraDato: dateFormatter.full(søknadsperiode.from),
                                        })}
                                        radios={[
                                            {
                                                label: 'Ja',
                                                value: YesOrNo.YES,
                                                'data-testid': 'sluttet-før-søknadsperiode_yes',
                                            },
                                            {
                                                label: 'Nei',
                                                value: YesOrNo.NO,
                                                'data-testid': 'sluttet-før-søknadsperiode_no',
                                            },
                                        ]}
                                        value={arbeidsforhold.sluttetFørSøknadsperiode}
                                        data-testid="sluttet-før-søknadsperiode"
                                        validate={(value) => {
                                            const error = getRequiredFieldValidator()(value);
                                            return error
                                                ? {
                                                      key: 'validation.arbeidsforhold.sluttetFørSøknadsperiode.yesOrNoIsUnanswered',
                                                      values: {
                                                          navn: arbeidsforhold.arbeidsgiver.navn,
                                                          fraDato: dateFormatter.full(søknadsperiode.from),
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
                            <NormalarbeidstidSpørsmål
                                arbeidsforhold={arbeidsforhold}
                                arbeidsforholdType={ArbeidsforholdType.ANSATT}
                                arbeidsstedNavn={arbeidsforhold.arbeidsgiver.navn}
                                erAktivtArbeidsforhold={arbeidsforhold.erAnsatt === YesOrNo.YES}
                                arbeidsforholdFieldName={parentFieldName}
                                brukKunSnittPerUke={false}
                            />
                        )}
                    </FormBlock>
                )}
            </ArbeidssituasjonPanel>
        </div>
    );
};

export default ArbeidssituasjonAnsatt;
