import { AppIntlShape } from '../i18n';

interface InputType {
    hours: string;
    minutes: string;
}

export const formatTimerOgMinutter = ({ text }: AppIntlShape, time: Partial<InputType>): string => {
    const timer = time.hours || '0';
    const minutter = time.minutes || '0';
    if (minutter === '0') {
        return text('psb.timer', { timer });
    }
    if (timer === '0') {
        return text('psb.minutter', { minutter });
    }
    return text('psb.timerOgMinutter', { timer, minutter });
};
