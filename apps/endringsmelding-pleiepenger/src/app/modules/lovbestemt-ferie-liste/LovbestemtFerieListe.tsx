import { Alert, Button } from '@navikt/ds-react';
import React from 'react';
import bemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import { dateFormatter, dateRangeToISODateRange } from '@navikt/sif-common-utils';
import { LovbestemtFeriePeriode } from '../../types/LovbestemtFeriePeriode';
import DeleteButton from '../../components/buttons/DeleteButton';
import EditButton from '../../components/buttons/EditButton';
import FerieTag from '../../components/tags/FerieTag';
import './lovbestemtFerieListe.scss';

const bem = bemUtils('lovbestemtFerieListe');

interface Props {
    perioder: LovbestemtFeriePeriode[];
    onEdit?: (periode: LovbestemtFeriePeriode) => void;
    onDelete?: (periode: LovbestemtFeriePeriode) => void;
    onUndoDelete?: (periode: LovbestemtFeriePeriode) => void;
}

const LovbestemtFerieListe: React.FunctionComponent<Props> = ({ perioder, onEdit, onDelete, onUndoDelete }) => {
    return (
        <>
            <ul className={bem.block}>
                {perioder.length === 0 && (
                    <li>
                        <Alert inline={true} variant="info">
                            Ingen ferie registrert
                        </Alert>
                    </li>
                )}

                {perioder.map((periode) => {
                    const { from, to } = periode;
                    const fra = dateFormatter.dayCompactDate(from);
                    const til = dateFormatter.dayCompactDate(to);
                    const periodeTekst = fra === til ? fra : `${fra} - ${til}`;
                    return (
                        <li key={dateRangeToISODateRange({ from: from, to: to })}>
                            <div className={bem.element('ferie')}>
                                <div
                                    className={bem.element(
                                        'ferie__periode',
                                        periode.skalHaFerie === false ? 'fjernet' : undefined
                                    )}>
                                    <span className={'dato'}>{periodeTekst}</span>
                                    {periode.liggerISak && periode.skalHaFerie === false && (
                                        <FerieTag type="fjernet">Ferie fjernet</FerieTag>
                                    )}
                                    {periode.liggerISak === false && (
                                        <FerieTag type="registrert">Ferie lagt til</FerieTag>
                                    )}
                                </div>
                                <div className={bem.element('ferie__actions')}>
                                    {periode.skalHaFerie === false && onUndoDelete && (
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="small"
                                            onClick={() => onUndoDelete(periode)}
                                            data-testid="angre_fjern_ferie_knapp">
                                            Angre fjern
                                        </Button>
                                    )}
                                    {periode.skalHaFerie === true && (
                                        <>
                                            {onEdit && (
                                                <div className={bem.element('ferie__endreKnapp')}>
                                                    <EditButton
                                                        onClick={() => onEdit(periode)}
                                                        title="Endre ferie"
                                                        aria-label={`Endre ferie ${periodeTekst}`}
                                                    />
                                                </div>
                                            )}
                                            {onDelete && (
                                                <div className={bem.element('ferie__fjernKnapp')}>
                                                    <DeleteButton
                                                        onClick={() => {
                                                            onDelete(periode);
                                                        }}
                                                        title="Fjern ferie"
                                                        aria-label={`Fjern ferie ${periodeTekst}`}
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default LovbestemtFerieListe;
