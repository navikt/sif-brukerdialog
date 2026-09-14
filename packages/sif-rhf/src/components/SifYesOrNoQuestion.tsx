import { FieldValues, Path } from 'react-hook-form';

import { YesOrNo } from '@sif/utils';
import { ReactNode } from 'react';
import { SifRadioGroup, SifRadioProp } from './SifRadioGroup';

export { YesOrNo } from '@sif/utils';

type Props<T extends FieldValues> = {
    name: Path<T>;
    legend: string;
    description?: ReactNode;
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
