import React from 'react';
import { useAppIntl } from '@i18n/index';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-validation';
import { DateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import ResponsivePanel from '../../../../components/responsive-panel/ResponsivePanel';
import { AppText } from '../../../../i18n';
import {
    StønadGodtgjørelseFormField,
    StønadGodtgjørelseFormValues,
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
    const { text } = useAppIntl();
    const {
        values: { stønadGodtgjørelse },
    } = useFormikContext<SøknadFormValues>();

    return (
        <FormBlock>
            <StønadGodtgjørelseFormComponents.YesOrNoQuestion
                name={StønadGodtgjørelseFormField.mottarStønadGodtgjørelse}
                legend={text('steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelse.spm')}
                validate={getYesOrNoValidator()}
                description={
                    <ExpandableInfo
                        title={text(
                            'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelse.spm.description.tittel',
                        )}>
                        <AppText id="steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelse.spm.description" />
                    </ExpandableInfo>
                }
            />
            {stønadGodtgjørelse && stønadGodtgjørelse.mottarStønadGodtgjørelse === YesOrNo.YES && (
                <FormBlock>
                    <ResponsivePanel border={true}>
                        <StønadGodtgjørelseFormComponents.YesOrNoQuestion
                            name={StønadGodtgjørelseFormField.mottarStønadGodtgjørelseIHelePerioden}
                            legend={text(
                                'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePerioden.spm',
                            )}
                            validate={getRequiredFieldValidator()}
                            value={stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePerioden}
                        />

                        {stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePerioden === YesOrNo.NO && (
                            <>
                                <FormBlock>
                                    <StønadGodtgjørelseFormComponents.YesOrNoQuestion
                                        name={StønadGodtgjørelseFormField.starterUndeveis}
                                        legend={text('steg.arbeidssituasjon.stønadGodtgjørelse.starterUndeveis.spm')}
                                        validate={getRequiredFieldValidator()}
                                        value={stønadGodtgjørelse.starterUndeveis}
                                    />
                                    {stønadGodtgjørelse.starterUndeveis === YesOrNo.YES && (
                                        <FormBlock margin="m">
                                            <StønadGodtgjørelseFormComponents.DatePicker
                                                name={StønadGodtgjørelseFormField.startdato}
                                                label={text(
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
                                    <StønadGodtgjørelseFormComponents.YesOrNoQuestion
                                        name={StønadGodtgjørelseFormField.slutterUnderveis}
                                        legend={text('steg.arbeidssituasjon.stønadGodtgjørelse.slutterUndeveis.spm')}
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
                                                label={text(
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
