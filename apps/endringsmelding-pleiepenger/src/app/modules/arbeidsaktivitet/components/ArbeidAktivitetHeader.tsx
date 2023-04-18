import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import { Office1 } from '@navikt/ds-icons';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import { ArbeidsgiverType } from '../../../types/Arbeidsgiver';
import { ArbeidAktivitet, ArbeidAktivitetType } from '../../../types/Sak';
import EndretTag from '../../../components/tags/EndretTag';
import './arbeidAktivitetHeader.scss';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    erEndret?: boolean;
}

const ArbeidAktivitetHeader: React.FunctionComponent<Props> = ({ arbeidAktivitet, erEndret }) => {
    return (
        <Block margin={arbeidAktivitet.type !== ArbeidAktivitetType.arbeidstaker ? 'm' : 'none'}>
            <div className="arbeidAktivitetHeader">
                <div className="arbeidAktivitetHeader__icon">
                    <Office1 role="presentation" aria-hidden={true} />
                </div>
                <div className="arbeidAktivitetHeader__content">
                    <Heading level="2" size="medium">
                        {arbeidAktivitet.navn}
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
                    {erEndret && (
                        <Block margin="m">
                            <EndretTag>Arbeidstid endret</EndretTag>
                        </Block>
                    )}
                </div>
            </div>
        </Block>
    );
};

export default ArbeidAktivitetHeader;
