import { Heading, Link, Process } from '@navikt/ds-react';

import { AppText, useAppIntl } from '../../i18n';
import { browserEnv } from '../../utils/env';

const HvaSkjer = () => {
    const { text } = useAppIntl();
    return (
        <div className="max-w-xl">
            <Heading size="medium" level="2" spacing={true}>
                <AppText id="hvaSkjerInfo.tittel" />
            </Heading>
            <div className="md:pl-3 mt-6">
                <Process>
                    <Process.Event title={text('hvaSkjerInfo.legeerklæring.tittel')}>
                        <p>
                            <AppText id="hvaSkjerInfo.legeerklæring" />
                        </p>
                    </Process.Event>
                    <Process.Event title={text('hvaSkjerInfo.inntektsmelding.tittel')}>
                        <p>
                            <AppText id="hvaSkjerInfo.inntektsmelding.avsnitt.1" />
                        </p>
                        <p>
                            <AppText id="hvaSkjerInfo.inntektsmelding.avsnitt.2.1" />
                            <Link href={browserEnv.NEXT_PUBLIC_ARBEIDSGIVER_PLEIEPENGER_URL}>
                                <AppText id="hvaSkjerInfo.inntektsmelding.avsnitt.2.2" />
                            </Link>

                            <AppText id="hvaSkjerInfo.inntektsmelding.avsnitt.2.3" />
                        </p>
                    </Process.Event>
                    <Process.Event title={text('hvaSkjerInfo.behandling.tittel')}>
                        <p>
                            <AppText id="hvaSkjerInfo.behandling" />
                        </p>
                    </Process.Event>
                    <Process.Event title={text('hvaSkjerInfo.ferdigBehandlet.tittel')}>
                        <p>
                            <AppText id="hvaSkjerInfo.ferdigBehandlet.1" />
                            <Link href={browserEnv.NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL}>
                                <AppText id="hvaSkjerInfo.ferdigBehandlet.2" />
                            </Link>
                            <AppText id="hvaSkjerInfo.ferdigBehandlet.3" />
                        </p>
                    </Process.Event>
                    <Process.Event title={text('hvaSkjerInfo.utbetaling.tittel')}>
                        <p>
                            <AppText id="hvaSkjerInfo.utbetaling.1" />
                            <Link href={browserEnv.NEXT_PUBLIC_UTBETALINGSOVERSIKT_URL}>
                                <AppText id="hvaSkjerInfo.utbetaling.2" />
                            </Link>
                            <AppText id="hvaSkjerInfo.utbetaling.3" />
                        </p>
                    </Process.Event>
                </Process>
            </div>
        </div>
    );
};

export default HvaSkjer;
