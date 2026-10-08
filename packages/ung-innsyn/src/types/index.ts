export type UttalelseSvaralternativer = {
    harUttalelseLabel: string;
    harIkkeUttalelseLabel: string;
};

/** Brukerens svar i uttalelsesskjemaet, uavhengig av ytelse. Mappes til ytelsens DTO ved innsending. */
export type Uttalelse = {
    harUttalelse: boolean;
    uttalelseFraDeltaker?: string;
};
