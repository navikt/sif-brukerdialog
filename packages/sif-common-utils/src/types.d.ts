export declare type ISODateRange = string;
export declare type ISODuration = string;
export declare type ISODate = string;
export interface DateRange {
    from: Date;
    to: Date;
}
export declare type MaybeDateRange = Partial<DateRange>;
export interface NumberDuration {
    hours: number;
    minutes: number;
}
export declare enum Weekday {
    'monday' = "monday",
    'tuesday' = "tuesday",
    'wednesday' = "wednesday",
    'thursday' = "thursday",
    'friday' = "friday"
}
export declare type DurationWeekdays = {
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
export declare type InputDateDurationMap = {
    [isoDate: ISODate]: {
        hours: string | undefined;
        minutes: string | undefined;
        percentage?: number;
    };
};
export declare type DateDurationMap = {
    [isoDate: ISODate]: {
        hours: string;
        minutes: string;
        percentage?: number;
    };
};
//# sourceMappingURL=types.d.ts.map