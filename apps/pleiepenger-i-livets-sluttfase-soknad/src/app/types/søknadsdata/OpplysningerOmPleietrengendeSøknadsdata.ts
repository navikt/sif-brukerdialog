import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { ÅrsakManglerIdentitetsnummer } from '../ÅrsakManglerIdentitetsnummer';
import { YesOrNoDontKnow } from '../YesOrNoDontKnow';

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
    pleietrengendeId: Attachment[];
}

export type OpplysningerOmPleietrengendeSøknadsdata = PleietrengendeMedFnr | PleietrengendeUtenFnr;
