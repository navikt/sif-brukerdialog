import { FormSummary } from '@navikt/ds-react';
import { AppText } from '../../../i18n';

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
                <AppText id="verneplikt.summary.header" />
            </FormSummary.Label>
            <FormSummary.Value>
                <AppText
                    id={
                        harVærtEllerErVernepliktig
                            ? 'verneplikt.summary.harVærtVernepliktig'
                            : 'verneplikt.summary.harIkkeVærtVernepliktig'
                    }
                />
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};

export default VernepliktSummary;
