import { prettifyDate } from '@navikt/sif-common-utils';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/types';
import dayjs from 'dayjs';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DineBarnFormValues } from './DineBarnStep';
import { DineBarnSøknadsdata } from '../../../types/søknadsdata/DineBarnSøknadsdata';
import { IntlShape } from 'react-intl';

export const minstEtBarn12årIårellerYngre = (
    registrertBarn: RegistrertBarn[],
    andreBarn: AnnetBarn[]
): boolean | undefined => {
    if (registrertBarn.length > 0 || andreBarn.length > 0) {
        const barn12ellerYngre = registrertBarn.some((barn) => dayjs().year() - dayjs(barn.fødselsdato).year() <= 12);
        const andreBarn12ellerYngre = andreBarn.some((barn) => dayjs().year() - dayjs(barn.fødselsdato).year() <= 12);
        return barn12ellerYngre || andreBarn12ellerYngre;
    }
    return undefined;
};

export const getBarnOptions = (registrertBarn: RegistrertBarn[] = [], andreBarn: AnnetBarn[] = []) => {
    return [
        ...registrertBarn.map((barnet) => ({
            label: `${formatName(barnet.fornavn, barnet.etternavn)} ${prettifyDate(barnet.fødselsdato)}`,
            value: barnet.aktørId,
        })),
        ...andreBarn.map((barnet) => ({
            label: `${barnet.navn} ${prettifyDate(barnet.fødselsdato)} `,
            value: barnet.fnr,
        })),
    ];
};

export const barnItemLabelRenderer = (barnet: RegistrertBarn, intl: IntlShape) => (
    <div style={{ display: 'flex' }}>
        <span style={{ order: 1 }}>
            {intlHelper(intl, 'step.omBarna.født')} {prettifyDate(barnet.fødselsdato)}
        </span>
        <span style={{ order: 2, paddingLeft: '1rem', justifySelf: 'flex-end' }}>
            {formatName(barnet.fornavn, barnet.etternavn, barnet.mellomnavn)}
        </span>
    </div>
);

export const getDineBarnSøknadsdataFromFormValues = (
    values: DineBarnFormValues,
    { registrerteBarn = [] }: Partial<SøknadContextState>
): DineBarnSøknadsdata | undefined => {
    const { andreBarn = [] } = values;

    if (minstEtBarn12årIårellerYngre(registrerteBarn, andreBarn) === true) {
        const { harDekketTiFørsteDagerSelv } = values;
        if (harDekketTiFørsteDagerSelv !== true) {
            return undefined;
        }
        return {
            type: 'minstEtt12årEllerYngre',
            andreBarn,
            harDekketTiFørsteDagerSelv,
        };
    }
    if (minstEtBarn12årIårellerYngre(registrerteBarn, andreBarn) === false) {
        const { harUtvidetRett, harUtvidetRettFor } = values;
        if (harUtvidetRett !== YesOrNo.YES || harUtvidetRettFor === undefined || harUtvidetRettFor.length === 0) {
            return undefined;
        }
        return {
            type: 'alleBarnEldre12år',
            andreBarn,
            harUtvidetRett,
            harUtvidetRettFor,
        };
    }
    return undefined;
};
