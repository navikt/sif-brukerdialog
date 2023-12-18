import { Button } from '@navikt/ds-react';
import React, { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FerieuttakForm from '@navikt/sif-common-forms-ds/src/forms/ferieuttak/FerieuttakForm';
import { Ferieuttak } from '@navikt/sif-common-forms-ds/src/forms/ferieuttak/types';
import {
    DateRange,
    dateRangeToISODateRange,
    dateToISODate,
    getDatesInDateRange,
    ISODateToDate,
} from '@navikt/sif-common-utils';
import { getFeriedagerIPeriode, getFeriedagerMeta } from '@utils';
import LovbestemtFerieListe from '../../../modules/lovbestemt-ferie-liste/LovbestemtFerieListe';
import LovbestemtFerieModal from '../../../modules/lovbestemt-ferie-modal/LovbestemtFerieModal';
import { FeriedagMap } from './LovbestemtFerieStep';

interface Props {
    søknadsperiode: DateRange;
    alleFeriedager: FeriedagMap;
    onChange: (feriedager: FeriedagMap) => void;
}

const FeriedagerISøknadsperiode: React.FunctionComponent<Props> = ({ alleFeriedager, søknadsperiode, onChange }) => {
    const [visFerieModal, setVisFerieModal] = useState<{ periode: DateRange | undefined } | undefined>();

    const perioder = getFeriedagerMeta(getFeriedagerIPeriode(alleFeriedager, søknadsperiode)).ferieperioder;

    const getAndreFerieperioder = (): DateRange[] => {
        const periode = visFerieModal ? visFerieModal.periode : undefined;
        return periode
            ? perioder.filter(
                  (p) => dateRangeToISODateRange(p) !== dateRangeToISODateRange(periode) && p.skalHaFerie === true,
              )
            : perioder;
    };

    return (
        <>
            <LovbestemtFerieListe
                perioder={perioder}
                onUndoDelete={(periode) => {
                    onChange(leggTilFerie(alleFeriedager, periode));
                }}
                onEdit={(periode) => {
                    setVisFerieModal({
                        periode,
                    });
                }}
                onDelete={(periode) => {
                    onChange(fjernFerie(alleFeriedager, periode));
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
                    title={'Ferie'}
                    open={visFerieModal !== undefined}>
                    <FerieuttakForm
                        ferieuttak={visFerieModal.periode}
                        alleFerieuttak={getAndreFerieperioder()}
                        minDate={søknadsperiode.from}
                        maxDate={søknadsperiode.to}
                        onSubmit={(ferieuttak: Ferieuttak) => {
                            if (visFerieModal.periode) {
                                onChange(oppdaterFerie(alleFeriedager, visFerieModal.periode, ferieuttak));
                            } else {
                                onChange(leggTilFerie(alleFeriedager, ferieuttak));
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
            const opprinneligDag = feriedager[key];
            if (opprinneligDag) {
                if (opprinneligDag.liggerISak) {
                    dager[key] = {
                        ...opprinneligDag,
                        skalHaFerie: false,
                    };
                } else {
                    delete dager[key];
                }
            }
        });
    return dager;
};

export default FeriedagerISøknadsperiode;
