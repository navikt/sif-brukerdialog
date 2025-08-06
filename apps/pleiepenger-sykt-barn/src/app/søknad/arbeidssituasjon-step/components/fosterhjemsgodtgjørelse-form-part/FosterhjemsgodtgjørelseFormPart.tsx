import React from 'react';
import { useAppIntl } from '@i18n/index';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { DateRange } from '@navikt/sif-common-utils';
import { getRequiredFieldValidator, getStringValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { useFormikContext } from 'formik';
import ResponsivePanel from '../../../../components/responsive-panel/ResponsivePanel';
import { AppText } from '../../../../i18n';
import {
    FosterhjemsgodtgjørelseFormField,
    FosterhjemsgodtgjørelseFormValues,
} from '../../../../types/søknad-form-values/FosterhjemsgodtgjørelseFormValues';
import { SøknadFormValues } from '../../../../types/søknad-form-values/SøknadFormValues';
import {
    AppFieldValidationErrors,
    getFosterhjemsgodtgjørelseSluttdatoValidator,
    getFosterhjemsgodtgjørelseStartdatoValidator,
} from '../../../../validation/fieldValidations';
import { List } from '@navikt/ds-react';

const FosterhjemsgodtgjørelseComponents = getTypedFormComponents<
    FosterhjemsgodtgjørelseFormField,
    FosterhjemsgodtgjørelseFormValues,
    ValidationError
>();

interface Props {
    søknadsperiode: DateRange;
}

const FosterhjemsgodtgjørelseFormPart: React.FunctionComponent<Props> = ({ søknadsperiode }) => {
    const { text } = useAppIntl();
    const {
        values: { fosterhjemsgodtgjørelse },
    } = useFormikContext<SøknadFormValues>();

    return (
        <FormBlock>
            <FosterhjemsgodtgjørelseComponents.YesOrNoQuestion
                name={FosterhjemsgodtgjørelseFormField.mottarFosterhjemsgodtgjørelse}
                legend={text('steg.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelse.spm')}
                validate={getYesOrNoValidator()}
                description={
                    <ExpandableInfo
                        title={text(
                            'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelse.spm.description.tittel',
                        )}>
                        <AppText id="steg.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelse.spm.description" />
                    </ExpandableInfo>
                }
            />
            {fosterhjemsgodtgjørelse && fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelse === YesOrNo.YES && (
                <FormBlock margin="l">
                    <ResponsivePanel border={true}>
                        <FosterhjemsgodtgjørelseComponents.YesOrNoQuestion
                            name={FosterhjemsgodtgjørelseFormField.erFrikjøptFraJobb}
                            legend={text('steg.arbeidssituasjon.fosterhjemsgodtgjørelse.erFrikjøptFraJobb.spm')}
                            validate={getRequiredFieldValidator()}
                            value={fosterhjemsgodtgjørelse.erFrikjøptFraJobb}
                        />
                        {fosterhjemsgodtgjørelse.erFrikjøptFraJobb === YesOrNo.YES ? (
                            <FormBlock>
                                <FosterhjemsgodtgjørelseComponents.Textarea
                                    name={FosterhjemsgodtgjørelseFormField.frikjøptBeskrivelse}
                                    label={
                                        <AppText id="steg.arbeidssituasjon.fosterhjemsgodtgjørelse.erFrikjøptFraJobb.beskrivelse.label" />
                                    }
                                    description={
                                        <List>
                                            <List.Item>
                                                <AppText id="steg.arbeidssituasjon.fosterhjemsgodtgjørelse.erFrikjøptFraJobb.info.1" />
                                            </List.Item>
                                            <List.Item>
                                                <AppText id="steg.arbeidssituasjon.fosterhjemsgodtgjørelse.erFrikjøptFraJobb.info.2" />
                                            </List.Item>
                                            <List.Item>
                                                <AppText id="steg.arbeidssituasjon.fosterhjemsgodtgjørelse.erFrikjøptFraJobb.info.3" />
                                            </List.Item>
                                            <List.Item>
                                                <AppText id="steg.arbeidssituasjon.fosterhjemsgodtgjørelse.erFrikjøptFraJobb.info.4" />
                                            </List.Item>
                                        </List>
                                    }
                                    validate={getStringValidator({ required: true, maxLength: 1000 })}
                                    maxLength={1000}
                                />
                            </FormBlock>
                        ) : null}

                        {fosterhjemsgodtgjørelse.erFrikjøptFraJobb === YesOrNo.NO ? (
                            <>
                                <FormBlock>
                                    <FosterhjemsgodtgjørelseComponents.YesOrNoQuestion
                                        name={
                                            FosterhjemsgodtgjørelseFormField.mottarFosterhjemsgodtgjørelseIHelePerioden
                                        }
                                        legend={text(
                                            'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelseIHelePerioden.spm',
                                        )}
                                        validate={getRequiredFieldValidator()}
                                        value={fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelseIHelePerioden}
                                    />
                                </FormBlock>

                                {fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelseIHelePerioden === YesOrNo.NO && (
                                    <>
                                        <FormBlock>
                                            <FosterhjemsgodtgjørelseComponents.YesOrNoQuestion
                                                name={FosterhjemsgodtgjørelseFormField.starterUndeveis}
                                                legend={text(
                                                    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.starterUndeveis.spm',
                                                )}
                                                validate={getRequiredFieldValidator()}
                                                value={fosterhjemsgodtgjørelse.starterUndeveis}
                                            />
                                            {fosterhjemsgodtgjørelse.starterUndeveis === YesOrNo.YES && (
                                                <FormBlock margin="m">
                                                    <FosterhjemsgodtgjørelseComponents.DatePicker
                                                        name={FosterhjemsgodtgjørelseFormField.startdato}
                                                        label={text(
                                                            'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.starterUndeveis.startdato',
                                                        )}
                                                        dropdownCaption={true}
                                                        minDate={søknadsperiode.from}
                                                        maxDate={søknadsperiode.to}
                                                        defaultMonth={søknadsperiode.to}
                                                        data-testid="fosterhjemsgodtgjørelse-startdato"
                                                        validate={getFosterhjemsgodtgjørelseStartdatoValidator(
                                                            fosterhjemsgodtgjørelse,
                                                            søknadsperiode,
                                                        )}
                                                    />
                                                </FormBlock>
                                            )}
                                        </FormBlock>
                                        <FormBlock>
                                            <FosterhjemsgodtgjørelseComponents.YesOrNoQuestion
                                                name={FosterhjemsgodtgjørelseFormField.slutterUnderveis}
                                                legend={text(
                                                    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.slutterUndeveis.spm',
                                                )}
                                                validate={(value) => {
                                                    if (
                                                        value === YesOrNo.NO &&
                                                        fosterhjemsgodtgjørelse.starterUndeveis === YesOrNo.NO
                                                    ) {
                                                        return AppFieldValidationErrors.starter_slutter_undeveis_nei;
                                                    }

                                                    return getRequiredFieldValidator()(value);
                                                }}
                                                value={fosterhjemsgodtgjørelse.slutterUnderveis}
                                            />

                                            {fosterhjemsgodtgjørelse.slutterUnderveis === YesOrNo.YES && (
                                                <FormBlock margin="m">
                                                    <FosterhjemsgodtgjørelseComponents.DatePicker
                                                        name={FosterhjemsgodtgjørelseFormField.sluttdato}
                                                        label={text(
                                                            'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.starterUndeveis.sluttdato',
                                                        )}
                                                        dropdownCaption={true}
                                                        minDate={søknadsperiode.from}
                                                        maxDate={søknadsperiode.to}
                                                        defaultMonth={søknadsperiode.to}
                                                        data-testid="fosterhjemsgodtgjørelse-sluttdato"
                                                        validate={getFosterhjemsgodtgjørelseSluttdatoValidator(
                                                            fosterhjemsgodtgjørelse,
                                                            søknadsperiode,
                                                        )}
                                                    />
                                                </FormBlock>
                                            )}
                                        </FormBlock>
                                    </>
                                )}
                            </>
                        ) : null}
                    </ResponsivePanel>
                </FormBlock>
            )}
        </FormBlock>
    );
};

export default FosterhjemsgodtgjørelseFormPart;
