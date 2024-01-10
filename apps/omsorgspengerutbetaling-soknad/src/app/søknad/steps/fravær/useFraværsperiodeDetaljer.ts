import { useCallback, useState } from 'react';
import { DateRange } from '@navikt/sif-common-utils';
import { FraværSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import fraværStepUtils from './FraværStepUtils';

export const useFraværsperiodeDetaljer = (fravær?: FraværSøknadsdata) => {
    const { getFraværsdager, getFraværsperioder, getGyldigTidsromForFravær, getÅrstallFromFravær } = fraværStepUtils;

    /** Årstall som bruker kan velge fravær for. Når ett år er valgt, kan kun andre dager samme år velges */
    const [årstall, setÅrstall] = useState<number | undefined>();
    const [gyldigTidsrom, setGyldigTidsrom] = useState<DateRange>(
        getGyldigTidsromForFravær(getÅrstallFromFravær(getFraværsdager(fravær), getFraværsperioder(fravær))),
    );

    const setFraværsår = useCallback(
        (årstall: number | undefined) => {
            setÅrstall(årstall);
            setGyldigTidsrom(fraværStepUtils.getGyldigTidsromForFravær(årstall));
        },
        [setÅrstall],
    );
    return { årstall, gyldigTidsrom, setFraværsår };
};
