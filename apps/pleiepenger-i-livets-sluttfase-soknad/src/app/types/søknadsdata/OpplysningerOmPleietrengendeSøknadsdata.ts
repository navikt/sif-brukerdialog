import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { YesOrNoDontKnow } from '../YesOrNoDontKnow';
import { ÅrsakManglerIdentitetsnummer } from '../ÅrsakManglerIdentitetsnummer';

interface PleietrengendeMedFnr {
    type: 'pleietrengendeMedFnr';
    navn: string;
    flereSokere: YesOrNoDontKnow;
    norskIdentitetsnummer: string;
}

interface PleietrengendeUtenFnr {
    type: 'pleietrengendeUtenFnr';
    navn: string;
    årsakManglerIdentitetsnummer: ÅrsakManglerIdentitetsnummer;
    flereSokere: YesOrNoDontKnow;
    fødselsdato: string;
    pleietrengendeId: Vedlegg[];
}

export type OpplysningerOmPleietrengendeSøknadsdata = PleietrengendeMedFnr | PleietrengendeUtenFnr;
