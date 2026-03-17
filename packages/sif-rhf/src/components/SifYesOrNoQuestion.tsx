import { FieldValues, Path } from 'react-hook-form';

import { SifRadioGroup, SifRadioProp } from './SifRadioGroup';

export enum YesOrNo {
    YES = 'yes',
    NO = 'no',
    UNANSWERED = 'unanswered',
}

type Props<T extends FieldValues> = {
    name: Path<T>;
    legend: string;
    description?: string;
    validate?: (value: string) => string | undefined;
    labels?: {
        yes?: string;
        no?: string;
    };
    reverse?: boolean;
};

export function SifYesOrNoQuestion<T extends FieldValues>({ labels, reverse, ...rest }: Props<T>) {
    const yesLabel = labels?.yes || 'Ja';
    const noLabel = labels?.no || 'Nei';

    const yesRadio: SifRadioProp = { label: yesLabel, value: YesOrNo.YES };
    const noRadio: SifRadioProp = { label: noLabel, value: YesOrNo.NO };

    return <SifRadioGroup<T> {...rest} radios={reverse ? [noRadio, yesRadio] : [yesRadio, noRadio]} />;
}
