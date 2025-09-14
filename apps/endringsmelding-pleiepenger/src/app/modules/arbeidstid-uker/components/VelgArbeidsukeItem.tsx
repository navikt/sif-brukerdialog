import { Checkbox } from '@navikt/ds-react';
import AriaText from '@navikt/sif-common-core-ds/src/atoms/aria-text/AriaText';
import dayjs from 'dayjs';

import { ArbeidstidUkerItem } from '../types/ArbeidstidUkerItem';

interface Props {
    uke: ArbeidstidUkerItem;
    selected: boolean;
    onChange: () => void;
}

const VelgArbeidsukeItem = ({ uke, onChange, selected }: Props) => {
    const ukenummer = dayjs(uke.periode.from).isoWeek();
    return uke.kanEndres && uke.kanVelges ? (
        <Checkbox hideLabel checked={selected} onChange={onChange}>
            <AriaText>Uke {ukenummer}</AriaText>
        </Checkbox>
    ) : (
        <AriaText>Uke {ukenummer} - kort uke kan ikke velges</AriaText>
    );
};

export default VelgArbeidsukeItem;
