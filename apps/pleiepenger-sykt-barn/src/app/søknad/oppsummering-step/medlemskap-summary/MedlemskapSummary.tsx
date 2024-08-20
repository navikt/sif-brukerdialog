import { FormSummary } from '@navikt/ds-react';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { JaNeiSvar, SummaryList } from '@navikt/sif-common-ui';
import { AppText } from '../../../i18n';
import { MedlemskapApiData } from '../../../types/søknad-api-data/SøknadApiData';
import { renderUtenlandsoppholdSummary } from '../summaryItemRenderers';

export interface Props {
    medlemskap: MedlemskapApiData;
    onEdit?: () => void;
}

const MedlemskapSummary: React.FC<Props> = ({ medlemskap, onEdit }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="medlemskap.summary.header" />
                </FormSummary.Heading>
                {onEdit && <EditStepLink onEdit={onEdit} />}
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.oppsummering.utlandetSiste12.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiSvar harSvartJa={medlemskap.harBoddIUtlandetSiste12Mnd} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                {medlemskap.harBoddIUtlandetSiste12Mnd === true && medlemskap.utenlandsoppholdSiste12Mnd.length > 0 && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="steg.oppsummering.utlandetSiste12.liste.header" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <SummaryList
                                useAkselList={true}
                                items={medlemskap.utenlandsoppholdSiste12Mnd}
                                itemRenderer={renderUtenlandsoppholdSummary}
                            />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.oppsummering.utlandetNeste12.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiSvar harSvartJa={medlemskap.skalBoIUtlandetNeste12Mnd} />
                    </FormSummary.Value>
                </FormSummary.Answer>

                {medlemskap.skalBoIUtlandetNeste12Mnd === true && medlemskap.utenlandsoppholdNeste12Mnd.length > 0 && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="steg.oppsummering.utlandetSiste12.liste.header" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <SummaryList
                                useAkselList={true}
                                items={medlemskap.utenlandsoppholdNeste12Mnd}
                                itemRenderer={renderUtenlandsoppholdSummary}
                            />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default MedlemskapSummary;
