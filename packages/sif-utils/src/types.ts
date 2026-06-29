// declare const ISODateBrand: unique symbol;
declare const ISODurationBrand: unique symbol;

/** YYYY-MM-DD/YYYY-MM-DD */
export type ISODateRange = string;

/** PT0H0M - kun timer og minutter */
export type ISODuration = string & {
    readonly [ISODurationBrand]: 'ISODuration';
};

/** YYYY-MM-DD */
// export type ISODate = string & {
//     readonly [ISODateBrand]: 'ISODate';
// };
export type ISODate = string & {
    readonly __brand: 'ISODate';
};

export type ISODateRangeMap<T> = Record<ISODateRange, T>;

export interface DateRange {
    from: ISODate;
    to: ISODate;
}
export interface OpenDateRange {
    from: ISODate;
    to?: ISODate;
}
export type MaybeDateRange = Partial<DateRange>;

export interface NumberDuration {
    hours: number;
    minutes: number;
}

export enum Weekday {
    'monday' = 'monday',
    'tuesday' = 'tuesday',
    'wednesday' = 'wednesday',
    'thursday' = 'thursday',
    'friday' = 'friday',
}

export type DurationWeekdays = {
    [Weekday.monday]?: Duration;
    [Weekday.tuesday]?: Duration;
    [Weekday.wednesday]?: Duration;
    [Weekday.thursday]?: Duration;
    [Weekday.friday]?: Duration;
};

export interface ISODurationWeekdays {
    [Weekday.monday]?: ISODuration;
    [Weekday.tuesday]?: ISODuration;
    [Weekday.wednesday]?: ISODuration;
    [Weekday.thursday]?: ISODuration;
    [Weekday.friday]?: ISODuration;
}

export interface Duration {
    hours: string;
    minutes: string;
    percentage?: number;
}

export type InputDateDurationMap = {
    [isoDate: ISODate]: {
        hours: string | undefined;
        minutes: string | undefined;
        percentage?: number;
    };
};
export type DateDurationMap = {
    [isoDate: ISODate]: Duration;
};

export type DateDurationOrUndefinedMap = {
    [isoDate: ISODate]: Duration | undefined;
};

export interface Time {
    hours: string;
    minutes: string;
}
