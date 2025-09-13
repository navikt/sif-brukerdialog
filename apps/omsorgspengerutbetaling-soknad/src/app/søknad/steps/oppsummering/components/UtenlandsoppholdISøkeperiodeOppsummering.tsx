import { FormSummary } from '@navikt/ds-react';
import { SummaryList } from '@navikt/sif-common-ui';
import { AppText } from '../../../../i18n';
import { UtenlandsoppholdApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';

export interface Props {
    utenlandsopphold: UtenlandsoppholdApiData[];
}

const UtenlandsoppholdISøkeperiodeOppsummering = ({ utenlandsopphold }) => {
    return utenlandsopphold && utenlandsopphold.length > 0 ? (
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
    ) : null;
};

export default UtenlandsoppholdISøkeperiodeOppsummering;
