import { FormSummary } from '@navikt/ds-react';
import { AppText } from '../../../../i18n';

interface Props {
    harVærtEllerErVernepliktig?: boolean;
}
const VernepliktSummary = ({ harVærtEllerErVernepliktig }: Props) => {
    if (harVærtEllerErVernepliktig === undefined) {
        return null;
    }

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

export default VernepliktSummary;
