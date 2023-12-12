import { Heading, Link } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import { Process } from '../process';
import ProcessStep from '../process/ProcessStep';
import { browserEnv } from '../../utils/env';

const HvaSkjer = () => {
    return (
        <div className="max-w-xl">
            <Heading size="medium" level="2" spacing={true}>
                <FormattedMessage id="hvaSkjerInfo.tittel" />
            </Heading>
            <div className="md:pl-3">
                <Process>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <FormattedMessage id="hvaSkjerInfo.legeerklæring.tittel" />
                        </Heading>
                        <p>
                            <FormattedMessage id="hvaSkjerInfo.legeerklæring" />
                        </p>
                    </ProcessStep>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <FormattedMessage id="hvaSkjerInfo.inntektsmelding.tittel" />
                        </Heading>
                        <p>
                            <FormattedMessage id="hvaSkjerInfo.inntektsmelding.avsnitt.1" />
                        </p>
                        <p>
                            <FormattedMessage id="hvaSkjerInfo.inntektsmelding.avsnitt.2.1" />
                            <Link href={browserEnv.NEXT_PUBLIC_ARBEIDSGIVER_PLEIEPENGER_URL}>
                                <FormattedMessage id="hvaSkjerInfo.inntektsmelding.avsnitt.2.2" />
                            </Link>

                            <FormattedMessage id="hvaSkjerInfo.inntektsmelding.avsnitt.2.3" />
                        </p>
                    </ProcessStep>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <FormattedMessage id="hvaSkjerInfo.behandling.tittel" />
                        </Heading>
                        <p>
                            <FormattedMessage id="hvaSkjerInfo.behandling" />
                        </p>
                    </ProcessStep>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <FormattedMessage id="hvaSkjerInfo.ferdigBehandlet.tittel" />
                        </Heading>
                        <p>
                            <FormattedMessage id="hvaSkjerInfo.ferdigBehandlet.1" />
                            <Link href={browserEnv.NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL}>
                                <FormattedMessage id="hvaSkjerInfo.ferdigBehandlet.2" />
                            </Link>
                            <FormattedMessage id="hvaSkjerInfo.ferdigBehandlet.3" />
                        </p>
                    </ProcessStep>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <FormattedMessage id="hvaSkjerInfo.utbetaling.tittel" />
                        </Heading>
                        <p>
                            <FormattedMessage id="hvaSkjerInfo.utbetaling.1" />
                            <Link href={browserEnv.NEXT_PUBLIC_UTBETALINGSOVERSIKT_URL}>
                                <FormattedMessage id="hvaSkjerInfo.utbetaling.2" />
                            </Link>
                            <FormattedMessage id="hvaSkjerInfo.utbetaling.3" />
                        </p>
                    </ProcessStep>
                </Process>
            </div>
        </div>
    );
};

export default HvaSkjer;
