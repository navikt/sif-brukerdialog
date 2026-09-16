import { BodyLong, List, VStack } from '@navikt/ds-react';
import { UngInnsynText } from '../../../i18n';
import { dateFormatter, ISODate } from '@sif/utils';

interface Props {
    frist: ISODate;
}

export const OppgavebekreftelseTilbakemeldingInfo = ({ frist }: Props) => {
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(frist)}</span>;
    return (
        <VStack gap="space-20">
            <BodyLong>
                <UngInnsynText id="@ungInnsyn.oppgavebekreftelse.felles.tekst.1" />
            </BodyLong>
            <List>
                <List.Item>
                    <UngInnsynText id="@ungInnsyn.oppgavebekreftelse.felles.tekst.2" />
                </List.Item>
                <List.Item>
                    <UngInnsynText id="@ungInnsyn.oppgavebekreftelse.felles.tekst.3" />
                </List.Item>
            </List>
            <BodyLong weight="semibold">
                <UngInnsynText id="@ungInnsyn.oppgavebekreftelse.felles.tekst.4" values={{ formatertFrist }} />
            </BodyLong>
            <BodyLong>
                <UngInnsynText id="@ungInnsyn.oppgavebekreftelse.felles.tekst.5" />
            </BodyLong>
        </VStack>
    );
};
