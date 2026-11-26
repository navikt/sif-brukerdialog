import { ComponentProps } from 'react';

import { SifInfoCard } from '../sif-info-card/SifInfoCard';

type Props = Omit<ComponentProps<typeof SifInfoCard>, 'role'>;

/** For meldinger som oppstår etter en handling. Annonseres av skjermleser når den monteres. */
export const SifAlert = (props: Props) => <SifInfoCard {...props} role="alert" />;
