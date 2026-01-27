import { List } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

import { EndringerRefusjon, EndringRefusjon, Refusjon } from '../../../types/inntektsmeldingTypes';
import { getRefusjonFørFørsteEndring } from '../../../utils/inntektsmeldingUtils';

interface Props {
    inntektBeløp: number;
    refusjon?: Refusjon;
    endringerRefusjon?: EndringerRefusjon;
    startDatoPermisjon: Date;
}

enum RefusjonUtbetaler {
    ARBEIDSGIVER = 'ARBEIDSGIVER',
    NAV = 'NAV',
    BEGGE = 'BEGGE',
}

const utledUtbetaler = ({ total, utbetaling }: { total: number; utbetaling: number }): RefusjonUtbetaler => {
    // Arbeidsgiver betaler alt
    if (utbetaling === total) {
        return RefusjonUtbetaler.ARBEIDSGIVER;
    }
    // Nav betaler alt
    if (utbetaling === 0) {
        return RefusjonUtbetaler.NAV;
    }
    // Nav og arbeidsgiver deler på betalingen
    return RefusjonUtbetaler.BEGGE;
};

const renderEndringListItem = (endring: EndringRefusjon, refusjonBeløpPerMnd: number) => {
    const hvemBetaler = utledUtbetaler({ total: refusjonBeløpPerMnd, utbetaling: endring.refusjonBeløpPerMnd });
    const datoString = `Fra og med ${dateFormatter.compact(endring.fom)}`;
    switch (hvemBetaler) {
        case RefusjonUtbetaler.ARBEIDSGIVER:
            return `${datoString} betaler arbeidsgiver lønn til deg som vanlig.`;
        case RefusjonUtbetaler.NAV:
            return `${datoString} får du pleiepenger utbetalt direkte fra Nav.`;
        case RefusjonUtbetaler.BEGGE:
            return `${datoString} får du pleiepenger utbetalt direkte fra Nav og som lønn fra arbeidsgiver.`;
    }
};

const RefusjonInfo = ({ inntektBeløp, refusjon, endringerRefusjon, startDatoPermisjon }: Props) => {
    const harRefusjon = refusjon !== undefined && refusjon.refusjonBeløpPerMnd > 0;
    const harEndringerIRefusjon = refusjon && endringerRefusjon !== undefined && endringerRefusjon.length > 0;

    // Har ikke refusjon - Nav betaler alt
    if (!harRefusjon) {
        return <>Du får pleiepengene utbetalt direkte fra Nav.</>;
    }

    // Har ikke endringer i refusjon; utled hvem som betaler for hele perioden
    if (!harEndringerIRefusjon) {
        const hvemBetaler = utledUtbetaler({
            total: inntektBeløp,
            utbetaling: refusjon.refusjonBeløpPerMnd,
        });
        switch (hvemBetaler) {
            case RefusjonUtbetaler.ARBEIDSGIVER:
                return <>Arbeidsgiver betaler lønn til deg som vanlig under fraværet.</>;
            case RefusjonUtbetaler.NAV:
                return <>Du får pleiepengene utbetalt direkte fra Nav.</>;
            case RefusjonUtbetaler.BEGGE:
                return (
                    <>
                        Arbeidsgiver betaler deler av lønnen til deg som vanlig under fraværet. Du får resten av
                        pleiepengene utbetalt direkte fra Nav.
                    </>
                );
        }
    }

    // Har endringer i refusjon - list opp endringene
    const førsteEndring = endringerRefusjon[0];

    const refusjonFørFørsteEndring = getRefusjonFørFørsteEndring(
        refusjon.refusjonBeløpPerMnd,
        startDatoPermisjon,
        førsteEndring,
    );

    const alleEndringer = refusjonFørFørsteEndring
        ? [refusjonFørFørsteEndring, ...endringerRefusjon]
        : endringerRefusjon;

    // Legg til opphør av refusjon som siste element hvis det finnes opphør av refusjon.
    // refusjonOpphører utledes fra siste endring i refusjon.
    if (refusjon.refusjonOpphører) {
        alleEndringer.push({
            fom: refusjon.refusjonOpphører,
            refusjonBeløpPerMnd: 0,
        });
    }

    return (
        <List>
            {alleEndringer.map((endring, index) => (
                <List.Item key={index}>{renderEndringListItem(endring, refusjon.refusjonBeløpPerMnd)}</List.Item>
            ))}
        </List>
    );
};

export default RefusjonInfo;
