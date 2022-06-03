import React, { RefObject } from 'react';
import { InputTime, TestProps } from '../../types';
import './timeInput.scss';
declare type TimeInputChangeFunc = (time: Partial<InputTime> | undefined, isValidTime: boolean) => void;
export declare type TimeInputLayout = 'vertical' | 'horizontal';
export interface TimeInputRefProps {
    refs?: {
        hours?: RefObject<HTMLInputElement>;
        minutes?: RefObject<HTMLInputElement>;
    };
}
export interface TimeInputLayoutProps {
    direction?: TimeInputLayout;
    compact?: boolean;
    justifyContent?: 'left' | 'center' | 'right';
    placeholders?: {
        hours: string;
        minutes: string;
    };
}
interface TimeInputProps extends TimeInputLayoutProps, TestProps, TimeInputRefProps {
    time?: InputTime | Partial<InputTime> | undefined;
    maxHours?: number;
    maxMinutes?: number;
    className?: string;
    disabled?: boolean;
    description?: React.ReactNode;
    onChange: TimeInputChangeFunc;
}
export declare const isValidTime: (time: Partial<InputTime>) => time is InputTime;
declare const TimeInput: React.FunctionComponent<TimeInputProps>;
export default TimeInput;
//# sourceMappingURL=TimeInput.d.ts.map