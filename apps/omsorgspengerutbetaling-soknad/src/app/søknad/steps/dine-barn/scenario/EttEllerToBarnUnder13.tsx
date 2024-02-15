import { Alert, Heading } from '@navikt/ds-react';
import React from 'react';
import { yesOrNoIsAnswered } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import HarAleneomsorgSpørsmål from '../spørsmål/HarAleneomsorgSpørsmål';
import HarSyktBarnSpørsmål from '../spørsmål/HarSyktBarnSpørsmål';
import HarDekketTiFørsteDagerSelvSpørsmål from '../spørsmål/HarDekketTiFørsteDagerSelvSpørsmål';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';

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
                <FormBlock>
                    <Heading level="3" size="small" spacing={true}>
                        Du må selv dekke omsorgsdagene dine
                    </Heading>
                    <Alert variant="warning">
                        Ut fra svarene dine har du ikke mer enn to barn som du kan bruke omsorgsdager for, og du har
                        ikke ekstra omsorgsdager fra NAV. Du har da rett til 10 omsorgsdager.{' '}
                        <p>
                            Fordi du er selvstendig næringsdrivende eller frilanser, må du selv dekke disse 10
                            omsorgsdagene.
                        </p>
                    </Alert>
                </FormBlock>
            ) : null}
            {harBesvartAlleSpørsmål && harUtvidetRett === true ? <HarDekketTiFørsteDagerSelvSpørsmål /> : null}
        </>
    );
};

export default EttEllerToBarnUnder13;
