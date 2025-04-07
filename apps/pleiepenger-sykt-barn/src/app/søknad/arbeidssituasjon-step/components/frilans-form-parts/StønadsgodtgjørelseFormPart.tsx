import React from 'react';
import { useAppIntl } from '@i18n/index';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-validation';
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
    getStønadGodtgjørelseSluttdatoValidator,
    getStønadGodtgjørelseStartdatoValidator,
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
        values: { omsorgsstønad },
    } = useFormikContext<SøknadFormValues>();

    return (
        <FormBlock>
            <StønadGodtgjørelseFormComponents.YesOrNoQuestion
                name={StønadGodtgjørelseFormField.mottarOmsorgsstønad}
                legend={text('steg.arbeidssituasjon.omsorgsstønad.mottarOmsorgsstønad.spm')}
                validate={getYesOrNoValidator()}
                description={
                    <ExpandableInfo
                        title={text('steg.arbeidssituasjon.omsorgsstønad.mottarOmsorgsstønad.spm.description.tittel')}>
                        <AppText id="steg.arbeidssituasjon.omsorgsstønad.mottarOmsorgsstønad.spm.description" />
                    </ExpandableInfo>
                }
            />
            {omsorgsstønad && omsorgsstønad.mottarOmsorgsstønad === YesOrNo.YES && (
                <FormBlock>
                    <ResponsivePanel border={true}>
                        <StønadGodtgjørelseFormComponents.YesOrNoQuestion
                            name={StønadGodtgjørelseFormField.mottarStønadGodtgjørelseIHelePerioden}
                            legend={text(
                                'steg.arbeidssituasjon.omsorgsstønad.mottarStønadGodtgjørelseIHelePerioden.spm',
                            )}
                            validate={getRequiredFieldValidator()}
                            value={omsorgsstønad.mottarStønadGodtgjørelseIHelePerioden}
                        />

                        {omsorgsstønad.mottarStønadGodtgjørelseIHelePerioden === YesOrNo.NO && (
                            <>
                                <FormBlock>
                                    <StønadGodtgjørelseFormComponents.YesOrNoQuestion
                                        name={StønadGodtgjørelseFormField.starterUndeveis}
                                        legend={text('steg.arbeidssituasjon.omsorgsstønad.starterUndeveis.spm')}
                                        validate={getRequiredFieldValidator()}
                                        value={omsorgsstønad.starterUndeveis}
                                    />
                                    {omsorgsstønad.starterUndeveis === YesOrNo.YES && (
                                        <FormBlock margin="m">
                                            <StønadGodtgjørelseFormComponents.DatePicker
                                                name={StønadGodtgjørelseFormField.startdato}
                                                label={text(
                                                    'steg.arbeidssituasjon.omsorgsstønad.starterUndeveis.startdato',
                                                )}
                                                dropdownCaption={true}
                                                minDate={søknadsperiode.from}
                                                maxDate={søknadsperiode.to}
                                                defaultMonth={søknadsperiode.to}
                                                data-testid="omsorgsstønad-startdato"
                                                validate={getStønadGodtgjørelseStartdatoValidator(
                                                    omsorgsstønad,
                                                    søknadsperiode,
                                                )}
                                            />
                                        </FormBlock>
                                    )}
                                </FormBlock>
                                <FormBlock>
                                    <StønadGodtgjørelseFormComponents.YesOrNoQuestion
                                        name={StønadGodtgjørelseFormField.slutterUnderveis}
                                        legend={text('steg.arbeidssituasjon.omsorgsstønad.slutterUndeveis.spm')}
                                        validate={(value) => {
                                            if (value === YesOrNo.NO && omsorgsstønad.starterUndeveis === YesOrNo.NO) {
                                                return AppFieldValidationErrors.starter_slutter_undeveis_nei;
                                            }

                                            return getRequiredFieldValidator()(value);
                                        }}
                                        value={omsorgsstønad.slutterUnderveis}
                                    />

                                    {omsorgsstønad.slutterUnderveis === YesOrNo.YES && (
                                        <FormBlock margin="m">
                                            <StønadGodtgjørelseFormComponents.DatePicker
                                                name={StønadGodtgjørelseFormField.sluttdato}
                                                label={text(
                                                    'steg.arbeidssituasjon.omsorgsstønad.starterUndeveis.sluttdato',
                                                )}
                                                dropdownCaption={true}
                                                minDate={søknadsperiode.from}
                                                maxDate={søknadsperiode.to}
                                                defaultMonth={søknadsperiode.to}
                                                data-testid="omsorgsstønad-sluttdato"
                                                validate={getStønadGodtgjørelseSluttdatoValidator(
                                                    omsorgsstønad,
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
