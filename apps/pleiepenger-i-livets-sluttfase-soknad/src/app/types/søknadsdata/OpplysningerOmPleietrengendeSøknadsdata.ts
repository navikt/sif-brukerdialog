import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { ÅrsakManglerIdentitetsnummer } from '../ÅrsakManglerIdentitetsnummer';

interface PleietrengendeMedFnr {
    type: 'pleietrengendeMedFnr';
    navn: string;
    norskIdentitetsnummer: string;
}

interface PleietrengendeUtenFnr {
    type: 'pleietrengendeUtenFnr';
    navn: string;
    årsakManglerIdentitetsnummer: ÅrsakManglerIdentitetsnummer;
    fødselsdato: string;
    pleietrengendeId: Attachment[];
}

export type OpplysningerOmPleietrengendeSøknadsdata = PleietrengendeMedFnr | PleietrengendeUtenFnr;
