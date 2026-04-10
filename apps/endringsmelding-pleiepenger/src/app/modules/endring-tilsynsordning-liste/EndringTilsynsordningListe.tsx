import './endringTilsynsordningListe.scss';

import DeleteButton from '@app/components/buttons/DeleteButton';
import EditButton from '@app/components/buttons/EditButton';
import { AppText, useAppIntl } from '@app/i18n';
import { Alert } from '@navikt/ds-react';
import { dateFormatter, dateRangeToISODateRange } from '@navikt/sif-common-utils';

import { TilsynsordningPeriodeData } from '../../søknad/steps/tilsynsordning-forenklet/types';

interface Props {
    perioder: TilsynsordningPeriodeData[];
    onEdit?: (periode: TilsynsordningPeriodeData) => void;
    onDelete?: (periode: TilsynsordningPeriodeData) => void;
}

const EndringTilsynsordningListe = ({ perioder, onEdit, onDelete }: Props) => {
    const { text } = useAppIntl();
    return (
        <ul className="endringTilsynsordningListe">
            {perioder.length === 0 && (
                <li>
                    <Alert inline={true} variant="info">
                        <AppText id="endringTilsynsordningListe.ingenEndringerRegistrert" />
                    </Alert>
                </li>
            )}

            {perioder.map((p) => {
                const { from, to } = p.periode;
                const fra = dateFormatter.dayCompactDate(from);
                const til = dateFormatter.dayCompactDate(to);
                const periodeTekst = fra === til ? fra : `${fra} - ${til}`;
                return (
                    <li key={dateRangeToISODateRange({ from: from, to: to })}>
                        <div className="endringTilsynsordningListe__endring">
                            <div className="endringTilsynsordningListe__endring__periode">
                                <span className="dato">{periodeTekst}</span>
                            </div>
                            <div className="endringTilsynsordningListe__endring__actions">
                                <>
                                    {onEdit && (
                                        <div className="endringTilsynsordningListe__endring__endreKnapp">
                                            <EditButton
                                                onClick={() => onEdit(p)}
                                                title={text('endringTilsynsordningListe.endreEndring.label')}
                                                aria-label={text('endringTilsynsordningListe.endreEndring.ariaLabel', {
                                                    periode: periodeTekst,
                                                })}
                                            />
                                        </div>
                                    )}
                                    {onDelete && (
                                        <div className="endringTilsynsordningListe__endring__fjernKnapp">
                                            <DeleteButton
                                                onClick={() => {
                                                    onDelete(p);
                                                }}
                                                title={text('endringTilsynsordningListe.fjernEndring.label')}
                                                aria-label={text('endringTilsynsordningListe.fjernEndring.ariaLabel', {
                                                    periode: periodeTekst,
                                                })}
                                            />
                                        </div>
                                    )}
                                </>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default EndringTilsynsordningListe;
