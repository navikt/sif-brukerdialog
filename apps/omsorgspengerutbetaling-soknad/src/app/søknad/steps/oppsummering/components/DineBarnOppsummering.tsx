import { FormSummary } from '@navikt/ds-react';
import { BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { JaNeiSvar, SummaryList } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../../../../i18n';
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
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.dineBarn" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.dineBarn.barn" />
                    </FormSummary.Label>
                    <FormSummary.Value>
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
                    </FormSummary.Value>
                </FormSummary.Answer>

                {harSyktBarn !== undefined && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="step.dineBarn.utvidetRettSykdom.spm" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <JaNeiSvar harSvartJa={harSyktBarn} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {harAleneomsorg !== undefined && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="step.dineBarn.utvidetRettAleneomsorg.spm" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <JaNeiSvar harSvartJa={harAleneomsorg} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {harDekketTiFørsteDagerSelv !== undefined && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="step.dineBarn.bekrefterDektTiDagerSelv.spm" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <JaNeiSvar harSvartJa={harDekketTiFørsteDagerSelv} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default DineBarnOppsummering;
