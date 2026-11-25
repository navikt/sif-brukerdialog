import { AppText, useAppIntl } from '@app/i18n';
import { Lookup } from '@navikt/ds-react';

const AAregisteret = () => {
    const { text } = useAppIntl();
    return (
        <Lookup word={text('aaRegisteret.kort')}>
            <AppText id="aaRegisteret.lang" />
        </Lookup>
    );
};

export default AAregisteret;
