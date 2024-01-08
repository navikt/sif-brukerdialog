import { Alert } from '@navikt/ds-react';
import React from 'react';
import { yesOrNoIsAnswered } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import HarAleneomsorgSpørsmål from '../spørsmål/HarAleneomsorgSpørsmål';
import HarSyktBarnSpørsmål from '../spørsmål/HarSyktBarnSpørsmål';
import HarDekketTiFørsteDagerSelvSpørsmål from '../spørsmål/HarDekketTiFørsteDagerSelvSpørsmål';

interface Props {
    antallBarn: number;
    harSyktBarn?: YesOrNo;
    harAleneomsorg?: YesOrNo;
    harUtvidetRett: boolean;
    harDekketTiFørsteDagerSelv?: YesOrNo;
}

const EttEllerToBarnUnder13: React.FunctionComponent<Props> = ({
    antallBarn,
    harSyktBarn,
    harAleneomsorg,
    harUtvidetRett,
    harDekketTiFørsteDagerSelv,
}) => {
    const harBesvartAlleSpørsmål =
        harSyktBarn === YesOrNo.YES || (yesOrNoIsAnswered(harSyktBarn) && yesOrNoIsAnswered(harAleneomsorg));

    return (
        <>
            <HarSyktBarnSpørsmål antallBarn={antallBarn} />
            {harSyktBarn === YesOrNo.NO && <HarAleneomsorgSpørsmål />}

            {harBesvartAlleSpørsmål && (
                <HarDekketTiFørsteDagerSelvSpørsmål
                    harDekketTiFørsteDagerSelv={harDekketTiFørsteDagerSelv}
                    info={
                        harUtvidetRett ? (
                            <Alert variant="info">
                                Når du har barn som har fylt 12 år i år, eller er yngre, må du dekke de 10 første
                                omsorgsdagene du bruker hvert kalenderår. Du kan søke om utbetaling fra NAV fra den 11.
                                dagen.
                            </Alert>
                        ) : (
                            <Alert variant="warning">
                                Basert på svarene dine har du rett på 10 omsorgsdager, som du som selvstendig
                                næringsdrivende eller frilanser må dekke selv. For å få dekket omsorgsdager ut over 10
                                dager, må du ha søkt om ekstra omsorgsdager fordi du er alene om omsorgen eller du har
                                barn med en kronisk/langvarig sykdom eller en funksjonshemning.
                            </Alert>
                        )
                    }
                />
            )}
        </>
    );
};

export default EttEllerToBarnUnder13;
