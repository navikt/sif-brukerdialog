import { ExpansionCard, Panel } from '@navikt/ds-react';
import React from 'react';
import { ArbeidstidEndringMap } from '../../types/ArbeidstidEndring';
import { ArbeidAktivitet } from '../../types/Sak';
import { LovbestemtFerieSøknadsdata } from '../../types/søknadsdata/LovbestemtFerieSøknadsdata';
import { getArbeidAktivitetNavn } from '../../utils/arbeidAktivitetUtils';
import ArbeidAktivitetHeader from './components/ArbeidAktivitetHeader';
import ArbeidsaktivitetContent from './components/ArbeidsaktivitetContent';
import './arbeidsaktivitet.scss';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    endringer: ArbeidstidEndringMap | undefined;
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
    renderAsExpansionCard?: boolean;
    onArbeidstidAktivitetChange: (arbeidstidEndringer: ArbeidstidEndringMap) => void;
}

const Arbeidsaktivitet = ({
    arbeidAktivitet,
    endringer,
    lovbestemtFerie,
    renderAsExpansionCard,
    onArbeidstidAktivitetChange,
}: Props) => {
    const perioder = arbeidAktivitet.perioderMedArbeidstid;

    return (
        <div data-testid={`aktivitet_${arbeidAktivitet.id}`}>
            {renderAsExpansionCard ? (
                <ExpansionCard aria-label={getArbeidAktivitetNavn(arbeidAktivitet)} defaultOpen={true}>
                    <ExpansionCard.Header>
                        <ArbeidAktivitetHeader arbeidAktivitet={arbeidAktivitet} />
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <ArbeidsaktivitetContent
                            perioder={perioder}
                            arbeidAktivitet={arbeidAktivitet}
                            lovbestemtFerie={lovbestemtFerie}
                            endringer={endringer}
                            onArbeidstidAktivitetChange={onArbeidstidAktivitetChange}
                        />
                    </ExpansionCard.Content>
                </ExpansionCard>
            ) : (
                <Panel border={true}>
                    <ArbeidAktivitetHeader arbeidAktivitet={arbeidAktivitet} />
                    <Block margin="xl">
                        <ArbeidsaktivitetContent
                            perioder={perioder}
                            arbeidAktivitet={arbeidAktivitet}
                            lovbestemtFerie={lovbestemtFerie}
                            endringer={endringer}
                            onArbeidstidAktivitetChange={onArbeidstidAktivitetChange}
                        />
                    </Block>
                </Panel>
            )}
        </div>
    );
};

export default Arbeidsaktivitet;
