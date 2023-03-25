import { Alert, Button } from '@navikt/ds-react';
import React from 'react';
import bemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import { dateFormatter, dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';
import { LovbestemtFeriePeriode } from '../../types/Sak';
import DeleteButton from '../delete-button/DeleteButton';
import EditButton from '../edit-button/EditButton';
import FerieTag from '../tags/FerieTag';
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
                                        <FerieTag type="fjernet">Fjernet</FerieTag>
                                    )}
                                    {periode.liggerISak === false && <FerieTag type="registrert">Lagt til</FerieTag>}
                                </div>
                                <div className={bem.element('ferie__actions')}>
                                    {periode.skalHaFerie === false && onUndoDelete && (
                                        <Button variant="secondary" size="small" onClick={() => onUndoDelete(periode)}>
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
