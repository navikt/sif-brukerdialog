import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { getDateValidator, getRequiredFieldValidator } from '@navikt/sif-validation';
import { getDateToday } from '@navikt/sif-common-utils';
import { AppIntlShape, useAppIntl } from '../../../i18n';
import {
    AleneomsorgTidspunktField,
    TidspunktForAleneomsorg,
    TidspunktForAleneomsorgFormFields,
    TidspunktForAleneomsorgFormValues,
} from './TidspunktForAleneomsorgStep';
import { BarnMedAleneomsorg, getMinDateYearAgo, getYear } from './tidspunktForAleneomsorgStepUtils';

interface Props {
    barnMedAleneomsorg: BarnMedAleneomsorg;
    aleneomsorgTidspunkt: { tidspunktForAleneomsorg?: TidspunktForAleneomsorg; dato?: string };
}

const { RadioGroup, DatePicker } = getTypedFormComponents<
    TidspunktForAleneomsorgFormFields,
    TidspunktForAleneomsorgFormValues,
    ValidationError
>();

const tidspunktItemLabelRenderer = (navn: string, { text }: AppIntlShape): React.ReactNode => {
    return (
        <>
            <div>
                <span>{navn}</span>
            </div>

            <div>
                <span>{text('step.tidspunktForAleneomsorg.spm', { navn })}</span>
            </div>
        </>
    );
};

const TidspunktForBarn = ({ barnMedAleneomsorg, aleneomsorgTidspunkt }: Props) => {
    const appIntl = useAppIntl();
    const { text } = appIntl;
    const getFieldName = (field: AleneomsorgTidspunktField): string => {
        return `aleneomsorgTidspunkt.${barnMedAleneomsorg.idFnr}.${field}`;
    };

    return (
        <>
            <RadioGroup
                name={
                    getFieldName(AleneomsorgTidspunktField.tidspunktForAleneomsorg) as TidspunktForAleneomsorgFormFields
                }
                legend={tidspunktItemLabelRenderer(barnMedAleneomsorg.navn, appIntl)}
                radios={[
                    {
                        label: text('step.tidspunktForAleneomsorg.radioPanelGroupLabel.siste2årene', {
                            yearAgo: getYear(1),
                            yearNow: getYear(0),
                        }),
                        value: TidspunktForAleneomsorg.SISTE_2_ÅRENE,
                    },
                    {
                        label: text('step.tidspunktForAleneomsorg.radioPanelGroupLabel.tidligere', {
                            twoYearsAgo: getYear(2),
                        }),
                        value: TidspunktForAleneomsorg.TIDLIGERE,
                    },
                ]}
                validate={(value) => {
                    const error = getRequiredFieldValidator()(value);
                    return error
                        ? {
                              key: 'validation.tidspunktForAleneomsorg.noValue',
                              keepKeyUnaltered: true,
                          }
                        : undefined;
                }}
            />

            {aleneomsorgTidspunkt?.tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE && (
                <Block margin="xl">
                    <DatePicker
                        name={getFieldName(AleneomsorgTidspunktField.dato) as TidspunktForAleneomsorgFormFields}
                        label={text('step.tidspunktForAleneomsorg.siste2årene.dato.spm', {
                            navn: barnMedAleneomsorg.navn,
                        })}
                        dropdownCaption={true}
                        minDate={getMinDateYearAgo()}
                        maxDate={getDateToday()}
                        validate={(value) => {
                            const error = getDateValidator({
                                required: true,
                                min: getMinDateYearAgo(),
                                max: getDateToday(),
                            })(value);
                            return error
                                ? {
                                      key: `validation.tidspunktForAleneomsorg.dato.${error}`,
                                      keepKeyUnaltered: true,
                                  }
                                : undefined;
                        }}
                    />
                </Block>
            )}
        </>
    );
};

export default TidspunktForBarn;
