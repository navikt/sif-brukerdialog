import { Link } from '@navikt/ds-react';
import { useEffect } from 'react';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { Kvittering } from '@navikt/sif-common-soknad-ds';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';

interface Props {
    onUnmount: () => void;
}

const KvitteringPage = ({ onUnmount }: Props) => {
    const { text, locale } = useAppIntl();

    useEffect(() => {
        return () => {
            onUnmount();
        };
    });

    useLogSidevisning(SIFCommonPageKey.kvittering);

    return (
        <Page title={text('application.title')}>
            <Kvittering
                tittel={text('kvittering.tittel')}
                liste={{
                    tittel: text('kvittering.info.tittel'),
                    punkter: [
                        text('kvittering.info.1'),
                        text('kvittering.info.2'),
                        <span key="pkt3">
                            <AppText
                                id="kvittering.info.3"
                                values={{
                                    Lenke: (children) => (
                                        <Link href={getLenker(locale).saksbehandlingstider} target="_blank">
                                            {children}
                                        </Link>
                                    ),
                                }}
                            />
                        </span>,
                    ],
                }}
            />
        </Page>
    );
};

export default KvitteringPage;
