import * as React from 'react';
import { ExpansionCard } from '@navikt/ds-react';

interface Props {
    id: string;
    index: number;
    length: number;
    children: React.ReactNode;
    valideringsFeil?: boolean;
}

const BarnPanelView: React.FC<Props> = ({
    id,
    index,
    length,
    children,
    valideringsFeil,
}: React.PropsWithChildren<Props>) => {
    const [open, setOpen] = React.useState<boolean>(index === 0);

    if (!open && valideringsFeil) {
        setOpen(true);
    }
    if (length === 1) {
        return <>{children}</>;
    }

    const barnNavn = `Barn ${index + 1}`;
    return (
        <ExpansionCard aria-label={barnNavn} id={id} open={open} onToggle={() => setOpen(!open)}>
            <ExpansionCard.Header>
                <ExpansionCard.Title>Barn {index + 1}</ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>{children}</ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default BarnPanelView;
