import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';

import { IntlShape } from 'react-intl';
import { getRequiredFieldValidator, getDateValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import {
    AleneomsorgTidspunktField,
    TidspunktForAleneomsorg,
    TidspunktForAleneomsorgFormFields,
    TidspunktForAleneomsorgFormValues,
} from './TidspunktForAleneomsorgStep';
import { dateToday } from '@navikt/sif-common-utils/lib';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
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

const tidspunktItemLabelRenderer = (navn: string, intl: IntlShape): React.ReactNode => {
    return (
        <>
            <div>
                <span>{navn}</span>
            </div>

            <div>
                <span>{intlHelper(intl, 'step.tidspunktForAleneomsorg.spm', { navn })}</span>
            </div>
        </>
    );
};

const TidspunktForBarn = ({ barnMedAleneomsorg, aleneomsorgTidspunkt }: Props) => {
    const intl = useIntl();

    const getFieldName = (field: AleneomsorgTidspunktField): string => {
        return `aleneomsorgTidspunkt.${barnMedAleneomsorg.idFnr}.${field}`;
    };

    return (
        <>
            <RadioGroup
                name={
                    getFieldName(AleneomsorgTidspunktField.tidspunktForAleneomsorg) as TidspunktForAleneomsorgFormFields
                }
                legend={tidspunktItemLabelRenderer(barnMedAleneomsorg.navn, intl)}
                radios={[
                    {
                        label: intlHelper(intl, 'step.tidspunktForAleneomsorg.radioPanelGroupLabel.siste2årene', {
                            yearAgo: getYear(1),
                            yearNow: getYear(0),
                        }),
                        value: TidspunktForAleneomsorg.SISTE_2_ÅRENE,
                        'data-testid': `tidspunktForAleneomsorg_siste2årene_${barnMedAleneomsorg.idFnr}`,
                    },
                    {
                        label: intlHelper(intl, 'step.tidspunktForAleneomsorg.radioPanelGroupLabel.tidligere', {
                            twoYearsAgo: getYear(2),
                        }),
                        value: TidspunktForAleneomsorg.TIDLIGERE,
                        'data-testid': `tidspunktForAleneomsorg_tidligere-${barnMedAleneomsorg.idFnr}`,
                    },
                ]}
                validate={(value) => {
                    const error = getRequiredFieldValidator()(value);
                    return error
                        ? {
                              key: 'validation.tidspunktForAleneomsorg.noValue',
                              values: { barnMedAleneomsorg },
                              keepKeyUnaltered: true,
                          }
                        : undefined;
                }}
            />

            {aleneomsorgTidspunkt?.tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE && (
                <Block margin="xl">
                    <DatePicker
                        name={getFieldName(AleneomsorgTidspunktField.dato) as TidspunktForAleneomsorgFormFields}
                        label={intlHelper(intl, 'step.tidspunktForAleneomsorg.siste2årene.dato.spm', {
                            navn: barnMedAleneomsorg.navn,
                        })}
                        showYearSelector={true}
                        minDate={getMinDateYearAgo()}
                        maxDate={dateToday}
                        validate={(value) => {
                            const error = getDateValidator({
                                required: true,
                                min: getMinDateYearAgo(),
                                max: dateToday,
                            })(value);
                            return error
                                ? {
                                      key: `validation.tidspunktForAleneomsorg.dato.${error}`,
                                      values: { barnMedAleneomsorg },
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
