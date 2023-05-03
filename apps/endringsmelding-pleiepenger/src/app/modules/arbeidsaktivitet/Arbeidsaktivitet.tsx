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
                renderAsExpansionCard={renderAsExpansionCard}>
                <ArbeidsaktivitetContent
                    perioder={perioder}
                    arbeidAktivitet={arbeidAktivitet}
                    lovbestemtFerie={lovbestemtFerie}
                    endringer={endringer}
                    onArbeidstidAktivitetChange={onArbeidstidAktivitetChange}
                />
            </ArbeidsaktivitetBlock>

            {/* {renderAsExpansionCard ? (
                <ExpansionCard aria-label={arbeidAktivitet.navn} defaultOpen={true}>
                    <ExpansionCard.Header>
                        <ArbeidAktivitetHeader arbeidAktivitet={arbeidAktivitet} erEndret={harEndringer} />
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
                    <ArbeidAktivitetHeader arbeidAktivitet={arbeidAktivitet} erEndret={harEndringer} />
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
            )} */}
        </div>
    );
};

export default Arbeidsaktivitet;
