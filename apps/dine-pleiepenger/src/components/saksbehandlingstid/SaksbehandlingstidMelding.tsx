import { BodyShort } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

import { AppText } from '../../i18n';
import { Venteårsak } from '../../types';
import { erSaksbehandlingsfristPassert } from '../../utils/sakUtils';

interface Props {
    frist?: Date;
    saksbehandlingstidUker?: number;
    venteårsak?: Venteårsak;
}

export const SaksbehandlingstidMelding = ({ frist, venteårsak, saksbehandlingstidUker }: Props) => {
    if (!frist) {
        return <AppText id="svarfrist.forventetBehandlingstid" values={{ saksbehandlingstidUker }} />;
    }

    if (erSaksbehandlingsfristPassert(frist) && 1 + 1 === 3) {
        if (venteårsak === Venteårsak.FOR_TIDLIG_SOKNAD) {
            return (
                <AppText
                    id="svarfrist.forTidligSoknad.fristPassert"
                    values={{
                        frist: dateFormatter.full(frist),
                        dato: (chunk: string) => <strong>{chunk}</strong>,
                        saksbehandlingstidUker,
                    }}
                />
            );
        }
        return (
            <div>
                <BodyShort spacing={true}>
                    <AppText id="svarfrist.fristPassert.1" />
                </BodyShort>
                <BodyShort spacing={true}>
                    <AppText id="svarfrist.fristPassert.2" />
                </BodyShort>
            </div>
        );
    }

    switch (venteårsak) {
        case Venteårsak.INNTEKTSMELDING:
        case Venteårsak.MEDISINSK_DOKUMENTASJON:
        case Venteårsak.MELDEKORT:
            return (
                <AppText
                    id="svarfrist.dokumenterManglerFrist"
                    values={{
                        frist: dateFormatter.full(frist),
                        dato: (chunk: string) => <strong>{chunk}</strong>,
                    }}
                />
            );
        case Venteårsak.FOR_TIDLIG_SOKNAD:
            return (
                <AppText
                    id="svarfrist.forTidligSoknad"
                    values={{
                        frist: dateFormatter.full(frist),
                        dato: (chunk: string) => <strong>{chunk}</strong>,
                    }}
                />
            );
        default:
            return (
                <>
                    <BodyShort spacing>
                        <AppText
                            id="svarfrist.generellFrist.1"
                            values={{
                                frist: dateFormatter.full(frist),
                                dato: (chunk: string) => <strong>{chunk}</strong>,
                            }}
                        />
                    </BodyShort>
                    <BodyShort>
                        <AppText id="svarfrist.generellFrist.2" />
                    </BodyShort>
                </>
            );
    }
};
