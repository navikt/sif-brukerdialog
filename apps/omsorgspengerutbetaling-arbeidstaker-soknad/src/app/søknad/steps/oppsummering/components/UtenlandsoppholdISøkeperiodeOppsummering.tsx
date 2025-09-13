import { FormSummary } from '@navikt/ds-react';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { SummaryList } from '@navikt/sif-common-ui';
import { AppText } from '../../../../i18n';
import { UtenlandsoppholdApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';

export interface Props {
    utenlandsopphold: UtenlandsoppholdApiData[];
    onEdit?: () => void;
}

const UtenlandsoppholdISøkeperiodeOppsummering = ({ utenlandsopphold, onEdit }) => {
    return utenlandsopphold && utenlandsopphold.length > 0 ? (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.utenlandsopphold.titel" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.utenlandsoppholdIPerioden.listetittel" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <SummaryList
                            useAkselList={true}
                            items={utenlandsopphold}
                            itemRenderer={renderUtenlandsoppholdIPeriodenSummary}
                        />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
            {onEdit && (
                <FormSummary.Footer>
                    <EditStepLink onEdit={onEdit} />
                </FormSummary.Footer>
            )}
        </FormSummary>
    ) : null;
};

export default UtenlandsoppholdISøkeperiodeOppsummering;
