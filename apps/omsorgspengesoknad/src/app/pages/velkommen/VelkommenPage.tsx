import { Link } from '@navikt/ds-react';
import { OmsorgsdagerKroniskApp } from '@navikt/sif-app-register';
import { SIFCommonPageKey, useAmplitudeInstance, useLogSidevisning } from '@navikt/sif-common-amplitude';
import { SoknadVelkommenPage } from '@navikt/sif-common-soknad-ds';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { SøknadRoutes } from '../../types/SøknadRoutes';
import OmSøknaden from './om-søknaden/OmSøknaden';

const VelkommenPage = () => {
    const { text } = useAppIntl();
    const {
        state: { søker },
        dispatch,
    } = useSøknadContext();

    useLogSidevisning(SIFCommonPageKey.velkommen);

    const { logSoknadStartet } = useAmplitudeInstance();

    const startSøknad = async () => {
        await logSoknadStartet(OmsorgsdagerKroniskApp.navn);
        dispatch(actionsCreator.startSøknad());
        dispatch(actionsCreator.setSøknadRoute(SøknadRoutes.OM_BARNET));
    };
    return (
        <SoknadVelkommenPage
            title={text('page.velkommen.sidetittel')}
            onStartSøknad={startSøknad}
            guide={{
                navn: søker.fornavn,
                content: (
                    <>
                        <p>
                            <AppText id="page.velkommen.guide.ingress" />
                        </p>
                        <p>
                            <AppText id="page.velkommen.guide.tekst.1" />
                        </p>
                        <p>
                            <AppText id="page.velkommen.guide.tekst.2" />
                        </p>
                        <p>
                            <AppText
                                id="page.velkommen.guide.tekst.3"
                                values={{
                                    Lenke: (children) => (
                                        <Link href={getLenker().infosider} target="_blank">
                                            {children}
                                        </Link>
                                    ),
                                }}
                            />
                        </p>
                    </>
                ),
            }}>
            <OmSøknaden />
            <hr />
        </SoknadVelkommenPage>
    );
};

export default VelkommenPage;
