import { Alert, Heading, VStack } from '@navikt/ds-react';
import React from 'react';
import { yesOrNoIsAnswered } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import HarAleneomsorgSpørsmål from '../spørsmål/HarAleneomsorgSpørsmål';
import HarSyktBarnSpørsmål from '../spørsmål/HarSyktBarnSpørsmål';
import HarDekketTiFørsteDagerSelvSpørsmål from '../spørsmål/HarDekketTiFørsteDagerSelvSpørsmål';
import { AppText } from '../../../../i18n';

interface Props {
    harSyktBarn?: YesOrNo;
    harAleneomsorg?: YesOrNo;
    harUtvidetRett: boolean;
}

const EttEllerToBarnUnder13: React.FunctionComponent<Props> = ({ harSyktBarn, harAleneomsorg, harUtvidetRett }) => {
    const harBesvartAlleSpørsmål =
        harSyktBarn === YesOrNo.YES || (yesOrNoIsAnswered(harSyktBarn) && yesOrNoIsAnswered(harAleneomsorg));

    return (
        <>
            <HarSyktBarnSpørsmål />
            {harSyktBarn === YesOrNo.NO && <HarAleneomsorgSpørsmål />}

            {harBesvartAlleSpørsmål && harUtvidetRett === false ? (
                <VStack gap="6">
                    <Heading level="3" size="small">
                        <AppText id="step.dineBarn.ettEllerToBarnUnder13.ingenRett.tittel" />
                    </Heading>
                    <Alert variant="warning">
                        <AppText id="step.dineBarn.ettEllerToBarnUnder13.ingenRett.tekst.1" />
                        <p>
                            <AppText id="step.dineBarn.ettEllerToBarnUnder13.ingenRett.tekst.2" />
                        </p>
                    </Alert>
                </VStack>
            ) : null}
            {harBesvartAlleSpørsmål && harUtvidetRett === true ? <HarDekketTiFørsteDagerSelvSpørsmål /> : null}
        </>
    );
};

export default EttEllerToBarnUnder13;
