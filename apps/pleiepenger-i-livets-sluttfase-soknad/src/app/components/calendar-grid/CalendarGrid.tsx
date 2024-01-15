import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { DateRange } from '@navikt/sif-common-formik-ds';
import {
    dateFormatter,
    dateToISODate,
    getDatesInDateRange,
    getDatesInMonth,
    isDateInDates,
} from '@navikt/sif-common-utils/';
import classNames from 'classnames';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import utc from 'dayjs/plugin/utc';
import { groupBy } from 'lodash';
import { useElementWidthIsWithinRange } from '../../hooks/useElementWidthIsWithinRange';
import { hasIncreasedFontSize } from '../../utils/hasIncreasedFontSize';
import CalendarGridDate from './CalendarGridDate';
import './calendarGrid.less';

dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

interface WeekToRender {
    weekNumber: number;
    dates: Date[];
}

interface Props {
    month: DateRange;
    renderAsList?: boolean;
    disabledDates?: Date[];
    disabledDateInfo?: string;
    hideEmptyContentInListMode?: boolean;
    hideWeeksWithOnlyDisabledContent?: boolean;
    onDateClick?: (date: Date) => void;
    dateContentRenderer: (date: Date, isDisabled?: boolean) => React.ReactNode;
    dateRendererShort?: (date: Date) => React.ReactNode;
    dateRendererFull?: (date: Date) => React.ReactNode;
    allDaysInWeekDisabledContentRenderer?: () => React.ReactNode;
}

const getFullWeeksForDates = (dates: Date[], month: Date): Date[] => {
    const dayOfWeek = dates[0].getUTCDay();
    const firstDateInWeek = dayjs(dates[0]).startOf('isoWeek').toDate();
    if (dayOfWeek > 0 && dayjs(firstDateInWeek).isSame(month, 'month') === false) {
        return [
            ...getDatesInDateRange({ from: firstDateInWeek, to: dayjs(dates[0]).subtract(1, 'day').toDate() }, true),
            ...dates,
        ];
    }
    return dates;
};

const getWeeks = (dates: Date[], month: Date): WeekToRender[] => {
    const datesToRender = getFullWeeksForDates(dates, month);
    const weeksAndDays = groupBy(datesToRender, (date) => `week_${dayjs(date).isoWeek()}`);
    const weeks: WeekToRender[] = [];
    Object.keys(weeksAndDays).forEach((key) => {
        const weekDates = weeksAndDays[key];
        const weekHasDatesInMonth = weekDates.some((d) => dayjs(d).isSame(month, 'month'));
        if (weekHasDatesInMonth && weekDates.length > 0) {
            weeks.push({
                weekNumber: dayjs(weekDates[0]).isoWeek(),
                dates: weekDates,
            });
        }
    });
    return weeks;
};

const getMinWidthForGridView = () => {
    return hasIncreasedFontSize() ? 600 : 500;
};

const bem = bemUtils('calendarGrid');

