import React from 'react';
import { useIntl } from 'react-intl';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { Weekday } from '@navikt/sif-common-utils';
import { LabelInputInfoLayout } from '../../common';
import { getTidFasteUkerdagerInputMessages } from '../../tid/tid-faste-ukedager-input/tidFasteUkerdagerInputMessages';
import './arbeidstidFasteUkedagerInput.less';
import {
    FormikInputGroup,
    FormikTimeInput,
    TestProps,
    ValidationError,
    ValidationResult,
} from '@navikt/sif-common-formik-ds/lib';

export interface ArbeidstidUkeTekster {
    dag: React.ReactNode;
    jobber: React.ReactNode;
    ariaLabelTidInput: (dagNavn: string) => React.ReactNode;
}
interface OwnProps {
    fieldName: string;
    utilgjengeligeUkedager?: Weekday[];
    skjulUtilgjengeligeUkedager?: boolean;
    tidPerDagValidator?: (weekday: Weekday, value: any) => ValidationResult<ValidationError>;
    tekst: ArbeidstidUkeTekster;
}

type Props = OwnProps & TestProps;

const bem = bemUtils('arbeidstidFasteUkedagerInput');

const ArbeidstidFasteUkedagerInput: React.FunctionComponent<Props> = ({
    fieldName,
    tidPerDagValidator,
    utilgjengeligeUkedager,
    skjulUtilgjengeligeUkedager,
    tekst,
    'data-testid': testId,
}: Props) => {
    const txt = getTidFasteUkerdagerInputMessages(useIntl().locale);

    const renderWeekdayTimeInput = (weekday: Weekday, weekdayLabel: string) => {
        const erUtilgjengeligUkedag = utilgjengeligeUkedager?.some((d) => d === weekday);
        if (erUtilgjengeligUkedag && skjulUtilgjengeligeUkedager) {
            return null;
        }

        return (
            <FormikInputGroup
                key={weekday}
                legend={<span className="sr-only">{weekdayLabel}</span>}
                name={`arbeidstid_${weekday}`}
                className={bem.element('dag', erUtilgjengeligUkedag ? 'utilgjengelig' : undefined)}>
                <LabelInputInfoLayout
                    label={weekdayLabel}
                    input={
                        <FormikTimeInput
                            aria-describedby="iPerioden"
                            name={`${fieldName}.${weekday}`}
                            label={
                                <span className={'sr-only'}>{tekst.ariaLabelTidInput(weekdayLabel.toLowerCase())}</span>
                            }
                            timeInputLayout={{
                                direction: 'horizontal',
                            }}
                            data-testid={testId ? `${testId}__${weekday}` : undefined}
                            validate={tidPerDagValidator ? (value) => tidPerDagValidator(weekday, value) : undefined}
                        />
                    }
                />
            </FormikInputGroup>
        );
    };
    return (
        <div className={bem.classNames(bem.block)}>
            {renderWeekdayTimeInput(Weekday.monday, txt.Mandager)}
            {renderWeekdayTimeInput(Weekday.tuesday, txt.Tirsdager)}
            {renderWeekdayTimeInput(Weekday.wednesday, txt.Onsdager)}
            {renderWeekdayTimeInput(Weekday.thursday, txt.Torsdager)}
            {renderWeekdayTimeInput(Weekday.friday, txt.Fredager)}
        </div>
    );
};

export default ArbeidstidFasteUkedagerInput;
