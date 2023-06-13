import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds/lib/modules/samtykke-form/SamtykkeForm';
import { DineBarnFormValues } from '../søknad/steps/dine-barn/DineBarnStep';
import { FraværFormValues } from '../søknad/steps/fravær/FraværStep';
import { LegeerklæringFormValues } from '../søknad/steps/legeerklæring/LegeerklæringForm';
import { ArbeidssituasjonFormValues } from '../søknad/steps/arbeidssituasjon/ArbeidssituasjonStep';
import { FraværFraFormValues } from '../søknad/steps/fravær-fra/FraværFraStep';
import { MedlemskapFormValues } from '../søknad/steps/medlemskap/MedlemskapStep';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';
import { StepId } from './StepId';
import { SmittevernDokumenterFormValues } from '../søknad/steps/smittevern-dokumenter/SmittevernDokumenterForm';
import { StengtBhgSkoleDokumenterFormValues } from '../søknad/steps/stengt-bhg-skole-dokumenter/StengtBhgSkoleDokumenterForm';

export interface StepFormValues {
    [StepId.VELKOMMEN]?: SamtykkeFormValues;
    [StepId.DINE_BARN]?: DineBarnFormValues;
    [StepId.FRAVÆR]?: FraværFormValues;
    [StepId.DOKUMENTER_SMITTEVERNHENSYN]?: SmittevernDokumenterFormValues;
    [StepId.LEGEERKLÆRING]?: LegeerklæringFormValues;
    [StepId.DOKUMENTER_STENGT_SKOLE_BHG]?: StengtBhgSkoleDokumenterFormValues;
    [StepId.ARBEIDSSITUASJON]?: ArbeidssituasjonFormValues;
    [StepId.FRAVÆR_FRA]?: FraværFraFormValues;
    [StepId.MEDLEMSKAP]?: MedlemskapFormValues;
    [StepId.OPPSUMMERING]?: OppsummeringFormValues;
    [StepId.KVITTERING]?: undefined;
}
