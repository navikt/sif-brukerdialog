import { BarnType } from '@navikt/sif-common-forms-ds';
import { JaNeiSvar, SummaryList } from '@navikt/sif-common-ui';
import { ISODateToDate, dateFormatter } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '../../../../i18n';
import { RegistrertBarn } from '../../../../types/RegistrertBarn';
import { ApiBarn } from '../../../../types/søknadApiData/SøknadApiData';
import { mapRegistrertBarnToApiBarn } from '../../../../utils/søknadsdataToApiData/getDineBarnApiDataFromSøknadsdata';
import { FormSummary } from '@navikt/ds-react';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';

interface Props {
    barn: ApiBarn[];
    registrerteBarn: RegistrertBarn[];
    harDeltBosted?: boolean;
    onEdit?: () => void;
}

const DineBarnOppsummering = ({ barn, registrerteBarn, harDeltBosted, onEdit }: Props) => {
    const { text } = useAppIntl();
    const registrerteBarnSomIkkeSkalSendesInnMenVises = registrerteBarn.map(mapRegistrertBarnToApiBarn);
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.dineBarn.tittel" />
                </FormSummary.Heading>
                {onEdit && <EditStepLink onEdit={onEdit} />}
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.dineBarn.registrerteBarn" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <SummaryList
                            items={registrerteBarnSomIkkeSkalSendesInnMenVises}
                            itemRenderer={(barn: ApiBarn) => {
                                return (
                                    <>
                                        <div>{barn.navn}</div>
                                        <div>
                                            {text('step.oppsummering.dineBarn.født', {
                                                dato: dateFormatter.compact(ISODateToDate(barn.fødselsdato)),
                                            })}
                                        </div>
                                    </>
                                );
                            }}
                        />
                    </FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.dineBarn.andreBarn" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <SummaryList
                            items={barn}
                            itemRenderer={(barn: ApiBarn) => {
                                return (
                                    <>
                                        <div>{barn.navn}</div>
                                        <div>
                                            {text('step.oppsummering.dineBarn.født', {
                                                dato: dateFormatter.compact(ISODateToDate(barn.fødselsdato)),
                                            })}
                                        </div>

                                        <div>
                                            {text('step.oppsummering.dineBarn.id', {
                                                identitetsnummer: barn.identitetsnummer,
                                            })}
                                        </div>
                                        {barn.type === BarnType.fosterbarn && (
                                            <div>{text('step.oppsummering.dineBarn.fosterbarn')}</div>
                                        )}
                                    </>
                                );
                            }}
                        />
                    </FormSummary.Value>
                </FormSummary.Answer>

                {harDeltBosted !== undefined && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="step.dineBarn.harDeltBosted.spm" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <JaNeiSvar harSvartJa={harDeltBosted} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default DineBarnOppsummering;
