import { AppText } from '@app/i18n';
import { BodyLong } from '@navikt/ds-react';
import { Todo } from '@app/components/Todo';

const ReglerOgAutomatiskSaksbehandlingContent = () => {
    return (
        <>
            <Todo>
                <AppText id="page.velkommen.regler.todo" />
            </Todo>
            <BodyLong spacing>
                <AppText id="page.velkommen.regler.tekst.1" />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="page.velkommen.regler.tekst.2" />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="page.velkommen.regler.tekst.3" />
            </BodyLong>
        </>
    );
};

export default ReglerOgAutomatiskSaksbehandlingContent;
