import { FormSummary } from '@navikt/ds-react';
import { AppText } from '../../../../i18n';

interface Props {
    harVærtEllerErVernepliktig: boolean;
}

const VernepliktigSummary = ({ harVærtEllerErVernepliktig }: Props) => {
    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <AppText id="oppsummering.arbeidssituasjon.verneplikt.header" />
            </FormSummary.Label>
            <FormSummary.Value>
                <AppText
                    id={
                        harVærtEllerErVernepliktig
                            ? 'oppsummering.arbeidssituasjon.verneplikt.harVærtVernepliktig'
                            : 'oppsummering.arbeidssituasjon.verneplikt.harIkkeVærtVernepliktig'
                    }
                />
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};

export default VernepliktigSummary;
