import { FormattedMessage, useIntl } from 'react-intl';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { dateToday } from '@navikt/sif-common-utils';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getDateValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { ValidationError, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidssituasjonFormFields, ArbeidssituasjonFormValues } from '../ArbeidssituasjonStep';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import { Link } from '@navikt/ds-react';
import getLenker from '../../../../lenker';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';

const { YesOrNoQuestion, DatePicker } = getTypedFormComponents<
    ArbeidssituasjonFormFields,
    ArbeidssituasjonFormValues,
    ValidationError
>();

interface Props {
    values: Partial<ArbeidssituasjonFormValues>;
}

const FrilansFormPart: React.FC<Props> = ({ values }) => {
    const intl = useIntl();

    const { frilans_erFrilanser, frilans_jobberFortsattSomFrilans, frilans_startdato } = values;

    const erFrilanser = frilans_erFrilanser === YesOrNo.YES;
    const harSluttetSomFrilanser = frilans_jobberFortsattSomFrilans === YesOrNo.NO;

    // TODO Riktig validerig angående søknadsperiode?

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
            />
            {erFrilanser && (
                <FormBlock margin="l">
                    <>
                        <FormBlock margin="none">
                            <DatePicker
                                name={ArbeidssituasjonFormFields.frilans_startdato}
                                label={intlHelper(intl, 'frilanser.nårStartet.spm')}
                                showYearSelector={true}
                                maxDate={dateToday}
                                validate={getDateValidator({
                                    required: true,
                                    max: dateToday,
                                })}
                            />
                        </FormBlock>
                        <FormBlock>
                            <YesOrNoQuestion
                                name={ArbeidssituasjonFormFields.frilans_jobberFortsattSomFrilans}
                                legend={intlHelper(intl, 'frilanser.jobberFortsatt.spm')}
                                validate={getYesOrNoValidator()}
                            />
                        </FormBlock>
                        {harSluttetSomFrilanser && (
                            <FormBlock>
                                <DatePicker
                                    name={ArbeidssituasjonFormFields.frilans_sluttdato}
                                    label={intlHelper(intl, 'frilanser.nårSluttet.spm')}
                                    showYearSelector={true}
                                    minDate={datepickerUtils.getDateFromDateString(frilans_startdato)}
                                    maxDate={dateToday}
                                    validate={getDateValidator({
                                        required: true,
                                        min: datepickerUtils.getDateFromDateString(frilans_startdato),
                                        max: dateToday,
                                    })}
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
