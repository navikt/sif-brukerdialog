import { BarnType } from '@navikt/sif-common-forms-ds';
import { JaNeiSvar, SummaryBlock, SummaryList, SummarySection } from '@navikt/sif-common-ui';
import { ISODateToDate, dateFormatter } from '@navikt/sif-common-utils';
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
                itemRenderer={(barn: ApiBarn) => {
                    return (
                        <>
                            <div>{barn.navn}</div>
                            <div>
                                {text('step.oppsummering.dineBarn.født', {
                                    dato: dateFormatter.compact(ISODateToDate(barn.fødselsdato)),
                                })}
                            </div>
                            {barn.type !== RegistrertBarnTypeApi.fraOppslag ? (
                                <>
                                    <div>
                                        {text('step.oppsummering.dineBarn.id', {
                                            identitetsnummer: barn.identitetsnummer,
                                        })}
                                    </div>
                                    {barn.type === BarnType.fosterbarn && (
                                        <div>{text('step.oppsummering.dineBarn.fosterbarn')}</div>
                                    )}
                                </>
                            ) : undefined}
                        </>
                    );
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
