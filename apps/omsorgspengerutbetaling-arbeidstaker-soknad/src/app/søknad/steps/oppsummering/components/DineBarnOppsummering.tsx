import { BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { JaNeiSvar, SummaryBlock, SummaryList, SummarySection } from '@navikt/sif-common-ui';
import { useAppIntl } from '../../../../i18n';
import { RegistrertBarn } from '../../../../types/RegistrertBarn';
import { ApiBarn, RegistrertBarnTypeApi } from '../../../../types/søknadApiData/SøknadApiData';
import { mapRegistrertBarnToApiBarn } from '../../../../utils/søknadsdataToApiData/getDineBarnApiDataFromSøknadsdata';

interface Props {
    barn: ApiBarn[];
    registrerteBarn: RegistrertBarn[];
    harDeltBosted?: boolean;
}

const DineBarnOppsummering = ({ barn, registrerteBarn, harDeltBosted }: Props) => {
    const { text } = useAppIntl();
    const registrerteBarnSomIkkeSkalSendesInnMenVises = registrerteBarn.map(mapRegistrertBarnToApiBarn);
    return (
        <SummarySection header={text('step.oppsummering.dineBarn.tittel')}>
            <SummaryList
                items={[...registrerteBarnSomIkkeSkalSendesInnMenVises, ...barn]}
                itemRenderer={({ identitetsnummer, navn, type }: ApiBarn) => {
                    const fnr = identitetsnummer ? identitetsnummer : '';
                    const barnType =
                        type !== BarnType.annet && type !== RegistrertBarnTypeApi.fraOppslag
                            ? text(`step.oppsummering.dineBarn.listItem.årsak.${type}`)
                            : '';
                    const punktum = type === RegistrertBarnTypeApi.fraOppslag ? '.' : '';
                    return <>{`${navn}${punktum} ${fnr} ${barnType}`}</>;
                }}
            />
            {harDeltBosted !== undefined && (
                <SummaryBlock header={text('step.dineBarn.harDeltBosted.spm')}>
                    <JaNeiSvar harSvartJa={harDeltBosted} />
                </SummaryBlock>
            )}
        </SummarySection>
    );
};

export default DineBarnOppsummering;
