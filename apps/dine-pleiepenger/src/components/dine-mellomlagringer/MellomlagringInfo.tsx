// import { Box } from '@navikt/ds-react';
// import dayjs from 'dayjs';
// import { useIntl } from 'react-intl';

// interface Props {
//     søknadUpdatedTimestamp?: Date;
//     endringUpdatedTimestamp?: Date;
// }

// const getDatoOgTidTilSlettSøknadString = (date: Date): Date => {
//     return dayjs(date).add(72, 'hours').toDate();
// };

// const MellomlagringInfo = ({ søknadUpdatedTimestamp, endringUpdatedTimestamp }: Props) => {
//     const intl = useIntl();
//     const datoNårSøknadSlettes = søknadUpdatedTimestamp
//         ? getDatoOgTidTilSlettSøknadString(søknadUpdatedTimestamp)
//         : undefined;
//     const datoNårEndringSlettes = endringUpdatedTimestamp
//         ? getDatoOgTidTilSlettSøknadString(endringUpdatedTimestamp)
//         : undefined;

//     // const title = isFeatureEnabled(Feature.ENDRINGSDIALOG)
//     //     ? intlHelper(intl, 'page.dinOversikt.påbegyntEndringEllerSøknad.title')
//     //     : intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.title');

//     // const ingenEndringTekst = isFeatureEnabled(Feature.ENDRINGSDIALOG)
//     //     ? intlHelper(intl, 'page.dinOversikt.påbegyntEndringEllerSøknad.ingenPåbegynt')
//     //     : intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.ingenPåbegynt');

//     return (
//         <Box className="bg-white">
//             {datoNårSøknadSlettes && (
//                 <div className={bem.block}>
//                     <LinkPanel href={getLenker().pleiepengerURL} border={true}>
//                         <div className={bem.element('content')}>
//                             <div className={bem.element('title')}>
//                                 {intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.info.title')}
//                             </div>

//                             {intlHelper(intl, `page.dinOversikt.påbegyntSøknad.info`, {
//                                 datoNårSlettes: datoNårSøknadSlettes,
//                             })}
//                         </div>
//                     </LinkPanel>
//                 </div>
//             )}
//             {datoNårEndringSlettes && (
//                 <div className={bem.block}>
//                     <LenkepanelBase href={getLenker().endringsdialogPleiepenger} border={true}>
//                         <div className={bem.element('content')}>
//                             <div className={bem.element('title')}>
//                                 {intlHelper(intl, 'page.dinOversikt.påbegyntEndringsmelding.info.title')}
//                             </div>

//                             {intlHelper(intl, `page.dinOversikt.påbegyntEndringsmelding.info`, {
//                                 datoNårSlettes: datoNårEndringSlettes,
//                             })}
//                         </div>
//                     </LenkepanelBase>
//                 </div>
//             )}
//             {!datoNårSøknadSlettes && !datoNårEndringSlettes && <Box>{ingenEndringTekst}</Box>}
//         </Box>
//     );
// };

// export default MellomlagringInfo;
