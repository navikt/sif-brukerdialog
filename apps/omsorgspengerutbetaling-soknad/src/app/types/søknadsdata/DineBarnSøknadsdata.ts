import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';

interface DineBarnMinstEtt12årEllerYngre {
    type: 'minstEtt12årEllerYngre';
    andreBarn: AnnetBarn[];
    harDekketTiFørsteDagerSelv: true;
}

interface DineBarnAlleBarnEldre12år {
    type: 'alleBarnEldre12år';
    andreBarn: AnnetBarn[];
    harUtvidetRett: YesOrNo.YES;
    harUtvidetRettFor: string[];
}

export type DineBarnSøknadsdata = DineBarnMinstEtt12årEllerYngre | DineBarnAlleBarnEldre12år;
