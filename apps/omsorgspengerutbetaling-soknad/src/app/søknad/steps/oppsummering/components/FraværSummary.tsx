import { FormSummary } from '@navikt/ds-react';
import { AppText } from '../../../../i18n';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import UtbetalingsperioderOppsummering from './UtbetalingsperioderOppsummering';
import UtenlandsoppholdISøkeperiodeOppsummering from './UtenlandsoppholdISøkeperiodeOppsummering';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';

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
                {onEdit && <EditStepLink onEdit={onEdit} />}
            </FormSummary.Header>
            <FormSummary.Answers>
                <UtbetalingsperioderOppsummering utbetalingsperioder={apiData.utbetalingsperioder} />
                <UtenlandsoppholdISøkeperiodeOppsummering utenlandsopphold={apiData.opphold} />
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default FraværSummary;
