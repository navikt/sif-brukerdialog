import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { ÅrsakManglerIdentitetsnummer } from '../ÅrsakManglerIdentitetsnummer';

interface PleietrengendeMedFnr {
    type: 'pleietrengendeMedFnr';
    navn: string;
    pleierDuDenSykeHjemme: boolean;
    norskIdentitetsnummer: string;
}

interface PleietrengendeUtenFnr {
    type: 'pleietrengendeUtenFnr';
    navn: string;
    årsakManglerIdentitetsnummer: ÅrsakManglerIdentitetsnummer;
    pleierDuDenSykeHjemme: boolean;
    fødselsdato: string;
    pleietrengendeId: Attachment[];
}

export type OpplysningerOmPleietrengendeSøknadsdata = PleietrengendeMedFnr | PleietrengendeUtenFnr;
