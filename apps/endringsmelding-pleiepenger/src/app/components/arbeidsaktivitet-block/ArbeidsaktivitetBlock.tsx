import { ExpansionCard, Panel } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { Arbeidsgiver } from '../../types/Arbeidsgiver';
import { ArbeidAktivitetType } from '../../types/Sak';
import ArbeidsaktivitetHeader from './ArbeidsaktivitetHeader';

interface Props {
    navn: string;
    type: ArbeidAktivitetType;
    arbeidsgiver?: Arbeidsgiver;
    endret?: { tekst: string };
    erUkjent?: boolean;
    renderAsExpansionCard?: boolean;
    expansionCardDefaultOpen?: boolean;
    children: React.ReactNode;
}

const ArbeidsaktivitetBlock: React.FunctionComponent<Props> = ({
    navn,
    type,
    arbeidsgiver,
    renderAsExpansionCard,
    expansionCardDefaultOpen = true,
    endret,
    erUkjent,
    children,
}) => {
    const renderHeader = () => {
        return (
            <ArbeidsaktivitetHeader
                type={type}
                navn={navn}
                arbeidsgiver={arbeidsgiver}
                endret={endret}
                erUkjentAktivitet={erUkjent}
            />
        );
    };
    return renderAsExpansionCard ? (
        <ExpansionCard aria-label={navn} defaultOpen={expansionCardDefaultOpen}>
            <ExpansionCard.Header>{renderHeader()}</ExpansionCard.Header>
            <ExpansionCard.Content>{children}</ExpansionCard.Content>
        </ExpansionCard>
    ) : (
        <Panel border={true}>
            {renderHeader()}
            <Block margin="xl">{children}</Block>
        </Panel>
    );
};

export default ArbeidsaktivitetBlock;
