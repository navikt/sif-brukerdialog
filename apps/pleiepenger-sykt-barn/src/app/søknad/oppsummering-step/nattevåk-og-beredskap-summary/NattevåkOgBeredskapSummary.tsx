import { FormSummary } from '@navikt/ds-react';
import { Sitat, TextareaSvar } from '@navikt/sif-common-ui';
import EditStepLink from '../../../components/edit-step-link/EditStepLink';
import { AppText } from '../../../i18n';
import { BeredskapApiData, NattevåkApiData } from '../../../types/søknad-api-data/SøknadApiData';

interface Props {
    nattevåk: NattevåkApiData;
    beredskap: BeredskapApiData;
    onEdit?: () => void;
}

const NattevågOgBeredskapSummary = ({ nattevåk, beredskap, onEdit }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="steg.oppsummering.nattevåkBeredskap.header" />
                </FormSummary.Heading>
                {onEdit && <EditStepLink onEdit={onEdit} />}
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.nattevåkOgBeredskap.nattevåk.spm" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <AppText id={nattevåk.harNattevåk === true ? 'Ja' : 'Nei'} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                {nattevåk.harNattevåk === true && nattevåk.tilleggsinformasjon && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="steg.oppsummering.nattevåkBeredskap.nattevåk.beskrivelse" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <Sitat>
                                <div data-testid="oppsummering-nattevåk-tilleggsinformasjon">
                                    <TextareaSvar text={nattevåk.tilleggsinformasjon} />
                                </div>
                            </Sitat>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.nattevåkOgBeredskap.beredskap.spm" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <AppText id={beredskap.beredskap === true ? 'Ja' : 'Nei'} />
                    </FormSummary.Value>
                </FormSummary.Answer>

                {beredskap.beredskap === true && beredskap.tilleggsinformasjon && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="steg.oppsummering.nattevåkBeredskap.beredskap.beskrivelse" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <Sitat>
                                <div data-testid="oppsummering-beredskap-tilleggsinformasjon">
                                    <TextareaSvar text={beredskap.tilleggsinformasjon} />
                                </div>
                            </Sitat>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default NattevågOgBeredskapSummary;
