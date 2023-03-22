import React from 'react';
import bemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import { dateFormatter, dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';
import { LovbestemtFeriePeriode } from '../../types/Sak';
import DeleteButton from '../delete-button/DeleteButton';
import EditButton from '../edit-button/EditButton';
import './lovbestemtFerieListe.scss';
import { Tag } from '@navikt/ds-react';
import ActionLink from '@navikt/sif-common-core-ds/lib/components/action-link/ActionLink';

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
                {perioder.map((periode) => {
                    const { from, to } = periode;
                    const fra = dateFormatter.dayCompactDate(from);
                    const til = dateFormatter.dayCompactDate(to);
                    const periodeTekst = `${fra} - ${til}`;
                    return (
                        <li key={dateRangeToISODateRange({ from: from, to: to })}>
                            <div className={bem.element('ferie')}>
                                <div className={bem.element('ferie__periode')}>
                                    {periodeTekst}
                                    {periode.skalHaFerie === false && (
                                        <Tag variant="error" size="small">
                                            Fjernet
                                        </Tag>
                                    )}
                                </div>
                                {periode.skalHaFerie === false && onUndoDelete && (
                                    <div className={bem.element('ferie__angreKnapp')}>
                                        <ActionLink onClick={() => onUndoDelete(periode)}>Angre fjern</ActionLink>
                                    </div>
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
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default LovbestemtFerieListe;
