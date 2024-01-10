import SummaryList from '@navikt/sif-common-soknad-ds/src/components/summary-list/SummaryList';
import { IntlShape, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { ApiBarn } from '../../../types/søknadApiData/SøknadApiData';
import { TidspunktForAleneomsorg } from '../tidspunkt-for-aleneomsorg/TidspunktForAleneomsorgStep';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';

interface Props {
    barn: ApiBarn[];
}
const tidspunktRenderer = (
    intl: IntlShape,
    navn: string,
    tidspunktForAleneomsorg: TidspunktForAleneomsorg,
    dato?: string,
): React.ReactNode => {
    return (
        <>
            <div>
                <span>{navn}</span>
            </div>
            <div>
                {tidspunktForAleneomsorg === TidspunktForAleneomsorg.TIDLIGERE && (
                    <>
                        <span>
                            {intlHelper(
                                intl,
                                'step.oppsummering.omOmsorgenForBarn.harOmsorgFor.tidspunktForAleneomsorg.tidligere',
                            )}
                        </span>
                    </>
                )}
                {tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE && dato && (
                    <>
                        <span>
                            {intlHelper(
                                intl,
                                'step.oppsummering.omOmsorgenForBarn.harOmsorgFor.tidspunktForAleneomsorg',
                                { dato: prettifyDateExtended(ISODateToDate(dato)) },
                            )}
                        </span>
                    </>
                )}
            </div>
        </>
    );
};
const BarnSummaryList = ({ barn }: Props) => {
    const intl = useIntl();
    return (
        <SummaryList
            items={barn}
            itemRenderer={({ navn, tidspunktForAleneomsorg, dato }: ApiBarn) => {
                if (tidspunktForAleneomsorg) {
                    return tidspunktRenderer(intl, navn, tidspunktForAleneomsorg, dato);
                } else return navn;
            }}
        />
    );
};

export default BarnSummaryList;
