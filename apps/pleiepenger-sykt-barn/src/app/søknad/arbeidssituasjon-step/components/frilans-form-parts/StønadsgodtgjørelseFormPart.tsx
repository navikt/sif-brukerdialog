import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { useFormikContext } from 'formik';
import ResponsivePanel from '../../../../components/responsive-panel/ResponsivePanel';
import {
    StønadGodtgjørelseFormValues,
    StønadGodtgjørelseFormField,
} from '../../../../types/søknad-form-values/StønadGodtgjørelseFormValues';
import { SøknadFormValues } from '../../../../types/søknad-form-values/SøknadFormValues';
import {
    AppFieldValidationErrors,
    getstønadGodtgjørelseSluttdatoValidator,
    getstønadGodtgjørelseStartdatoValidator,
} from '../../../../validation/fieldValidations';

const StønadGodtgjørelseFormComponents = getTypedFormComponents<
    StønadGodtgjørelseFormField,
    StønadGodtgjørelseFormValues,
    ValidationError
>();

interface Props {
    søknadsperiode: DateRange;
}

const StønadsgodtgjørelseFormPart: React.FunctionComponent<Props> = ({ søknadsperiode }) => {
    const intl = useIntl();
    const {
        values: { stønadGodtgjørelse },
    } = useFormikContext<SøknadFormValues>();

    return (
        <FormBlock>
            <StønadGodtgjørelseFormComponents.YesOrNoQuestion
                name={StønadGodtgjørelseFormField.mottarStønadGodtgjørelse}
                legend={intlHelper(intl, 'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelse.spm')}
                validate={getYesOrNoValidator()}
                description={
                    <ExpandableInfo
                        title={intlHelper(
                            intl,
                            'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelse.spm.description.tittel',
                        )}>
                        <FormattedMessage id="steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelse.spm.description" />
                    </ExpandableInfo>
                }
            />
            {stønadGodtgjørelse && stønadGodtgjørelse.mottarStønadGodtgjørelse === YesOrNo.YES && (
                <FormBlock>
                    <ResponsivePanel border={true}>
                        <StønadGodtgjørelseFormComponents.RadioGroup
                            name={StønadGodtgjørelseFormField.mottarStønadGodtgjørelseIHelePerioden}
                            legend={intlHelper(
                                intl,
                                'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePerioden.spm',
                            )}
                            radios={[
                                {
                                    label: 'Ja',
                                    value: YesOrNo.YES,
                                },
                                {
                                    label: 'Nei',
                                    value: YesOrNo.NO,
                                },
                            ]}
                            validate={getRequiredFieldValidator()}
                            value={stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePerioden}
                        />

                        {stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePerioden === YesOrNo.NO && (
                            <>
                                <FormBlock>
                                    <StønadGodtgjørelseFormComponents.RadioGroup
                                        name={StønadGodtgjørelseFormField.starterUndeveis}
                                        legend={intlHelper(
                                            intl,
                                            'steg.arbeidssituasjon.stønadGodtgjørelse.starterUndeveis.spm',
                                        )}
                                        radios={[
                                            {
                                                label: 'Ja',
                                                value: YesOrNo.YES,
                                            },
                                            {
                                                label: 'Nei',
                                                value: YesOrNo.NO,
                                            },
                                        ]}
                                        validate={getRequiredFieldValidator()}
                                        value={stønadGodtgjørelse.starterUndeveis}
                                    />
                                    {stønadGodtgjørelse.starterUndeveis === YesOrNo.YES && (
                                        <FormBlock margin="m">
                                            <StønadGodtgjørelseFormComponents.DatePicker
                                                name={StønadGodtgjørelseFormField.startdato}
                                                label={intlHelper(
                                                    intl,
                                                    'steg.arbeidssituasjon.stønadGodtgjørelse.starterUndeveis.startdato',
                                                )}
                                                dropdownCaption={true}
                                                minDate={søknadsperiode.from}
                                                maxDate={søknadsperiode.to}
                                                defaultMonth={søknadsperiode.to}
                                                data-testid="stønadGodtgjørelse-startdato"
                                                validate={getstønadGodtgjørelseStartdatoValidator(
                                                    stønadGodtgjørelse,
                                                    søknadsperiode,
                                                )}
                                            />
                                        </FormBlock>
                                    )}
                                </FormBlock>
                                <FormBlock>
                                    <StønadGodtgjørelseFormComponents.RadioGroup
                                        name={StønadGodtgjørelseFormField.slutterUnderveis}
                                        legend={intlHelper(
                                            intl,
                                            'steg.arbeidssituasjon.stønadGodtgjørelse.slutterUndeveis.spm',
                                        )}
                                        radios={[
                                            {
                                                label: 'Ja',
                                                value: YesOrNo.YES,
                                            },
                                            {
                                                label: 'Nei',
                                                value: YesOrNo.NO,
                                            },
                                        ]}
                                        validate={(value) => {
                                            if (
                                                value === YesOrNo.NO &&
                                                stønadGodtgjørelse.starterUndeveis === YesOrNo.NO
                                            ) {
                                                return AppFieldValidationErrors.starter_slutter_undeveis_nei;
                                            }

                                            return getRequiredFieldValidator()(value);
                                        }}
                                        value={stønadGodtgjørelse.slutterUnderveis}
                                    />

                                    {stønadGodtgjørelse.slutterUnderveis === YesOrNo.YES && (
                                        <FormBlock margin="m">
                                            <StønadGodtgjørelseFormComponents.DatePicker
                                                name={StønadGodtgjørelseFormField.sluttdato}
                                                label={intlHelper(
                                                    intl,
                                                    'steg.arbeidssituasjon.stønadGodtgjørelse.starterUndeveis.sluttdato',
                                                )}
                                                dropdownCaption={true}
                                                minDate={søknadsperiode.from}
                                                maxDate={søknadsperiode.to}
                                                defaultMonth={søknadsperiode.to}
                                                data-testid="stønadGodtgjørelse-sluttdato"
                                                validate={getstønadGodtgjørelseSluttdatoValidator(
                                                    stønadGodtgjørelse,
                                                    søknadsperiode,
                                                )}
                                            />
                                        </FormBlock>
                                    )}
                                </FormBlock>
                            </>
                        )}
                    </ResponsivePanel>
                </FormBlock>
            )}
        </FormBlock>
    );
};

export default StønadsgodtgjørelseFormPart;
