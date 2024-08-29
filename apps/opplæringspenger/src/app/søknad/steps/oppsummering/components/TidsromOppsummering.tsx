import { FormSummary } from '@navikt/ds-react';
import EditStepLink from '@navikt/sif-common-soknad-ds/src/components/edit-step-link/EditStepLink';
import { AppText } from '../../../../i18n';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import ValgteDagerMedPleie from './ValgteDagerMedPleie';

interface Props {
    dagerMedPleie: Date[];
    apiData: SøknadApiData;
    onEdit?: () => void;
}

const TidsromOppsummering = ({ dagerMedPleie, onEdit }: Props) => {
    return (
        <>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">
                        <AppText id="steg.oppsummeringtidsrom.header" />
                    </FormSummary.Heading>
                    {onEdit && <EditStepLink onEdit={onEdit} />}
                </FormSummary.Header>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText
                                id="steg.oppsummeringtidsrom.valgteDager.header"
                                values={{ dager: dagerMedPleie.length }}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <ValgteDagerMedPleie dagerMedPleie={dagerMedPleie} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
            </FormSummary>
        </>
    );
};

export default TidsromOppsummering;
