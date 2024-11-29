import { Box, FormSummary, List, VStack } from '@navikt/ds-react';
import EditStepLink from '@navikt/sif-common-soknad-ds/src/components/edit-step-link/EditStepLink';
import { AppText, useAppIntl } from '../../../../i18n';
import { FerieuttakIPeriodenApiData, KursApiData } from '../../../../types/søknadApiData/SøknadApiData';
import {
    dateFormatter,
    dateRangeFormatter,
    ISODateRangeToDateRange,
    ISODateToDate,
    prettifyDateExtended,
} from '@navikt/sif-common-utils';
import { Sitat, TextareaSvar } from '@navikt/sif-common-ui';

interface Props {
    kurs: KursApiData;
    ferieuttakIPerioden: FerieuttakIPeriodenApiData;
    onEdit?: () => void;
}

const KursOppsummering = ({ onEdit, kurs, ferieuttakIPerioden }: Props) => {
    const { kursholder, perioder } = kurs;
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
                        <FormSummary.Value>{kursholder}</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="oppsummering.kurs.perioder" values={{ perioder: perioder.length }} />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <List>
                                {perioder.map((periode) => {
                                    const periodeString = dateRangeFormatter.getDateRangeText(
                                        ISODateRangeToDateRange(periode.kursperiode),
                                        locale,
                                    );
                                    const kursperiode = ISODateRangeToDateRange(periode.kursperiode);
                                    const avreise = periode.avreise ? ISODateToDate(periode.avreise) : kursperiode.from;
                                    const hjemkomst = periode.hjemkomst
                                        ? ISODateToDate(periode.hjemkomst)
                                        : kursperiode.to;

                                    return (
                                        <List.Item title={periodeString} key={periodeString}>
                                            <VStack gap="1">
                                                {periode.harTaptArbeidstid ? (
                                                    <>
                                                        <Box>
                                                            <AppText id="oppsummering.kurs.kursperiode.harTaptArbeidsinntekt" />
                                                        </Box>
                                                        <Box>
                                                            <AppText
                                                                id="oppsummering.kurs.kursperiode.avreise"
                                                                values={{ dato: dateFormatter.compact(avreise) }}
                                                            />
                                                        </Box>
                                                        <Box>
                                                            <AppText
                                                                id="oppsummering.kurs.kursperiode.hjemkomst"
                                                                values={{ dato: dateFormatter.compact(hjemkomst) }}
                                                            />
                                                        </Box>
                                                        <Box>
                                                            {periode.beskrivelseReisetid ? (
                                                                <>
                                                                    <Box>
                                                                        <AppText id="oppsummering.kurs.kursperiode.årsakReisetid" />
                                                                    </Box>
                                                                    <Sitat>
                                                                        <TextareaSvar
                                                                            text={periode.beskrivelseReisetid}
                                                                            spacing={false}
                                                                        />
                                                                    </Sitat>
                                                                </>
                                                            ) : null}
                                                        </Box>
                                                    </>
                                                ) : (
                                                    <Box>
                                                        <AppText id="oppsummering.kurs.kursperiode.harIkkeTaptArbeidsinntekt" />
                                                    </Box>
                                                )}
                                            </VStack>
                                        </List.Item>
                                    );
                                })}
                            </List>
                        </FormSummary.Value>
                    </FormSummary.Answer>
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
                                                    {prettifyDateExtended(ISODateToDate(ferieuttak.fraOgMed))} -{' '}
                                                    {prettifyDateExtended(ISODateToDate(ferieuttak.tilOgMed))}
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
