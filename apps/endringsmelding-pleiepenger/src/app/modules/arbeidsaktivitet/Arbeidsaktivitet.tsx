import { isDateInDateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import ArbeidsaktivitetBlock from '../../components/arbeidsaktivitet-block/ArbeidsaktivitetBlock';
import { ArbeidstidEndringMap } from '../../types/ArbeidstidEndring';
import { ArbeidAktivitet, ArbeidAktivitetType } from '../../types/Sak';
import { LovbestemtFerieSøknadsdata } from '../../types/søknadsdata/LovbestemtFerieSøknadsdata';
import ArbeidsaktivitetContent from './components/ArbeidsaktivitetContent';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    endringer: ArbeidstidEndringMap | undefined;
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
    renderAsExpansionCard?: boolean;
    expansionCardDefaultOpen?: boolean;
    onArbeidstidAktivitetChange: (arbeidstidEndringer: ArbeidstidEndringMap) => void;
}

const Arbeidsaktivitet = ({
    arbeidAktivitet,
    endringer,
    lovbestemtFerie,
    renderAsExpansionCard,
    expansionCardDefaultOpen,
    onArbeidstidAktivitetChange,
}: Props) => {
    const perioder = arbeidAktivitet.perioderMedArbeidstid;
    const harEndringer =
        endringer !== undefined &&
        perioder.some((periode) => {
            return Object.keys(endringer)
                .map(ISODateRangeToDateRange)
                .some((dr) => isDateInDateRange(dr.from, periode));
        });

    return (
        <div data-testid={`aktivitet_${arbeidAktivitet.id}`}>
            <ArbeidsaktivitetBlock
                type={arbeidAktivitet.type}
                navn={arbeidAktivitet.navn}
                arbeidsgiver={
                    arbeidAktivitet.type === ArbeidAktivitetType.arbeidstaker ? arbeidAktivitet.arbeidsgiver : undefined
                }
                endret={harEndringer ? { tekst: 'Endret arbeidstid' } : undefined}
                nytt={arbeidAktivitet.type === ArbeidAktivitetType.arbeidstaker && arbeidAktivitet.erNyArbeidsaktivitet}
                renderAsExpansionCard={renderAsExpansionCard}
                expansionCardDefaultOpen={expansionCardDefaultOpen}>
                <ArbeidsaktivitetContent
                    perioder={perioder}
                    arbeidAktivitet={arbeidAktivitet}
                    lovbestemtFerie={lovbestemtFerie}
                    endringer={endringer}
                    onArbeidstidAktivitetChange={onArbeidstidAktivitetChange}
                />
            </ArbeidsaktivitetBlock>
        </div>
    );
};

export default Arbeidsaktivitet;
