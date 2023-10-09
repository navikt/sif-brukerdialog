import * as React from "react";
import { ExpansionCard } from "@navikt/ds-react";

interface Props {
  id: string;
  index: number;
  length: number;
  open?: boolean;
  children: React.ReactNode;
}

const BarnPanelView: React.FC<Props> = ({
  id,
  index,
  length,
  children,
}: React.PropsWithChildren<Props>) => {
  if (length === 1) {
    return <>{children}</>;
  }

  const defaultOpen = index === 0 ? true : undefined;

  return (
    <ExpansionCard aria-label="default-demo" defaultOpen={defaultOpen} id={id}>
      <ExpansionCard.Header>
        <ExpansionCard.Title>Barn {index + 1}</ExpansionCard.Title>
      </ExpansionCard.Header>
      <ExpansionCard.Content>{children}</ExpansionCard.Content>
    </ExpansionCard>
  );
};

export default BarnPanelView;
