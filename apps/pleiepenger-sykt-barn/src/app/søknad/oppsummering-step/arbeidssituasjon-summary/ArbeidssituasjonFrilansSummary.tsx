/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormattedMessage, useIntl } from 'react-intl';
import SummaryBlock from '@navikt/sif-common-soknad-ds/lib/components/summary-block/SummaryBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { Arbeidsgiver } from '../../../types';
import { FrilansApiData } from '../../../types/søknad-api-data/SøknadApiData';
// import NormalarbeidstidSummary from './NormalarbeidstidSummary';
// import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils/lib';
// import { Frilanstype } from '../../../types/FrilansFormData';

interface Props {
    frilans: FrilansApiData;
    frilansoppdrag: Arbeidsgiver[];
}

const ArbeidssituasjonFrilansSummary = ({ frilans /*, frilansoppdrag*/ }: Props) => {
    const intl = useIntl();
    if (frilans.harInntektSomFrilanser === false) {
        return (
            <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.frilanser.header')}>
                <ul data-testid="arbeidssituasjon-frilanser">
                    <li>
                        <FormattedMessage id={'oppsummering.arbeidssituasjon.frilans.erIkkeFrilanser'} tagName="p" />
                    </li>
                </ul>
            </SummaryBlock>
        );
    }

    return (
        <>TODO</>
        // <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.frilanser.header')}>
        //     <ul data-testid="arbeidssituasjon-frilanser">
        //         {frilans.frilanstyper.map((type) => {
        //             return (
        //                 <li key={type}>
        //                     <FormattedMessage id={`oppsummering.arbeidssituasjon.frilans.${type}`} />
        //                     {type === Frilanstype.HONORARARBEID && frilans.misterHonorarer === false && (
        //                         <div>
        //                             <FormattedMessage
        //                                 id={'oppsummering.arbeidssituasjon.frilans.HONORARARBEID.misterIkkeHonorar'}
        //                             />
        //                         </div>
        //                     )}
        //                 </li>
        //             );
        //         })}
        //         {(frilans.type === 'harArbeidsforhold' || frilans.type === 'harArbeidsforholdSluttetISøknadsperiode') &&
        //             frilans.startdato && (
        //                 <li>
        //                     <FormattedMessage
        //                         id="oppsummering.arbeidssituasjon.frilans.startet"
        //                         values={{ dato: dateFormatter.full(ISODateToDate(frilans.startdato)) }}
        //                     />
        //                 </li>
        //             )}
        //         {frilans.type === 'harArbeidsforholdSluttetISøknadsperiode' && frilans.sluttdato && (
        //             <li>
        //                 <FormattedMessage
        //                     id="oppsummering.arbeidssituasjon.frilans.sluttet"
        //                     values={{ dato: dateFormatter.full(ISODateToDate(frilans.sluttdato)) }}
        //                 />
        //             </li>
        //         )}
        //         {(frilans.type === 'harArbeidsforhold' ||
        //             frilans.type === 'harArbeidsforholdSluttetISøknadsperiode') && (
        //             <li>
        //                 <NormalarbeidstidSummary
        //                     normalarbeidstidApiData={frilans.arbeidsforhold.normalarbeidstid}
        //                     erAnsatt={true}
        //                 />
        //             </li>
        //         )}
        //         {/* Dersom bruker fortsatt er frilanser i perioden (arbeidsforhold finnes), og har frilansoppdrag */}
        //         {(frilans.type === 'harArbeidsforhold' || frilans.type === 'harArbeidsforholdSluttetISøknadsperiode') &&
        //             frilans.arbeidsforhold &&
        //             frilansoppdrag &&
        //             frilansoppdrag.length > 0 && (
        //                 <li>
        //                     <FormattedMessage id="oppsummering.arbeidssituasjon.frilans.frilansoppdrag" />
        //                     <br />
        //                     <ul style={{ margin: 0, padding: '0 0 0 1rem' }}>
        //                         {frilansoppdrag.map((oppdrag) => (
        //                             <li key={oppdrag.id}>{oppdrag.navn}</li>
        //                         ))}
        //                     </ul>
        //                 </li>
        //             )}
        //     </ul>
        // </SummaryBlock>
    );
};

export default ArbeidssituasjonFrilansSummary;
