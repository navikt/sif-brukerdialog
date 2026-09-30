import { AppText } from '@app/i18n';
import { BodyLong } from '@navikt/ds-react';

import { TodoFlag } from '../../components/Todo';

const ReglerOgAutomatiskSaksbehandlingContent = () => {
    return (
        <>
            <BodyLong spacing>
                <AppText id="page.velkommen.regler.tekst.1" />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="page.velkommen.regler.tekst.2" />
                <TodoFlag />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="page.velkommen.regler.tekst.3" />
            </BodyLong>
        </>
    );
};

export default ReglerOgAutomatiskSaksbehandlingContent;
