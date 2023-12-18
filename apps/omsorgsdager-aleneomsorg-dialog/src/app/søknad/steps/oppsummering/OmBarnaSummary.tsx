import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { AnnetBarn, BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { SummarySection, SummaryList } from '@navikt/sif-common-soknad-ds';
export interface AlleBarnSummary {
    navn: string;
    fnr?: string;
    type?: BarnType;
}
interface Props {
    registrertBarn: RegistrertBarn[];
    annetBarn?: AnnetBarn[];
}

const mapRegistrertBarnToAlleBarnSummary = (registrertBarn: RegistrertBarn): AlleBarnSummary => {
    return {
        navn: formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn),
    };
};
const mapAnnetBarnToAlleBarnSummary = (annetBarn: AnnetBarn): AlleBarnSummary => {
    return {
        navn: annetBarn.navn,
        fnr: annetBarn.fnr,
        type: annetBarn.type,
    };
};

const OmBarnaSummary = ({ registrertBarn, annetBarn = [] }: Props) => {
    const intl = useIntl();

    const alleBarn: AlleBarnSummary[] = [
        ...registrertBarn.map((barn) => mapRegistrertBarnToAlleBarnSummary(barn)),
        ...annetBarn.map((barn) => mapAnnetBarnToAlleBarnSummary(barn)),
    ];
    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.deres-felles-barn.header')}>
            <Block margin="l">
                <SummaryList
                    items={alleBarn}
                    itemRenderer={(barn: AlleBarnSummary): string | React.ReactNode => {
                        const { fnr, type, navn } = barn;
                        const barnType =
                            type === BarnType.fosterbarn
                                ? intlHelper(intl, `step.oppsummering.dineBarn.listItem.${type}`)
                                : '';

                        return <>{`${navn} ${fnr || ''} ${barnType}`}</>;
                    }}
                />
            </Block>
        </SummarySection>
    );
};

export default OmBarnaSummary;
