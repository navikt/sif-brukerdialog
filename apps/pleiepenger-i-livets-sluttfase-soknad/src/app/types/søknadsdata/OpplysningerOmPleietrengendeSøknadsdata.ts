import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { ÅrsakManglerIdentitetsnummer } from '../ÅrsakManglerIdentitetsnummer';
import { YesOrNoDontKnow } from '../YesOrNoDontKnow';

interface PleietrengendeMedFnr {
    type: 'pleietrengendeMedFnr';
    navn: string;
    pleierDuDenSykeHjemme: boolean;
    flereSokere: YesOrNoDontKnow;
    norskIdentitetsnummer: string;
}

interface PleietrengendeUtenFnr {
    type: 'pleietrengendeUtenFnr';
    navn: string;
    årsakManglerIdentitetsnummer: ÅrsakManglerIdentitetsnummer;
    pleierDuDenSykeHjemme: boolean;
    flereSokere: YesOrNoDontKnow;
    fødselsdato: string;
    pleietrengendeId: Attachment[];
}

export type OpplysningerOmPleietrengendeSøknadsdata = PleietrengendeMedFnr | PleietrengendeUtenFnr;
