import React from 'react';
import { ISODurationToDecimalDuration } from '@navikt/sif-common-utils';
import { AppText } from '../../../i18n';
import { NormalarbeidstidApiData } from '../../../types/søknad-api-data/SøknadApiData';

interface Props {
    erAnsatt?: boolean;
    normalarbeidstidApiData: NormalarbeidstidApiData;
}

const NormalarbeidstidSummary: React.FunctionComponent<Props> = ({ erAnsatt = true, normalarbeidstidApiData }) => (
    <AppText
        id={erAnsatt ? `oppsummering.arbeidssituasjon.tid` : `oppsummering.arbeidssituasjon.avsluttet.tid`}
        values={{
            timer: ISODurationToDecimalDuration(normalarbeidstidApiData.timerPerUkeISnitt),
        }}
    />
);

export default NormalarbeidstidSummary;
