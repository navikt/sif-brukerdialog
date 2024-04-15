import { Heading, Link } from '@navikt/ds-react';
import { Msg } from '../../i18n';
import { browserEnv } from '../../utils/env';
import { Process } from '../process';
import ProcessStep from '../process/ProcessStep';

const HvaSkjer = () => {
    return (
        <div className="max-w-xl">
            <Heading size="medium" level="2" spacing={true}>
                <Msg id="hvaSkjerInfo.tittel" />
            </Heading>
            <div className="md:pl-3">
                <Process>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <Msg id="hvaSkjerInfo.legeerklæring.tittel" />
                        </Heading>
                        <p>
                            <Msg id="hvaSkjerInfo.legeerklæring" />
                        </p>
                    </ProcessStep>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <Msg id="hvaSkjerInfo.inntektsmelding.tittel" />
                        </Heading>
                        <p>
                            <Msg id="hvaSkjerInfo.inntektsmelding.avsnitt.1" />
                        </p>
                        <p>
                            <Msg id="hvaSkjerInfo.inntektsmelding.avsnitt.2.1" />
                            <Link href={browserEnv.NEXT_PUBLIC_ARBEIDSGIVER_PLEIEPENGER_URL}>
                                <Msg id="hvaSkjerInfo.inntektsmelding.avsnitt.2.2" />
                            </Link>

                            <Msg id="hvaSkjerInfo.inntektsmelding.avsnitt.2.3" />
                        </p>
                    </ProcessStep>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <Msg id="hvaSkjerInfo.behandling.tittel" />
                        </Heading>
                        <p>
                            <Msg id="hvaSkjerInfo.behandling" />
                        </p>
                    </ProcessStep>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <Msg id="hvaSkjerInfo.ferdigBehandlet.tittel" />
                        </Heading>
                        <p>
                            <Msg id="hvaSkjerInfo.ferdigBehandlet.1" />
                            <Link href={browserEnv.NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL}>
                                <Msg id="hvaSkjerInfo.ferdigBehandlet.2" />
                            </Link>
                            <Msg id="hvaSkjerInfo.ferdigBehandlet.3" />
                        </p>
                    </ProcessStep>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <Msg id="hvaSkjerInfo.utbetaling.tittel" />
                        </Heading>
                        <p>
                            <Msg id="hvaSkjerInfo.utbetaling.1" />
                            <Link href={browserEnv.NEXT_PUBLIC_UTBETALINGSOVERSIKT_URL}>
                                <Msg id="hvaSkjerInfo.utbetaling.2" />
                            </Link>
                            <Msg id="hvaSkjerInfo.utbetaling.3" />
                        </p>
                    </ProcessStep>
                </Process>
            </div>
        </div>
    );
};

export default HvaSkjer;
