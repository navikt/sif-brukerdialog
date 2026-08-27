import { useAppContext } from '@app/context/AppContext';
import { AppText, useAppIntl } from '@app/i18n';
import { SøknadVelkommenPage } from '@sif/soknad-app';

import OmSøknaden from './OmSoknaden';
import { BodyLong, Link } from '@navikt/ds-react';
import { getLenker } from '../../lenker';
import { Todo } from '../../components/Todo';

export const Velkommen = () => {
    const { text } = useAppIntl();
    const { søker } = useAppContext();

    return (
        <SøknadVelkommenPage
            title={text('application.title')}
            guide={{
                navn: søker.fornavn || '',
                content: (
                    <>
                        <BodyLong spacing>
                            <AppText id="page.velkommen.guide.info.1" />
                        </BodyLong>
                        <BodyLong spacing>
                            <AppText id="page.velkommen.guide.info.2" />
                        </BodyLong>
                        <BodyLong spacing>
                            <AppText id="page.velkommen.guide.info.3" />
                        </BodyLong>
                        <BodyLong spacing>
                            <AppText
                                id="page.velkommen.guide.info.4"
                                values={{ Lenke: (children) => <Link href={getLenker().navForside}>{children}</Link> }}
                            />
                        </BodyLong>
                    </>
                ),
            }}>
            <Todo>Tekster er ikke ferdig</Todo>
            <OmSøknaden />
        </SøknadVelkommenPage>
    );
};
