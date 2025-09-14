import { ISODurationToDecimalDuration } from '@navikt/sif-common-utils';

import { AppText } from '../../../i18n';
import { NormalarbeidstidApiData } from '../../../types/søknad-api-data/SøknadApiData';

interface Props {
    erAnsatt?: boolean;
    normalarbeidstidApiData: NormalarbeidstidApiData;
}

const NormalarbeidstidSummary = ({ erAnsatt = true, normalarbeidstidApiData }: Props) => (
    <AppText
        id={erAnsatt ? `oppsummering.arbeidssituasjon.tid` : `oppsummering.arbeidssituasjon.avsluttet.tid`}
        values={{
            timer: ISODurationToDecimalDuration(normalarbeidstidApiData.timerPerUkeISnitt),
        }}
    />
);

export default NormalarbeidstidSummary;
