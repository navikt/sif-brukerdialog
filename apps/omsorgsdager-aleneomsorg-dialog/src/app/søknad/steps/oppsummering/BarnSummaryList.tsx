import { SummaryList } from '@navikt/sif-common-ui';
import { ApiBarn } from '../../../types/søknadApiData/SøknadApiData';
import { TidspunktForAleneomsorg } from '../tidspunkt-for-aleneomsorg/TidspunktForAleneomsorgStep';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import { AppIntlShape, useAppIntl } from '../../../i18n';

interface Props {
    barn: ApiBarn[];
}
const tidspunktRenderer = (
    { text }: AppIntlShape,
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
                    <span>
                        {text('step.oppsummering.omOmsorgenForBarn.harOmsorgFor.tidspunktForAleneomsorg.tidligere')}
                    </span>
                )}
                {tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE && dato && (
                    <span>
                        {text('step.oppsummering.omOmsorgenForBarn.harOmsorgFor.tidspunktForAleneomsorg', {
                            dato: prettifyDateExtended(ISODateToDate(dato)),
                        })}
                    </span>
                )}
            </div>
        </>
    );
};
const BarnSummaryList = ({ barn }: Props) => {
    const appIntl = useAppIntl();
    return (
        <SummaryList
            items={barn}
            useAkselList={true}
            itemRenderer={({ navn, tidspunktForAleneomsorg, dato }: ApiBarn) => {
                if (tidspunktForAleneomsorg) {
                    return tidspunktRenderer(appIntl, navn, tidspunktForAleneomsorg, dato);
                } else return navn;
            }}
        />
    );
};

export default BarnSummaryList;
