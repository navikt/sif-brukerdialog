import { FormSummary } from '@navikt/ds-react';
import React from 'react';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { SummaryList } from '@navikt/sif-common-ui';
import { AppText } from '../../../../i18n';
import { UtenlandsoppholdApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';

export interface Props {
    utenlandsopphold: UtenlandsoppholdApiData[];
    onEdit?: () => void;
}

const UtenlandsoppholdISøkeperiodeOppsummering: React.FC<Props> = ({ utenlandsopphold, onEdit }) => {
    return utenlandsopphold && utenlandsopphold.length > 0 ? (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.utenlandsopphold.titel" />
                </FormSummary.Heading>
                {onEdit && <EditStepLink onEdit={onEdit} />}
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.utenlandsoppholdIPerioden.listetittel" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <SummaryList items={utenlandsopphold} itemRenderer={renderUtenlandsoppholdIPeriodenSummary} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    ) : null;
};

export default UtenlandsoppholdISøkeperiodeOppsummering;
