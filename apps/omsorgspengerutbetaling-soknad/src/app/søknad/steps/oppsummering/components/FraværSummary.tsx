import { FormSummary } from '@navikt/ds-react';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { AppText } from '../../../../i18n';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import UtbetalingsperioderOppsummering from './UtbetalingsperioderOppsummering';
import UtenlandsoppholdISøkeperiodeOppsummering from './UtenlandsoppholdISøkeperiodeOppsummering';

interface Props {
    apiData: SøknadApiData;
    onEdit?: () => void;
}

const FraværSummary = ({ apiData, onEdit }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.utbetalinger.header" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <UtbetalingsperioderOppsummering utbetalingsperioder={apiData.utbetalingsperioder} />
                <UtenlandsoppholdISøkeperiodeOppsummering utenlandsopphold={apiData.opphold} />
            </FormSummary.Answers>
            {onEdit && (
                <FormSummary.Footer>
                    <EditStepLink onEdit={onEdit} />
                </FormSummary.Footer>
            )}
        </FormSummary>
    );
};

export default FraværSummary;
