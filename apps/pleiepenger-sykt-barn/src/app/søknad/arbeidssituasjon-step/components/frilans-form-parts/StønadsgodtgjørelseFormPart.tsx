import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { useFormikContext } from 'formik';
import ResponsivePanel from '../../../../components/responsive-panel/ResponsivePanel';
import { StønadGodtgjørelseFormData, StønadGodtgjørelseFormField } from '../../../../types/StønadGodtgjørelseFormData';
import { SøknadFormValues } from '../../../../types/SøknadFormValues';
import {
    AppFieldValidationErrors,
    getstønadGodtgjørelseSluttdatoValidator,
    getstønadGodtgjørelseStartdatoValidator,
} from '../../../../validation/fieldValidations';

const StønadGodtgjørelseFormComponents = getTypedFormComponents<
    StønadGodtgjørelseFormField,
    StønadGodtgjørelseFormData,
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
                data-testid="mottar-stønadGodtgjørelse"
                legend={intlHelper(intl, 'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelse.spm')}
                validate={getYesOrNoValidator()}
                description={
                    <ExpandableInfo
                        title={intlHelper(
                            intl,
                            'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelse.spm.description.tittel'
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
                                'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePerioden.spm'
                            )}
                            radios={[
                                {
                                    label: 'Ja',
                                    value: YesOrNo.YES,
                                    'data-testid': 'mottar-stønadGodtgjørelse-i-hele-peroden_yes',
                                },
                                {
                                    label: 'Nei',
                                    value: YesOrNo.NO,
                                    'data-testid': 'mottar-stønadGodtgjørelse-i-hele-peroden_no',
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
                                            'steg.arbeidssituasjon.stønadGodtgjørelse.starterUndeveis.spm'
                                        )}
                                        radios={[
                                            {
                                                label: 'Ja',
                                                value: YesOrNo.YES,
                                                'data-testid': 'stønadGodtgjørelse-starter-undeveis_yes',
                                            },
                                            {
                                                label: 'Nei',
                                                value: YesOrNo.NO,
                                                'data-testid': 'stønadGodtgjørelse-starter-undeveis_no',
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
                                                    'steg.arbeidssituasjon.stønadGodtgjørelse.starterUndeveis.startdato'
                                                )}
                                                showYearSelector={true}
                                                minDate={søknadsperiode.from}
                                                maxDate={søknadsperiode.to}
                                                dayPickerProps={{ defaultMonth: søknadsperiode.to }}
                                                data-testid="stønadGodtgjørelse-startdato"
                                                validate={getstønadGodtgjørelseStartdatoValidator(
                                                    stønadGodtgjørelse,
                                                    søknadsperiode
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
                                            'steg.arbeidssituasjon.stønadGodtgjørelse.slutterUndeveis.spm'
                                        )}
                                        radios={[
                                            {
                                                label: 'Ja',
                                                value: YesOrNo.YES,
                                                'data-testid': 'stønadGodtgjørelse-slutter-undeveis_yes',
                                            },
                                            {
                                                label: 'Nei',
                                                value: YesOrNo.NO,
                                                'data-testid': 'stønadGodtgjørelse-slutter-undeveis_no',
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
                                                    'steg.arbeidssituasjon.stønadGodtgjørelse.starterUndeveis.sluttdato'
                                                )}
                                                showYearSelector={true}
                                                minDate={søknadsperiode.from}
                                                maxDate={søknadsperiode.to}
                                                dayPickerProps={{ defaultMonth: søknadsperiode.to }}
                                                data-testid="stønadGodtgjørelse-sluttdato"
                                                validate={getstønadGodtgjørelseSluttdatoValidator(
                                                    stønadGodtgjørelse,
                                                    søknadsperiode
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
