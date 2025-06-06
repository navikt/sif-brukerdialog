import React from 'react';
import { useAppIntl } from '@i18n/index';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { getNumberValidator, getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { DateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import ResponsivePanel from '../../../../components/responsive-panel/ResponsivePanel';
import { AppText } from '../../../../i18n';
import {
    OmsorgsstønadFormField,
    OmsorgsstønadFormValues,
} from '../../../../types/søknad-form-values/OmsorgsstønadFormValues';
import { SøknadFormValues } from '../../../../types/søknad-form-values/SøknadFormValues';
import {
    AppFieldValidationErrors,
    getOmsorgsstønadSluttdatoValidator,
    getOmsorgsstønadStartdatoValidator,
} from '../../../../validation/fieldValidations';
import { ReadMore } from '@navikt/ds-react';

const FormComponents = getTypedFormComponents<OmsorgsstønadFormField, OmsorgsstønadFormValues, ValidationError>();

interface Props {
    søknadsperiode: DateRange;
}

const OmsorgsstønadFormPart: React.FunctionComponent<Props> = ({ søknadsperiode }) => {
    const { text } = useAppIntl();
    const {
        values: { omsorgsstønad },
    } = useFormikContext<SøknadFormValues>();

    return (
        <FormBlock>
            <FormComponents.YesOrNoQuestion
                name={OmsorgsstønadFormField.mottarOmsorgsstønad}
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
                <FormBlock margin="l">
                    <ResponsivePanel border={true}>
                        <FormComponents.NumberInput
                            label={text('steg.arbeidssituasjon.omsorgsstønad.antallTimer.spm')}
                            name={OmsorgsstønadFormField.antallTimer}
                            description={
                                <ReadMore header={text('steg.arbeidssituasjon.omsorgsstønad.antallTimer.info.tittel')}>
                                    <AppText id="steg.arbeidssituasjon.omsorgsstønad.antallTimer.info.tekst" />
                                </ReadMore>
                            }
                            width="xs"
                            maxLength={5}
                            validate={(value) => {
                                const minMaxOptions = {
                                    min: 1,
                                    max: 100,
                                };
                                const error = getNumberValidator({ ...minMaxOptions, required: true })(value);
                                return error
                                    ? {
                                          key: error,
                                          values: { ...minMaxOptions },
                                      }
                                    : undefined;
                            }}
                        />
                        <FormBlock>
                            <FormComponents.YesOrNoQuestion
                                name={OmsorgsstønadFormField.mottarOmsorgsstønadIHelePerioden}
                                legend={text(
                                    'steg.arbeidssituasjon.omsorgsstønad.mottarOmsorgsstønadIHelePerioden.spm',
                                )}
                                validate={getRequiredFieldValidator()}
                                value={omsorgsstønad.mottarOmsorgsstønadIHelePerioden}
                            />
                        </FormBlock>

                        {omsorgsstønad.mottarOmsorgsstønadIHelePerioden === YesOrNo.NO && (
                            <>
                                <FormBlock>
                                    <FormComponents.YesOrNoQuestion
                                        name={OmsorgsstønadFormField.starterUndeveis}
                                        legend={text('steg.arbeidssituasjon.omsorgsstønad.starterUndeveis.spm')}
                                        validate={getRequiredFieldValidator()}
                                        value={omsorgsstønad.starterUndeveis}
                                    />
                                    {omsorgsstønad.starterUndeveis === YesOrNo.YES && (
                                        <FormBlock margin="m">
                                            <FormComponents.DatePicker
                                                name={OmsorgsstønadFormField.startdato}
                                                label={text(
                                                    'steg.arbeidssituasjon.omsorgsstønad.starterUndeveis.startdato',
                                                )}
                                                dropdownCaption={true}
                                                minDate={søknadsperiode.from}
                                                maxDate={søknadsperiode.to}
                                                defaultMonth={søknadsperiode.to}
                                                data-testid="omsorgsstønad-startdato"
                                                validate={getOmsorgsstønadStartdatoValidator(
                                                    omsorgsstønad,
                                                    søknadsperiode,
                                                )}
                                            />
                                        </FormBlock>
                                    )}
                                </FormBlock>
                                <FormBlock>
                                    <FormComponents.YesOrNoQuestion
                                        name={OmsorgsstønadFormField.slutterUnderveis}
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
                                            <FormComponents.DatePicker
                                                name={OmsorgsstønadFormField.sluttdato}
                                                label={text(
                                                    'steg.arbeidssituasjon.omsorgsstønad.starterUndeveis.sluttdato',
                                                )}
                                                dropdownCaption={true}
                                                minDate={søknadsperiode.from}
                                                maxDate={søknadsperiode.to}
                                                defaultMonth={søknadsperiode.to}
                                                data-testid="omsorgsstønad-sluttdato"
                                                validate={getOmsorgsstønadSluttdatoValidator(
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

export default OmsorgsstønadFormPart;
