import { Heading } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import { Process } from '../process';
import ProcessStep from '../process/ProcessStep';

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
                            <FormattedMessage id="hvaSkjerInfo.inntektsmelding.avsnitt.2" />
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
                            <FormattedMessage id="hvaSkjerInfo.ferdigBehandlet" />
                        </p>
                    </ProcessStep>
                    <ProcessStep>
                        <Heading size="small" level="3" spacing={true}>
                            <FormattedMessage id="hvaSkjerInfo.utbetaling.tittel" />
                        </Heading>
                        <p>
                            <FormattedMessage id="hvaSkjerInfo.utbetaling" />
                        </p>
                    </ProcessStep>
                </Process>
            </div>
        </div>
    );
};

export default HvaSkjer;
