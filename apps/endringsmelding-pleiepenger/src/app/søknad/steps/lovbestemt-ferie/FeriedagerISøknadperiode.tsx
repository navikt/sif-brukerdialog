import { Button } from '@navikt/ds-react';
import React, { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import FerieuttakForm from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/FerieuttakForm';
import { Ferieuttak } from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/types';
import {
    DateRange,
    dateRangeToISODateRange,
    dateToISODate,
    getDateRangesFromDates,
    getDatesInDateRange,
    ISODateToDate,
    sortDateRange,
} from '@navikt/sif-common-utils/lib';
import LovbestemtFerieListe from '../../../components/lovbestemt-ferie-liste/LovbestemtFerieListe';
import LovbestemtFerieModal from '../../../components/lovbestemt-ferie-modal/LovbestemtFerieModal';
import { LovbestemtFeriePeriode } from '../../../types/Sak';
import { getFeriedagerIPeriode } from '../../../utils/ferieUtils';
import { FeriedagMap } from './LovbestemtFerieStep';

interface Props {
    søknadsperiode: DateRange;
    feriedager: FeriedagMap;
    onChange: (feriedager: FeriedagMap) => void;
}

const FeriedagerISøknadsperiode: React.FunctionComponent<Props> = ({ feriedager, søknadsperiode, onChange }) => {
    const [visFerieModal, setVisFerieModal] = useState<{ periode: DateRange | undefined } | undefined>();

    const perioder = getLovbestemFerieFraFeriedager(getFeriedagerIPeriode(feriedager, søknadsperiode));

    const getAndreFerieperioder = (): DateRange[] => {
        const periode = visFerieModal ? visFerieModal.periode : undefined;
        return periode
            ? perioder.filter((p) => dateRangeToISODateRange(p) !== dateRangeToISODateRange(periode))
            : perioder;
    };
    return (
        <>
            <LovbestemtFerieListe
                perioder={perioder}
                onUndoDelete={(periode) => {
                    onChange(leggTilFerie(feriedager, periode));
                }}
                onEdit={(periode) => {
                    setVisFerieModal({
                        periode,
                    });
                }}
                onDelete={(periode) => {
                    onChange(fjernFerie(feriedager, periode));
                }}
            />

            <Block>
                <Button
                    data-testid="leggTilFerieKnapp"
                    onClick={() => {
                        setVisFerieModal({
                            periode: undefined,
                        });
                    }}
                    type="button"
                    variant="secondary"
                    size="small">
                    Legg til ferie
                </Button>
            </Block>

            {visFerieModal && (
                <LovbestemtFerieModal
                    onClose={() => setVisFerieModal(undefined)}
                    title={'Lovbestemt ferie'}
                    open={visFerieModal !== undefined}>
                    <FerieuttakForm
                        ferieuttak={visFerieModal.periode}
                        alleFerieuttak={getAndreFerieperioder()}
                        minDate={søknadsperiode.from}
                        maxDate={søknadsperiode.to}
                        onSubmit={(ferieuttak: Ferieuttak) => {
                            if (visFerieModal.periode) {
                                onChange(oppdaterFerie(feriedager, visFerieModal.periode, ferieuttak));
                            } else {
                                onChange(leggTilFerie(feriedager, ferieuttak));
                            }
                            setVisFerieModal(undefined);
                        }}
                        onCancel={() => setVisFerieModal(undefined)}
                    />
                </LovbestemtFerieModal>
            )}
        </>
    );
};

const oppdaterFerie = (feriedager: FeriedagMap, opprinneligPeriode: DateRange, nyPeriode: DateRange): FeriedagMap => {
    const dager: FeriedagMap = fjernFerie(feriedager, opprinneligPeriode);
    return leggTilFerie(dager, nyPeriode);
};

const leggTilFerie = (feriedager: FeriedagMap, periode: DateRange): FeriedagMap => {
    const dager: FeriedagMap = { ...feriedager };
    getDatesInDateRange(periode)
        .map(dateToISODate)
        .forEach((key) => {
            const dato = ISODateToDate(key);
            if (dager[key]) {
                dager[key] = {
                    ...dager[key],
                    dato,
                    skalHaFerie: true,
                };
            } else {
                dager[key] = {
                    dato,
                    skalHaFerie: true,
                    liggerISak: false,
                };
            }
        });
    return dager;
};

const fjernFerie = (feriedager: FeriedagMap, periode: DateRange): FeriedagMap => {
    const dager: FeriedagMap = { ...feriedager };
    getDatesInDateRange(periode)
        .map(dateToISODate)
        .forEach((key) => {
            if (dager[key].liggerISak) {
                dager[key].skalHaFerie = false;
            } else {
                delete dager[key];
            }
        });
    return dager;
};

const getLovbestemFerieFraFeriedager = (feriedager: FeriedagMap): LovbestemtFeriePeriode[] => {
    const datoerFjernet: Date[] = [];
    const datoerLagtTil: Date[] = [];
    const datoerUendret: Date[] = [];

    Object.keys(feriedager).forEach((key) => {
        const dag = feriedager[key];
        const dato = ISODateToDate(key);
        if (dag.liggerISak && dag.skalHaFerie === false) {
            datoerFjernet.push(dato);
        } else if (!dag.liggerISak && dag.skalHaFerie) {
            datoerLagtTil.push(dato);
        } else {
            datoerUendret.push(dato);
        }
    });

    const perioderLagtTil = getDateRangesFromDates(datoerLagtTil).map(
        (periode): LovbestemtFeriePeriode => ({
            ...periode,
            skalHaFerie: true,
            liggerISak: false,
        })
    );
    const perioderFjernet = getDateRangesFromDates(datoerFjernet).map(
        (periode): LovbestemtFeriePeriode => ({
            ...periode,
            skalHaFerie: false,
            liggerISak: true,
        })
    );
    const perioderUendret = getDateRangesFromDates(datoerUendret).map(
        (periode): LovbestemtFeriePeriode => ({
            ...periode,
            skalHaFerie: true,
            liggerISak: true,
        })
    );
    return [...perioderLagtTil, ...perioderFjernet, ...perioderUendret].sort(sortDateRange);
};
export default FeriedagerISøknadsperiode;
