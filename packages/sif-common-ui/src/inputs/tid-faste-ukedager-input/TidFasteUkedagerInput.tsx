import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { FormikTimeInput, TestProps } from '@navikt/sif-common-formik-ds';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds/src/validation/types';
import { Weekday } from '@navikt/sif-common-utils';
import classNames from 'classnames';
import { tidFasteUkedagerInputMessages } from './tidFasteUkerdagerInput.messages';
import './tidFasteUkedagerInput.css';

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
    const intl = useIntl();
    const { text } = typedIntlHelper<keyof typeof tidFasteUkedagerInputMessages.nb>(intl);

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
                timeInputLabels={{
                    minutes: text('@ui.tidFasteUkedaterInput.minutter'),
                    hours: text('@ui.tidFasteUkedaterInput.timer'),
                }}
                data-testid={testId ? `${testId}__${weekday}` : undefined}
                validate={validateDag ? (value) => validateDag(validationDayName, value) : undefined}
            />
        );
    };
    const hasHiddenDays = disabledDays !== undefined && disabledDays.length > 0 && hideDisabledDays;
    return (
        <Block margin="l">
            <div className={classNames(bem.block, bem.modifierConditional('withHiddenDays', hasHiddenDays))}>
                {renderWeekdayTimeInput(
                    Weekday.monday,
                    text('@ui.tidFasteUkedaterInput.Mandager'),
                    text('@ui.tidFasteUkedaterInput.mandag'),
                )}
                {renderWeekdayTimeInput(
                    Weekday.tuesday,
                    text('@ui.tidFasteUkedaterInput.Tirsdager'),
                    text('@ui.tidFasteUkedaterInput.tirsdag'),
                )}
                {renderWeekdayTimeInput(
                    Weekday.wednesday,
                    text('@ui.tidFasteUkedaterInput.Onsdager'),
                    text('@ui.tidFasteUkedaterInput.onsdag'),
                )}
                {renderWeekdayTimeInput(
                    Weekday.thursday,
                    text('@ui.tidFasteUkedaterInput.Torsdager'),
                    text('@ui.tidFasteUkedaterInput.torsdag'),
                )}
                {renderWeekdayTimeInput(
                    Weekday.friday,
                    text('@ui.tidFasteUkedaterInput.Fredager'),
                    text('@ui.tidFasteUkedaterInput.fredag'),
                )}
            </div>
        </Block>
    );
};

export default TidFasteUkedagerInput;
