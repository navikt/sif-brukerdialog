import { Heading, Link } from '@navikt/ds-react';
import { AppText } from '../../i18n';
import { browserEnv } from '../../utils/env';
import { Process } from '../process';
import ProcessStep from '../process/ProcessStep';

const HvaSkjer = () => {
    return (
        <div className="max-w-xl">
            <Heading size="medium" level="2" spacing={true}>
                <AppText id="hvaSkjerInfo.tittel" />
            </Heading>
            <div className="md:pl-3">
                <Process>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <AppText id="hvaSkjerInfo.legeerklæring.tittel" />
                        </Heading>
                        <p>
                            <AppText id="hvaSkjerInfo.legeerklæring" />
                        </p>
                    </ProcessStep>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <AppText id="hvaSkjerInfo.inntektsmelding.tittel" />
                        </Heading>
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
                    </ProcessStep>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <AppText id="hvaSkjerInfo.behandling.tittel" />
                        </Heading>
                        <p>
                            <AppText id="hvaSkjerInfo.behandling" />
                        </p>
                    </ProcessStep>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <AppText id="hvaSkjerInfo.ferdigBehandlet.tittel" />
                        </Heading>
                        <p>
                            <AppText id="hvaSkjerInfo.ferdigBehandlet.1" />
                            <Link href={browserEnv.NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL}>
                                <AppText id="hvaSkjerInfo.ferdigBehandlet.2" />
                            </Link>
                            <AppText id="hvaSkjerInfo.ferdigBehandlet.3" />
                        </p>
                    </ProcessStep>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <AppText id="hvaSkjerInfo.utbetaling.tittel" />
                        </Heading>
                        <p>
                            <AppText id="hvaSkjerInfo.utbetaling.1" />
                            <Link href={browserEnv.NEXT_PUBLIC_UTBETALINGSOVERSIKT_URL}>
                                <AppText id="hvaSkjerInfo.utbetaling.2" />
                            </Link>
                            <AppText id="hvaSkjerInfo.utbetaling.3" />
                        </p>
                    </ProcessStep>
                </Process>
            </div>
        </div>
    );
};

export default HvaSkjer;
