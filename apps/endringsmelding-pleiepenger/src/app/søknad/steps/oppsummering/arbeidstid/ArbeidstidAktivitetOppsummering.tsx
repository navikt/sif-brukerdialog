import { useAppIntl } from '@app/i18n';
import ArbeidstidUker from '@app/modules/arbeidstid-uker/ArbeidstidUker';
import { ArbeidstidPeriodeApiDataMap } from '@app/types';
import { Heading, VStack } from '@navikt/ds-react';

import { oppsummeringStepUtils } from '../oppsummeringStepUtils';

interface Props {
    tittel: string;
    perioder: ArbeidstidPeriodeApiDataMap;
    visEndringSomOpprinnelig?: boolean;
}

const ArbeidstidAktivitetOppsummering = ({ tittel, perioder, visEndringSomOpprinnelig }: Props) => {
    const { text } = useAppIntl();
    return (
        <VStack gap="space-8">
            <Heading level="3" size="small">
                {tittel}
            </Heading>
            <ArbeidstidUker
                listItems={oppsummeringStepUtils.getArbeidstidUkerItems(perioder)}
                arbeidstidKolonneTittel={text('oppsummeringStep.arbeidstid.kolonne.endretArbeidstid')}
                visEndringSomOpprinnelig={visEndringSomOpprinnelig}
                visEndringIEgenKolonne
                visNormalarbeidstid={false}
            />
        </VStack>
    );
};

export default ArbeidstidAktivitetOppsummering;
