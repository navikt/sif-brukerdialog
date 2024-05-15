import { BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { JaNeiSvar, SummaryBlock, SummaryList, SummarySection } from '@navikt/sif-common-ui';
import { useAppIntl } from '../../../../i18n';
import { RegistrertBarn } from '../../../../types/RegistrertBarn';
import { ApiBarn, RegistrertBarnTypeApi } from '../../../../types/søknadApiData/SøknadApiData';
import { mapRegistrertBarnToApiBarn } from '../../../../utils/søknadsdataToApiData/getDineBarnApiDataFromSøknadsdata';

interface Props {
    barn: ApiBarn[];
    registrerteBarn: RegistrertBarn[];
    harSyktBarn?: boolean;
    harAleneomsorg?: boolean;
    harDekketTiFørsteDagerSelv?: boolean;
}

const DineBarnOppsummering = ({
    barn,
    registrerteBarn,
    harSyktBarn,
    harAleneomsorg,
    harDekketTiFørsteDagerSelv,
}: Props) => {
    const { text } = useAppIntl();
    const registrerteBarnSomIkkeSkalSendesInnMenVises = registrerteBarn.map(mapRegistrertBarnToApiBarn);
    return (
        <SummarySection header={text('step.oppsummering.dineBarn')}>
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
            {harSyktBarn !== undefined && (
                <SummaryBlock header={text('step.dineBarn.utvidetRettSykdom.spm')}>
                    <JaNeiSvar harSvartJa={harSyktBarn} />
                </SummaryBlock>
            )}
            {harAleneomsorg !== undefined && (
                <SummaryBlock header={text('step.dineBarn.utvidetRettAleneomsorg.spm')}>
                    <JaNeiSvar harSvartJa={harAleneomsorg} />
                </SummaryBlock>
            )}
            {harDekketTiFørsteDagerSelv !== undefined && (
                <SummaryBlock header={text('step.dineBarn.bekrefterDektTiDagerSelv.spm')}>
                    <JaNeiSvar harSvartJa={harDekketTiFørsteDagerSelv} />
                </SummaryBlock>
            )}
        </SummarySection>
    );
};

export default DineBarnOppsummering;
