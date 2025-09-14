import { Alert } from '@navikt/ds-react';
import { yesOrNoIsAnswered } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds';

import { AppText } from '../../../../i18n';
import HarSyktBarnSpørsmål from '../spørsmål/HarSyktBarnSpørsmål';

interface Props {
    antallBarn: number;
    harSyktBarn?: YesOrNo;
    harUtvidetRett: boolean;
}

const KunBarnOver13 = ({ harSyktBarn, harUtvidetRett }: Props) => {
    return (
        <>
            <HarSyktBarnSpørsmål />

            {yesOrNoIsAnswered(harSyktBarn) && !harUtvidetRett ? (
                <Alert variant="warning">
                    <AppText id="step.dineBarn.kunBarnOver13.ingenRett.tekst" />
                </Alert>
            ) : null}
        </>
    );
};

export default KunBarnOver13;
