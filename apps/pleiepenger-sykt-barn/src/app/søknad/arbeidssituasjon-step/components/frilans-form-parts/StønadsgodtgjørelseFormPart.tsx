import React from 'react';
import { useAppIntl } from '@i18n/index';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { DateRange, dateRangeFormatter } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import ResponsivePanel from '../../../../components/responsive-panel/ResponsivePanel';
import { AppText } from '../../../../i18n';
import {
    MottarStønadGodtgjørelseVariant,
    StønadGodtgjørelseFormField,
    StønadGodtgjørelseFormValues,
} from '../../../../types/søknad-form-values/StønadGodtgjørelseFormValues';
import { SøknadFormValues } from '../../../../types/søknad-form-values/SøknadFormValues';
import {
    getstønadGodtgjørelseSluttdatoValidator,
    getstønadGodtgjørelseStartdatoValidator,
} from '../../../../validation/fieldValidations';
import { VStack } from '@navikt/ds-react';

const StønadGodtgjørelseFormComponents = getTypedFormComponents<
    StønadGodtgjørelseFormField,
    StønadGodtgjørelseFormValues,
    ValidationError
>();

interface Props {
    søknadsperiode: DateRange;
}

const StønadsgodtgjørelseFormPart: React.FunctionComponent<Props> = ({ søknadsperiode }) => {
    const { text, locale } = useAppIntl();
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
                        <VStack gap="8">
                            <StønadGodtgjørelseFormComponents.RadioGroup
                                name={StønadGodtgjørelseFormField.mottarStønadGodtgjørelseVariant}
                                legend={text(
                                    'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelseVariant.spm',
                                    { periode: dateRangeFormatter.getDateRangeText(søknadsperiode, locale) },
                                )}
                                radios={[
                                    {
                                        value: MottarStønadGodtgjørelseVariant.somVanlig,
                                        label: text(
                                            'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelseVariant.variant.somVanlig',
                                        ),
                                    },
                                    {
                                        value: MottarStønadGodtgjørelseVariant.starterIPerioden,
                                        label: text(
                                            'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelseVariant.variant.starterIPerioden',
                                        ),
                                    },
                                    {
                                        value: MottarStønadGodtgjørelseVariant.slutterIPerioden,
                                        label: text(
                                            'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelseVariant.variant.slutterIPerioden',
                                        ),
                                    },
                                    {
                                        value: MottarStønadGodtgjørelseVariant.starterOgSlutterIPerioden,
                                        label: text(
                                            'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelseVariant.variant.starterOgSlutterIPerioden',
                                        ),
                                    },
                                ]}
                                validate={getRequiredFieldValidator()}
                                value={stønadGodtgjørelse.mottarStønadGodtgjørelseVariant}
                            />

                            {(stønadGodtgjørelse.mottarStønadGodtgjørelseVariant ===
                                MottarStønadGodtgjørelseVariant.starterOgSlutterIPerioden ||
                                stønadGodtgjørelse.mottarStønadGodtgjørelseVariant ===
                                    MottarStønadGodtgjørelseVariant.starterIPerioden) && (
                                <StønadGodtgjørelseFormComponents.DatePicker
                                    name={StønadGodtgjørelseFormField.startdato}
                                    label={text('steg.arbeidssituasjon.stønadGodtgjørelse.starterUndeveis.startdato')}
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
                            )}

                            {(stønadGodtgjørelse.mottarStønadGodtgjørelseVariant ===
                                MottarStønadGodtgjørelseVariant.starterOgSlutterIPerioden ||
                                stønadGodtgjørelse.mottarStønadGodtgjørelseVariant ===
                                    MottarStønadGodtgjørelseVariant.slutterIPerioden) && (
                                <StønadGodtgjørelseFormComponents.DatePicker
                                    name={StønadGodtgjørelseFormField.sluttdato}
                                    label={text('steg.arbeidssituasjon.stønadGodtgjørelse.starterUndeveis.sluttdato')}
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
                            )}
                        </VStack>
                    </ResponsivePanel>
                </FormBlock>
            )}
        </FormBlock>
    );
};

export default StønadsgodtgjørelseFormPart;
