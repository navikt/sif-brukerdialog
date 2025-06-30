import { FormSummary, List, VStack } from '@navikt/ds-react';
import EditStepLink from '@navikt/sif-common-soknad-ds/src/components/edit-step-link/EditStepLink';
import { AppText, useAppIntl } from '../../../../i18n';
import {
    FerieuttakIPeriodenApiData,
    KursApiData,
    UtenlandsoppholdIPeriodenApiData,
} from '../../../../types/søknadApiData/SøknadApiData';
import {
    capsFirstCharacter,
    dateFormatter,
    dateRangeFormatter,
    ISODateRangeToDateRange,
    ISODateToDate,
} from '@navikt/sif-common-utils';
import { JaNeiSvar, Sitat, TextareaSvar } from '@navikt/sif-common-ui';

interface Props {
    kurs: KursApiData;
    ferieuttakIPerioden: FerieuttakIPeriodenApiData;
    utenlandsoppholdIPerioden: UtenlandsoppholdIPeriodenApiData;
    onEdit?: () => void;
}

const KursOppsummering = ({ onEdit, kurs, ferieuttakIPerioden, utenlandsoppholdIPerioden }: Props) => {
    const { kursholder, kursperioder } = kurs;
    const { locale } = useAppIntl();
    return (
        <>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">
                        <AppText id="steg.oppsummeringkurs.header" />
                    </FormSummary.Heading>
                    {onEdit && <EditStepLink onEdit={onEdit} />}
                </FormSummary.Header>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="oppsummering.kurs.institusjon" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {typeof kursholder === 'string' ? kursholder : kursholder.navn}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="oppsummering.kurs.perioder" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <List>
                                {kursperioder.map((kursperiode) => {
                                    const periodeString = dateRangeFormatter.getDateRangeText(
                                        ISODateRangeToDateRange(kursperiode),
                                        locale,
                                    );
                                    return <List.Item key={periodeString}>{periodeString}</List.Item>;
                                })}
                            </List>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>Reiser du på dager du ikke har kurs eller opplæring?</FormSummary.Label>
                        <FormSummary.Value>
                            <JaNeiSvar harSvartJa={kurs.reise.reiserUtenforKursdager} />
                        </FormSummary.Value>
                    </FormSummary.Answer>

                    {kurs.reise.reiserUtenforKursdager ? (
                        <>
                            <FormSummary.Answer>
                                <FormSummary.Label>Reisedager uten kurs eller opplæring</FormSummary.Label>
                                <FormSummary.Value>
                                    <VStack>
                                        <List>
                                            {kurs.reise.reisedager.map((reisedag) => {
                                                return (
                                                    <List.Item key={reisedag}>
                                                        {capsFirstCharacter(
                                                            dateFormatter.dayCompactDate(ISODateToDate(reisedag)),
                                                        )}
                                                    </List.Item>
                                                );
                                            })}
                                        </List>
                                    </VStack>
                                </FormSummary.Value>
                            </FormSummary.Answer>
                            <FormSummary.Answer>
                                <FormSummary.Label>Årsak til reisetid</FormSummary.Label>
                                <FormSummary.Value>
                                    <Sitat>
                                        <TextareaSvar text={kurs.reise.reisedagerBeskrivelse} />
                                    </Sitat>
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        </>
                    ) : null}

                    {ferieuttakIPerioden && (
                        <>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="oppsummering.kurs.ferieuttakIPerioden.header" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <AppText id={ferieuttakIPerioden.skalTaUtFerieIPerioden ? 'Ja' : 'Nei'} />
                                </FormSummary.Value>
                            </FormSummary.Answer>

                            {ferieuttakIPerioden.ferieuttak.length > 0 && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="oppsummering.kurs.ferieuttakIPerioden.listTitle" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <List>
                                            {ferieuttakIPerioden.ferieuttak.map((ferieuttak) => (
                                                <List.Item key={ferieuttak.fraOgMed}>
                                                    {dateFormatter.compact(ISODateToDate(ferieuttak.fraOgMed))} -{' '}
                                                    {dateFormatter.compact(ISODateToDate(ferieuttak.tilOgMed))}
                                                </List.Item>
                                            ))}
                                        </List>
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                        </>
                    )}
                    {utenlandsoppholdIPerioden && (
                        <>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="oppsummering.kurs.utenlandsoppholdIPerioden.header" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <AppText
                                        id={utenlandsoppholdIPerioden.skalOppholdeSegIUtlandetIPerioden ? 'Ja' : 'Nei'}
                                    />
                                </FormSummary.Value>
                            </FormSummary.Answer>

                            {utenlandsoppholdIPerioden.opphold.length > 0 && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="oppsummering.kurs.utenlandsoppholdIPerioden.listTitle" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <List>
                                            {utenlandsoppholdIPerioden.opphold.map((opphold) => (
                                                <List.Item key={opphold.fraOgMed}>
                                                    {dateFormatter.compact(ISODateToDate(opphold.fraOgMed))} -{' '}
                                                    {dateFormatter.compact(ISODateToDate(opphold.tilOgMed))}
                                                </List.Item>
                                            ))}
                                        </List>
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                        </>
                    )}
                </FormSummary.Answers>
            </FormSummary>
        </>
    );
};

export default KursOppsummering;
