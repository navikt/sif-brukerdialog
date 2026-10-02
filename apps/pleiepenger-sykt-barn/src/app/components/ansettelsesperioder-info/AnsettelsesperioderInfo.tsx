import { Box, List, ReadMore } from '@navikt/ds-react';
import { dateFormatter, MaybeDateRange, sortMaybeDateRange } from '@navikt/sif-common-utils';

import { AppText, useAppIntl } from '../../i18n';

interface Props {
    ansettelsesperioder: MaybeDateRange[];
}

const Ansettelsesperiode = ({ periode }: { periode: MaybeDateRange }) => {
    if (periode.from === undefined && periode.to === undefined) {
        return null;
    }
    if (periode.from && periode.to) {
        return (
            <AppText
                id="steg.arbeidssituasjon.ansettelsesperioder.ansattFomTom"
                values={{ fom: dateFormatter.compact(periode.from), tom: dateFormatter.compact(periode.to) }}
            />
        );
    }
    if (periode.from) {
        return (
            <AppText
                id="steg.arbeidssituasjon.ansettelsesperioder.ansattFom"
                values={{ dato: dateFormatter.compact(periode.from) }}
            />
        );
    }
    if (periode.to) {
        return (
            <AppText
                id="steg.arbeidssituasjon.ansettelsesperioder.ansattTom"
                values={{ dato: dateFormatter.compact(periode.to) }}
            />
        );
    }
    return null;
};

const AnsettelsesperioderInfo = ({ ansettelsesperioder }: Props) => {
    const { text } = useAppIntl();
    return ansettelsesperioder.length === 1 ? (
        <Ansettelsesperiode periode={ansettelsesperioder[0]} />
    ) : (
        <ReadMore header={text('steg.arbeidssituasjon.ansettelsesperioder.tittel')}>
            <Box marginBlock="space-0 space-24">
                <List>
                    {[...ansettelsesperioder]
                        .sort(sortMaybeDateRange)
                        .reverse()
                        .map((periode, index) => {
                            return (
                                <List.Item key={index}>
                                    <Ansettelsesperiode periode={periode} />
                                </List.Item>
                            );
                        })}
                </List>
            </Box>
        </ReadMore>
    );
};

export default AnsettelsesperioderInfo;
