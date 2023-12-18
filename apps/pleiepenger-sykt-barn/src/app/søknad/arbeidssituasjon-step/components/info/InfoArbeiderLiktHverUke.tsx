import React from 'react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { ArbeidsforholdType } from '../../../../local-sif-common-pleiepenger';

interface Props {
    arbeidsforholdType: ArbeidsforholdType;
}

const InfoArbeiderLiktHverUke: React.FunctionComponent<Props> = () => {
    return (
        <ExpandableInfo title="Hva betyr dette?">
            <p>Her lurer vi på om du jobber like mange timer hver uke, eller om det varierer hvor mye du jobber.</p>
            <p>
                Hvis du for eksempel hver uke jobber 30 timer, svarer du &quot;Ja&quot; på dette spørsmålet. Hvis det
                varierer hvor mange timer du jobber per uke, svarer du &quot;Nei, det varierer&quot;.
            </p>
        </ExpandableInfo>
    );
};
export default InfoArbeiderLiktHverUke;
