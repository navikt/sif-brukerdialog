import { FormattedMessage, useIntl } from 'react-intl';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { DateRange, dateToday } from '@navikt/sif-common-utils';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getDateValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { ValidationError, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { ArbeidssituasjonFormFields, ArbeidssituasjonFormValues } from '../ArbeidssituasjonStep';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { Link } from '@navikt/ds-react';
import getLenker from '../../../../lenker';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import datepickerUtils from '@navikt/sif-common-formik-ds/src/components/formik-datepicker/datepickerUtils';
import { nYearsAgo } from '../../dine-barn/dineBarnStepUtils';

const { YesOrNoQuestion, DatePicker } = getTypedFormComponents<
    ArbeidssituasjonFormFields,
    ArbeidssituasjonFormValues,
    ValidationError
>();

interface Props {
    fraværPeriode?: DateRange;
    values: Partial<ArbeidssituasjonFormValues>;
}

const FrilansFormPart: React.FC<Props> = ({ values, fraværPeriode }) => {
    const intl = useIntl();

    const { frilans_erFrilanser, frilans_jobberFortsattSomFrilans, frilans_startdato } = values;

    const erFrilanser = frilans_erFrilanser === YesOrNo.YES;
    const harSluttetSomFrilanser = frilans_jobberFortsattSomFrilans === YesOrNo.NO;

    // TODO Riktig validerig angående søknadsperiode?
    const valgtStartdato = datepickerUtils.getDateFromDateString(frilans_startdato);
    const startetDateRange: DateRange = {
        from: nYearsAgo(80),
        to: fraværPeriode?.to || dateToday,
    };
    const sluttetDateRange: DateRange = {
        from: valgtStartdato || startetDateRange.from || nYearsAgo(80),
        to: dateToday,
    };

    return (
        <>
            <YesOrNoQuestion
                name={ArbeidssituasjonFormFields.frilans_erFrilanser}
                legend={intlHelper(intl, 'frilanser.erFrilanser.spm')}
                description={
                    <ExpandableInfo title={intlHelper(intl, 'step.arbeidssituasjon.frilanser.hjelpetekst.tittel')}>
                        <>
                            {intlHelper(intl, 'step.arbeidssituasjon.frilanser.hjelpetekst')}{' '}
                            <Link href={getLenker(intl.locale).skatteetaten} target="_blank">
                                <FormattedMessage id="step.arbeidssituasjon.frilanser.hjelpetekst.skatteetatenLenke" />
                            </Link>
                        </>
                    </ExpandableInfo>
                }
                validate={getYesOrNoValidator()}
                data-testid="frilans_erFrilanser"
            />
            {erFrilanser && (
                <FormBlock margin="l">
                    <>
                        <FormBlock margin="none">
                            <DatePicker
                                name={ArbeidssituasjonFormFields.frilans_startdato}
                                label={intlHelper(intl, 'frilanser.nårStartet.spm')}
                                dropdownCaption={true}
                                minDate={startetDateRange.from}
                                maxDate={startetDateRange.to}
                                validate={getDateValidator({
                                    required: true,
                                    min: startetDateRange.from,
                                    max: startetDateRange.to,
                                })}
                                data-testid="frilans_startdato"
                            />
                        </FormBlock>
                        <FormBlock>
                            <YesOrNoQuestion
                                name={ArbeidssituasjonFormFields.frilans_jobberFortsattSomFrilans}
                                legend={intlHelper(intl, 'frilanser.jobberFortsatt.spm')}
                                validate={getYesOrNoValidator()}
                                data-testid="frilans_jobberFortsattSomFrilans"
                            />
                        </FormBlock>
                        {harSluttetSomFrilanser && (
                            <FormBlock>
                                <DatePicker
                                    name={ArbeidssituasjonFormFields.frilans_sluttdato}
                                    label={intlHelper(intl, 'frilanser.nårSluttet.spm')}
                                    dropdownCaption={true}
                                    minDate={sluttetDateRange.from}
                                    maxDate={sluttetDateRange.to}
                                    validate={getDateValidator({
                                        required: true,
                                        min: sluttetDateRange.from,
                                        max: sluttetDateRange.to,
                                    })}
                                    data-testid="frilans_sluttdato"
                                />
                            </FormBlock>
                        )}
                    </>
                </FormBlock>
            )}
        </>
    );
};

export default FrilansFormPart;
