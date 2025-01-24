import { dateFormatter, MaybeDateRange, sortMaybeDateRange } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '../../i18n';
import { Box, List } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';

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
                id="arbeidsaktivitetBlockHeader.arbeidsgiver.ansattFomTom"
                values={{ fom: dateFormatter.compact(periode.from), tom: dateFormatter.compact(periode.to) }}
            />
        );
    }
    if (periode.from) {
        return (
            <AppText
                id="arbeidsaktivitetBlockHeader.arbeidsgiver.ansattFom"
                values={{ dato: dateFormatter.compact(periode.from) }}
            />
        );
    }
    if (periode.to) {
        return (
            <AppText
                id="arbeidsaktivitetBlockHeader.arbeidsgiver.ansattTom"
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
        <ExpandableInfo title={text('arbeidsaktivitetBlockHeader.arbeidsgiver.ansettelsesperioder')}>
            <Box marginBlock="0 6">
                <List>
                    {ansettelsesperioder
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
        </ExpandableInfo>
    );
};

export default AnsettelsesperioderInfo;
