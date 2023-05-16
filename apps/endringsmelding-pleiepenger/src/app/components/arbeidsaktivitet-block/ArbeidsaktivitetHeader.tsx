import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import { Office1 } from '@navikt/ds-icons';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Arbeidsgiver } from '../../types/Arbeidsgiver';
import { ArbeidAktivitetType } from '../../types/Sak';
import EndretTag from '../tags/EndretTag';
import NyTag from '../tags/NyTag';
import './arbeidsaktivitetHeader.scss';

interface Props {
    navn: string;
    arbeidsgiver?: Arbeidsgiver;
    type: ArbeidAktivitetType;
    erUkjentAktivitet?: boolean;
    endret?: {
        tekst: string;
    };
}

const ArbeidsaktivitetHeader: React.FunctionComponent<Props> = ({
    type,
    arbeidsgiver,
    navn,
    endret,
    erUkjentAktivitet,
}) => {
    return (
        <Block margin={type !== ArbeidAktivitetType.arbeidstaker ? 'm' : 'none'}>
            <div className="arbeidsaktivitetHeader">
                <div className="arbeidsaktivitetHeader__icon">
                    <Office1 role="presentation" aria-hidden={true} />
                </div>
                <div className="arbeidsaktivitetHeader__content">
                    <Heading level="2" size="medium">
                        {navn}
                    </Heading>
                    {type === ArbeidAktivitetType.arbeidstaker && arbeidsgiver !== undefined ? (
                        <BodyLong>
                            Organisasjonsnummer: {arbeidsgiver.organisasjonsnummer}
                            <br />
                            {arbeidsgiver.ansattFom && <>Ansatt: {dateFormatter.full(arbeidsgiver.ansattFom)}.</>}
                            {arbeidsgiver.ansattTom && <> Sluttdato: {dateFormatter.full(arbeidsgiver.ansattTom)}</>}
                        </BodyLong>
                    ) : undefined}
                    {(endret || erUkjentAktivitet) && (
                        <Block margin="m" style={{ gap: '.5rem', display: 'flex' }}>
                            {endret && <EndretTag>{endret.tekst}</EndretTag>}
                            {erUkjentAktivitet && <NyTag>Ukjent arbeidsforhold</NyTag>}
                        </Block>
                    )}
                </div>
            </div>
        </Block>
    );
};

export default ArbeidsaktivitetHeader;
