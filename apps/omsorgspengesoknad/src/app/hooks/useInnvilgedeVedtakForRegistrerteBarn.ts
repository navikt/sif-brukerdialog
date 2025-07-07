import { useEffect, useState } from 'react';
import { BarnOppslag } from '@navikt/sif-common-query';
import innvilgetVedtakEndpoint from '../api/endpoints/innvilgetVedtakEndpoint';
import { HentSisteGyldigeVedtakResponseDto } from '../types/innvilgetVedtakApiData/HentSisteGyldigeVedtakResponseDto';

export interface InnvilgedeVedtak {
    [key: string]: HentSisteGyldigeVedtakResponseDto;
}

export const useInnvilgedeVedtakForRegistrerteBarn = (registrerteBarn: BarnOppslag[]) => {
    const [innvilgedeVedtak, setInnvilgedeVedtak] = useState<InnvilgedeVedtak>({});
    useEffect(() => {
        async function getInnvilgedeVedtak() {
            const vedtakPromises = registrerteBarn.map((barn) =>
                innvilgetVedtakEndpoint.send({
                    pleietrengendeAktørId: barn.aktørId,
                }),
            );
            const responses = await Promise.all(vedtakPromises);
            const vedtakEntries = registrerteBarn.map((barn, index) => [barn.aktørId, responses[index].data]);
            setInnvilgedeVedtak(Object.fromEntries(vedtakEntries));
        }
        getInnvilgedeVedtak();
    }, [registrerteBarn]);
    return innvilgedeVedtak;
};
