import { LegeerklæringSøknadsdata } from '@app/types/Soknadsdata';

export type LegeerklæringFormValues = Record<string, never>;

export const getDefaultValues = (): LegeerklæringFormValues => ({});

export const toSøknadsdata = (_: LegeerklæringFormValues): LegeerklæringSøknadsdata => ({});
