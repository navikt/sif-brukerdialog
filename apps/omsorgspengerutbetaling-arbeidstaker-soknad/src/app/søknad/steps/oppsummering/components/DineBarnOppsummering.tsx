import { FormSummary } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { BarnType } from '@navikt/sif-common-forms-ds';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { JaNeiSvar, SummaryList } from '@navikt/sif-common-ui';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';

import { AppText, useAppIntl } from '../../../../i18n';
import { ApiBarn } from '../../../../types/søknadApiData/SøknadApiData';
import { mapRegistrertBarnToApiBarn } from '../../../../utils/søknadsdataToApiData/getDineBarnApiDataFromSøknadsdata';

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
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.dineBarn.registrerteBarn" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <SummaryList
                            useAkselList={true}
                            items={registrerteBarnSomIkkeSkalSendesInnMenVises}
                            itemRenderer={(b: ApiBarn) => {
                                return (
                                    <>
                                        <div>{b.navn}</div>
                                        <div>
                                            {text('step.oppsummering.dineBarn.født', {
                                                dato: dateFormatter.compact(ISODateToDate(b.fødselsdato)),
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
                            useAkselList={true}
                            items={barn}
                            itemRenderer={(b: ApiBarn) => {
                                return (
                                    <>
                                        <div>{b.navn}</div>
                                        <div>
                                            {text('step.oppsummering.dineBarn.født', {
                                                dato: dateFormatter.compact(ISODateToDate(b.fødselsdato)),
                                            })}
                                        </div>

                                        <div>
                                            {text('step.oppsummering.dineBarn.id', {
                                                identitetsnummer: b.identitetsnummer,
                                            })}
                                        </div>
                                        {b.type === BarnType.fosterbarn && (
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
            {onEdit && (
                <FormSummary.Footer>
                    <EditStepLink onEdit={onEdit} />
                </FormSummary.Footer>
            )}
        </FormSummary>
    );
};

export default DineBarnOppsummering;
