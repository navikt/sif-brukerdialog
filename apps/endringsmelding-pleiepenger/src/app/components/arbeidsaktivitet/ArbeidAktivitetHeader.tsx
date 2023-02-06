import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import { Office1 } from '@navikt/ds-icons';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import { ArbeidsgiverType } from '../../types/Arbeidsgiver';
import { ArbeidAktivitet, ArbeidAktivitetType } from '../../types/Sak';
import { getArbeidAktivitetNavn } from '../../utils/arbeidAktivitetUtils';
import './arbeidAktivitetHeader.scss';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
}

const ArbeidAktivitetHeader: React.FunctionComponent<Props> = ({ arbeidAktivitet }) => {
    return (
        <div className="arbeidAktivitetHeader">
            <div className="arbeidAktivitetHeader__icon">
                <Office1 role="presentation" aria-hidden={true} />
            </div>
            <div className="arbeidAktivitetHeader__content">
                <Heading level="2" size="medium">
                    {getArbeidAktivitetNavn(arbeidAktivitet)}
                </Heading>
                {arbeidAktivitet.type === ArbeidAktivitetType.arbeidstaker ? (
                    <BodyLong>
                        {arbeidAktivitet.arbeidsgiver.type === ArbeidsgiverType.ORGANISASJON
                            ? `Organisasjonsnummer: ${arbeidAktivitet.arbeidsgiver.organisasjonsnummer}`
                            : 'Privatperson'}
                        <br />
                        {arbeidAktivitet.arbeidsgiver.ansattFom && (
                            <>Ansatt: {dateFormatter.full(arbeidAktivitet.arbeidsgiver.ansattFom)}.</>
                        )}
                        {arbeidAktivitet.arbeidsgiver.ansattTom && (
                            <> Sluttdato: {dateFormatter.full(arbeidAktivitet.arbeidsgiver.ansattTom)}</>
                        )}
                    </BodyLong>
                ) : undefined}
            </div>
        </div>
    );
};

export default ArbeidAktivitetHeader;
