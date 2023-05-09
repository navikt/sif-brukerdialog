import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import { Office1 } from '@navikt/ds-icons';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Arbeidsgiver, ArbeidsgiverType } from '../../types/Arbeidsgiver';
import { ArbeidAktivitetType } from '../../types/Sak';
import EndretTag from '../tags/EndretTag';
import './arbeidsaktivitetHeader.scss';
import NyTag from '../tags/NyTag';

interface Props {
    navn: string;
    arbeidsgiver?: Arbeidsgiver;
    type: ArbeidAktivitetType;
    erNyAktivitet?: boolean;
    endret?: {
        tekst: string;
    };
}

const ArbeidsaktivitetHeader: React.FunctionComponent<Props> = ({
    type,
    arbeidsgiver,
    navn,
    endret,
    erNyAktivitet,
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
                            {arbeidsgiver.type === ArbeidsgiverType.ORGANISASJON
                                ? `Organisasjonsnummer: ${arbeidsgiver.id}`
                                : 'Privatperson'}
                            <br />
                            {arbeidsgiver.ansattFom && <>Ansatt: {dateFormatter.full(arbeidsgiver.ansattFom)}.</>}
                            {arbeidsgiver.ansattTom && <> Sluttdato: {dateFormatter.full(arbeidsgiver.ansattTom)}</>}
                        </BodyLong>
                    ) : undefined}
                    {(endret || erNyAktivitet) && (
                        <Block margin="m" style={{ gap: '.5rem', display: 'flex' }}>
                            {endret && <EndretTag>{endret.tekst}</EndretTag>}
                            {erNyAktivitet && <NyTag>Nytt arbeidsforhold</NyTag>}
                        </Block>
                    )}
                </div>
            </div>
        </Block>
    );
};

export default ArbeidsaktivitetHeader;
