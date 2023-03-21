import React from 'react';
import bemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import { FerieuttakListProps } from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/FerieuttakList';
import { dateFormatter, dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';
import DeleteButton from '../delete-button/DeleteButton';
import EditButton from '../edit-button/EditButton';
import './lovbestemtFerieListe.scss';

const bem = bemUtils('lovbestemtFerieListe');

const LovbestemtFerieListe: React.FunctionComponent<FerieuttakListProps> = ({ ferieuttak, onEdit, onDelete }) => {
    return (
        <>
            <ul className={bem.block}>
                {ferieuttak.map((ferie) => {
                    const { from, to } = ferie;
                    const fra = dateFormatter.dayCompactDate(from);
                    const til = dateFormatter.dayCompactDate(to);
                    const periodeTekst = `${fra} - ${til}`;
                    return (
                        <li key={dateRangeToISODateRange({ from: from, to: to })}>
                            <div className={bem.element('ferie')}>
                                <div className={bem.element('ferie__periode')}>{periodeTekst}</div>
                                {onEdit && (
                                    <div className={bem.element('ferie__endreKnapp')}>
                                        <EditButton
                                            onClick={() => onEdit(ferie)}
                                            title="Endre ferie"
                                            aria-label={`Endre ferie ${periodeTekst}`}
                                        />
                                    </div>
                                )}
                                {onDelete && (
                                    <div className={bem.element('ferie__fjernKnapp')}>
                                        <DeleteButton
                                            onClick={() => {
                                                onDelete(ferie);
                                            }}
                                            title="Fjern ferie"
                                            aria-label={`Fjern ferie ${periodeTekst}`}
                                        />
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default LovbestemtFerieListe;
