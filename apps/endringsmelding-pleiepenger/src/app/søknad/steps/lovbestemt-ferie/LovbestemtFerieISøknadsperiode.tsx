import { Button } from '@navikt/ds-react';
import React, { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import FerieuttakForm from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/FerieuttakForm';
import { Ferieuttak } from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/types';
import { DateRange, dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';
import LovbestemtFerieListe from '../../../components/lovbestemt-ferie-liste/LovbestemtFerieListe';
import LovbestemtFerieModal from '../../../components/lovbestemt-ferie-modal/LovbestemtFerieModal';
import { LovbestemtFeriePeriode } from '../../../types/Sak';
import { lovbestemtFerieStepUtils } from './lovbestemtFerieStepUtils';

interface Props {
    søknadsperiode: DateRange;
    perioderIMelding: LovbestemtFeriePeriode[];
    perioderISak: LovbestemtFeriePeriode[];
    onChange: (perioder: LovbestemtFeriePeriode[]) => void;
}

const LovbestemtFerieISøknadsperiode: React.FunctionComponent<Props> = ({
    onChange,
    søknadsperiode,
    perioderIMelding,
    perioderISak,
}) => {
    const [visFerieModal, setVisFerieModal] = useState<{ periode: DateRange | undefined } | undefined>();

    const { deletePeriode, getLovbestemtFerieEndringerForPeriode, leggTilPeriode, oppdaterPeriode, undoDeletePeriode } =
        lovbestemtFerieStepUtils;

    const ferieIPerioden = getLovbestemtFerieEndringerForPeriode(
        søknadsperiode,
        perioderIMelding,
        perioderISak
    ).perioder;

    const getAndreFerieperioder = (): DateRange[] => {
        const periode = visFerieModal ? visFerieModal.periode : undefined;
        return periode
            ? perioderIMelding.filter((p) => dateRangeToISODateRange(p) !== dateRangeToISODateRange(periode))
            : perioderIMelding;
    };
    return (
        <>
            <LovbestemtFerieListe
                perioder={ferieIPerioden}
                onUndoDelete={(periode) => {
                    onChange(undoDeletePeriode(periode, perioderIMelding, perioderISak));
                }}
                onEdit={(periode) => {
                    setVisFerieModal({
                        periode,
                    });
                }}
                onDelete={(periode) => {
                    onChange(deletePeriode(periode, perioderIMelding, perioderISak));
                }}
            />
            <Block>
                <Button
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
                            const perioder = visFerieModal.periode
                                ? oppdaterPeriode(visFerieModal.periode, ferieuttak, perioderIMelding, perioderISak)
                                : leggTilPeriode(ferieuttak, perioderIMelding, perioderISak);
                            setVisFerieModal(undefined);
                            onChange(perioder);
                        }}
                        onCancel={() => setVisFerieModal(undefined)}
                    />
                </LovbestemtFerieModal>
            )}
        </>
    );
};

export default LovbestemtFerieISøknadsperiode;
