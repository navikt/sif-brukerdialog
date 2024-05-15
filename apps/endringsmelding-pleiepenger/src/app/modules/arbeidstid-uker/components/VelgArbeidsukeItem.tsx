import { Checkbox } from '@navikt/ds-react';
import React from 'react';
import AriaText from '@navikt/sif-common-core-ds/src/atoms/aria-text/AriaText';
import dayjs from 'dayjs';
import { ArbeidstidUkerItem } from '../types/ArbeidstidUkerItem';

interface Props {
    uke: ArbeidstidUkerItem;
    selected: boolean;
    onChange: () => void;
}

const VelgArbeidsukeItem: React.FunctionComponent<Props> = ({ uke, onChange, selected }) => {
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