const CalendarGrid: React.FunctionComponent<Props> = ({
    month,
    disabledDates,
    disabledDateInfo,
    renderAsList,
    hideEmptyContentInListMode,
    hideWeeksWithOnlyDisabledContent,
    onDateClick,
    dateContentRenderer,
    dateRendererShort = dateFormatter.compact,
    dateRendererFull = dateFormatter.dayDateMonth,
    allDaysInWeekDisabledContentRenderer,
}) => {
    const weekdatesInMonth = getDatesInMonth(month.from, true);
    const weeks = getWeeks(weekdatesInMonth, month.from);
    const calendarGridRef = useRef(null);

    const isTooNarrowForGridLayout = useElementWidthIsWithinRange(calendarGridRef, {
        min: 0,
        max: getMinWidthForGridView(),
    });

    const doRenderAsList = isTooNarrowForGridLayout || renderAsList;

    const renderDate = (date: Date) => {
        const dateKey = date.toDateString();
        const dateIsDisabled = isDateInDates(date, disabledDates);
        const renderAsButton = onDateClick !== undefined && dateIsDisabled === false;

        const ButtonOrDivComponent = renderAsButton ? 'button' : 'div';
        return dayjs(date).isSame(month.from, 'month') === false ? (
            <div key={dateKey} aria-hidden={true} className={classNames(bem.element('day', 'outsideMonth'))} />
        ) : (
            <ButtonOrDivComponent
                key={dateKey}
                {...(renderAsButton
                    ? {
                          onClick: (evt) => {
                              evt.stopPropagation();
                              evt.preventDefault();
                              onDateClick(date);
                          },
                          type: 'button',
                      }
                    : {})}
                data-testid={`calendar-grid-date-${dateToISODate(date)}`}
                title={dateIsDisabled ? disabledDateInfo : undefined}
                aria-hidden={dateIsDisabled}
                className={classNames(
                    bem.child('day').block,
                    bem.child('day').modifierConditional('disabled', dateIsDisabled),
                    bem.child('day').modifierConditional('button', renderAsButton),
                )}>
                <CalendarGridDate
                    date={date}
                    dateRendererFull={dateRendererFull}
                    dateRendererShort={dateRendererShort}
                />
                <div className={bem.child('day').element('content')}>{dateContentRenderer(date, dateIsDisabled)}</div>
            </ButtonOrDivComponent>
        );
    };

    const renderWeek = (week: WeekToRender) => {
        const datesInWeek = week.dates;
        const weekNum = week.weekNumber;
        const areAllDaysInWeekDisabledOrOutsideMonth =
            datesInWeek.filter(
                (date) =>
                    isDateInDates(date, disabledDates) === true || dayjs(date).isSame(month.from, 'month') === false,
            ).length === datesInWeek.length;

        if (hideWeeksWithOnlyDisabledContent && areAllDaysInWeekDisabledOrOutsideMonth) {
            return null;
        }
        return [
            <div
                key={week.weekNumber}
                data-testid={`calendar-grid-week-number-${week.weekNumber}`}
                aria-hidden={true}
                className={bem.element('weekNum', areAllDaysInWeekDisabledOrOutsideMonth ? 'empty' : undefined)}>
                <span className={bem.element('weekNum_label')} role="presentation" aria-hidden={true}>
                    <FormattedMessage id="calendarGrid.Uke" /> {` `}
                </span>
                <span>
                    <span className="sr-only">Uke </span>
                    {weekNum}
                </span>
                {areAllDaysInWeekDisabledOrOutsideMonth && allDaysInWeekDisabledContentRenderer ? (
                    <div className={bem.element('allWeekDisabledContent')}>
                        {allDaysInWeekDisabledContentRenderer()}
                    </div>
                ) : undefined}
            </div>,
            datesInWeek.map(renderDate),
        ];
    };
    return (
        <div
            ref={calendarGridRef}
            className={classNames(
                bem.block,
                bem.modifierConditional('hideEmptyContentInListMode', hideEmptyContentInListMode),
                bem.modifier(doRenderAsList ? 'list' : 'grid'),
            )}>
            <span aria-hidden={true} className={bem.element('dayHeader', 'week')}>
                <FormattedMessage id="calendarGrid.Uke" />
            </span>
            <span aria-hidden={true} className={bem.element('dayHeader')}>
                <FormattedMessage id="calendarGrid.Mandag" />
            </span>
            <span aria-hidden={true} className={bem.element('dayHeader')}>
                <FormattedMessage id="calendarGrid.Tirsdag" />
            </span>
            <span aria-hidden={true} className={bem.element('dayHeader')}>
                <FormattedMessage id="calendarGrid.Onsdag" />
            </span>
            <span aria-hidden={true} className={bem.element('dayHeader')}>
                <FormattedMessage id="calendarGrid.Torsdag" />
            </span>
            <span aria-hidden={true} className={bem.element('dayHeader')}>
                <FormattedMessage id="calendarGrid.Fredag" />
            </span>
            {weeks.map(renderWeek)}
        </div>
    );
};

export default CalendarGrid;
