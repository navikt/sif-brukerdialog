import { DeltBostedSøknadsdata } from '@app/types/Soknadsdata';

export type DeltBostedFormValues = Record<string, never>;

export const getDefaultValues = (): DeltBostedFormValues => ({});

export const toSøknadsdata = (_: DeltBostedFormValues): DeltBostedSøknadsdata => ({});
