// import { useState } from 'react';
// import { veilederService } from '../../api/services/veilederService';
// import { Deltakelse } from '../../api/types';

// export const useHentDeltakelser = () => {
//     const [pending, setIsPending] = useState(false);
//     const [deltakelser, setDeltakelser] = useState<Deltakelse[] | undefined>();

//     const hentDeltakelser = async (deltakerFnr: string) => {
//         setIsPending(true);
//         setDeltakelser(undefined);
//         const d = await veilederService.getDeltakelser(deltakerFnr);
//         setDeltakelser(d);
//         setIsPending(false);
//     };

//     return {
//         hentDeltakelserPending: pending,
//         deltakelser,
//         hentDeltakelser,
//     };
// };
