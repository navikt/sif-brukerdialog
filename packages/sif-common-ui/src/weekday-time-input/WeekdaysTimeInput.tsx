import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import bemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import { FormikTimeInput } from '@navikt/sif-common-formik-ds/lib';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { Weekday } from '@navikt/sif-common-utils/lib';
import { getWeekdaysTimeInputMessages } from './weekdaysTimeInputMessages';
import './weekdaysTimeInput.scss';

interface Props {
    timeInputNames: {
        [Weekday.monday]: string;
        [Weekday.tuesday]: string;
        [Weekday.wednesday]: string;
        [Weekday.thursday]: string;
        [Weekday.friday]: string;
    };
    labels: {
        [Weekday.monday]: string;
        [Weekday.tuesday]: string;
        [Weekday.wednesday]: string;
        [Weekday.thursday]: string;
        [Weekday.friday]: string;
    };
    disabledDays?: Weekday[];
    hideDisabledDays?: boolean;
    validateDate?: (dagNavn: string, value: any) => ValidationResult<ValidationError>;
}

const bem = bemUtils('weekdaysTimeInput');

const isWeekdayDisabled = (disabledDays: Weekday[] | undefined, dag: Weekday): boolean =>
    disabledDays ? disabledDays.some((d) => d === dag) : false;

const WeekdaysTimeInput = ({
    timeInputNames: inputNames,
    labels,
    validateDate,
    disabledDays,
    hideDisabledDays,
}: Props) => {
    const renderWeekdayTimeInput = (weekday: Weekday, weekdayLabel: string, validationDayName: string) => {
        const disabled = isWeekdayDisabled(disabledDays, weekday);
        return disabled && hideDisabledDays ? null : (
            <FormikTimeInput
                label={weekdayLabel}
                name={inputNames[weekday]}
                disabled={disabled}
                timeInputLayout={{
                    direction: 'vertical',
                    compact: true,
                }}
                validate={validateDate ? (value) => validateDate(validationDayName, value) : undefined}
            />
        );
    };
    const hasHiddenDays = disabledDays !== undefined && disabledDays.length > 0 && hideDisabledDays;
    return (
        <Block margin="l">
            <div className={bem.classNames(bem.block, bem.modifierConditional('withHiddenDays', hasHiddenDays))}>
                {renderWeekdayTimeInput(Weekday.monday, labels.monday, labels.monday)}
                {renderWeekdayTimeInput(Weekday.tuesday, labels.tuesday, labels.tuesday)}
                {renderWeekdayTimeInput(Weekday.wednesday, labels.wednesday, labels.wednesday)}
                {renderWeekdayTimeInput(Weekday.thursday, labels.thursday, labels.thursday)}
                {renderWeekdayTimeInput(Weekday.friday, labels.friday, labels.friday)}
            </div>
        </Block>
    );
};

export default WeekdaysTimeInput;
