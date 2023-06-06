import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import { Office1 } from '@navikt/ds-icons';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { dateFormatter } from '@navikt/sif-common-utils';
import { ArbeidsaktivitetType, Arbeidsgiver } from '@types';
import EndretTag from '../tags/EndretTag';
import NyTag from '../tags/NyTag';
import './arbeidsaktivitetBlockHeader.scss';

interface Props {
    navn: string;
    arbeidsgiver?: Arbeidsgiver;
    type: ArbeidsaktivitetType;
    erUkjentAktivitet?: boolean;
    endret?: {
        tekst: string;
    };
}

const ArbeidsaktivitetBlockHeader: React.FunctionComponent<Props> = ({
    type,
    arbeidsgiver,
    navn,
    endret,
    erUkjentAktivitet,
}) => {
    return (
        <Block margin={type !== ArbeidsaktivitetType.arbeidstaker ? 'm' : 'none'}>
            <div className="arbeidsaktivitetBlockHeader">
                <div className="arbeidsaktivitetBlockHeader__icon">
                    <Office1 role="presentation" aria-hidden={true} />
                </div>
                <div className="arbeidsaktivitetBlockHeader__content">
                    <Heading level="2" size="medium">
                        {navn}
                    </Heading>
                    {type === ArbeidsaktivitetType.arbeidstaker && arbeidsgiver !== undefined ? (
                        <BodyLong as="div">
                            <div>Organisasjonsnummer: {arbeidsgiver.organisasjonsnummer}</div>
                            {arbeidsgiver.ansattFom && <>Ansatt: {dateFormatter.full(arbeidsgiver.ansattFom)}.</>}
                            {arbeidsgiver.ansattTom && <> Sluttdato: {dateFormatter.full(arbeidsgiver.ansattTom)}</>}
                        </BodyLong>
                    ) : undefined}
                    {(endret || erUkjentAktivitet) && (
                        <Block margin="m" style={{ gap: '.5rem', display: 'flex' }}>
                            {endret && <EndretTag>{endret.tekst}</EndretTag>}
                            {erUkjentAktivitet && <NyTag>Nytt arbeidsforhold</NyTag>}
                        </Block>
                    )}
                </div>
            </div>
        </Block>
    );
};

export default ArbeidsaktivitetBlockHeader;
