import { useIntl } from 'react-intl';
import { Weekday } from '@navikt/sif-common-utils';
import { getTidFasteUkerdagerInputMessages } from './tidFasteUkerdagerInputMessages';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import './tidFasteUkedagerInput.less';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { FormikTimeInput, TestProps, ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds';

interface OwnProps {
    name: string;
    disabledDays?: Weekday[];
    hideDisabledDays?: boolean;
    validateDag?: (dagNavn: string, value: any) => ValidationResult<ValidationError>;
}

export type TidFasteUkedagerInputProps = OwnProps & TestProps;

const bem = bemUtils('tidFasteUkedagerInput');

const isWeekdayDisabled = (disabledDays: Weekday[] | undefined, dag: Weekday): boolean =>
    disabledDays ? disabledDays.some((d) => d === dag) : false;

const TidFasteUkedagerInput = ({
    name,
    validateDag,
    disabledDays,
    hideDisabledDays,
    'data-testid': testId,
}: TidFasteUkedagerInputProps) => {
    const txt = getTidFasteUkerdagerInputMessages(useIntl().locale);

    const renderWeekdayTimeInput = (weekday: Weekday, weekdayLabel: string, validationDayName: string) => {
        const disabled = isWeekdayDisabled(disabledDays, weekday);
        return disabled && hideDisabledDays ? null : (
            <FormikTimeInput
                label={weekdayLabel}
                name={`${name}.${weekday}`}
                disabled={disabled}
                timeInputLayout={{
                    direction: 'vertical',
                    compact: true,
                }}
                data-testid={testId ? `${testId}__${weekday}` : undefined}
                validate={validateDag ? (value) => validateDag(validationDayName, value) : undefined}
            />
        );
    };
    const hasHiddenDays = disabledDays !== undefined && disabledDays.length > 0 && hideDisabledDays;
    return (
        <Block margin="l">
            <div className={bem.classNames(bem.block, bem.modifierConditional('withHiddenDays', hasHiddenDays))}>
                {renderWeekdayTimeInput(Weekday.monday, txt.Mandager, txt.mandag)}
                {renderWeekdayTimeInput(Weekday.tuesday, txt.Tirsdager, txt.tirsdag)}
                {renderWeekdayTimeInput(Weekday.wednesday, txt.Onsdager, txt.onsdag)}
                {renderWeekdayTimeInput(Weekday.thursday, txt.Torsdager, txt.torsdag)}
                {renderWeekdayTimeInput(Weekday.friday, txt.Fredager, txt.fredag)}
            </div>
        </Block>
    );
};

export default TidFasteUkedagerInput;
