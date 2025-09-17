import { pictureScanningGuideMessages } from '../components/picture-scanning-guide/i18n/pictureScanningGuideMessages';
import { CoreMessageKeys } from './common.messages';

export const commonMessages_nn: Record<CoreMessageKeys, string> = {
    Ja: 'Ja',
    Nei: 'Nei',
    '@core.common.fileUploadError': 'Det har dessverre skjedd ein feil under opplasting av følgjande vedlegg:',
    '@core.formikFileUpload.label': 'Last opp dokument',
    '@core.formikFileUpload.description':
        'Du kan laste opp filtypane JPG, JPEG, PNG og PDF. Maks størrelse per fil er {MAX_SIZE_MB} MB.',
    '@core.formikFileUpload.dokumenterLastetOpp.tittel': 'Dokument lasta opp ({antall})',
    '@core.formikFileUpload.dokumenterLastetOpp.lasterOpp': 'Lastar opp ...',
    '@core.formikFileUpload.dokumenterAvvist.tittel': 'Dokument med feil',
    '@core.formikFileUpload.file-upload.error.fileType':
        'Filformatet er ikkje støtta. Filformat du kan laste opp er JPG, JPEG, PNG og PDF.',
    '@core.formikFileUpload.file-upload.error.fileSize': 'Fila er større enn ${MAX_SIZE_MB} MB.',
    '@core.formikFileUpload.file-upload.error.retry': 'Det oppstod ein feil under opplastinga.',
    '@core.formikFileUpload.file-upload.error.bad-request':
        'Uleselig fil. Kontroller at fila lar seg åpne og vert vist korrekt.',

    '@core.formikFileUpload.file-upload.error.unknown': 'Det oppstod ein feil under opplastinga ({reason})',
    '@core.vedleggSummaryList.ingenVedlegg': 'Ingen dokument er lasta opp',
    '@core.formikVedleggList.validation.noVedleggUploaded': 'Ingen dokument er lasta opp',
    '@core.formikVedleggList.validation.tooManyVedlegg': 'For mange dokument er lasta opp',
    '@core.formikVedleggList.validation.maxTotalSizeExceeded':
        'Total samla storleik for dokumenta du har lasta opp overstig grensa på 24 MB.',
    '@core.formik-vedlegg-form.alert.totalSize':
        'Du har totalt lasta opp meir enn grensa på 24 MB. Det tyder at du må fjerne noko av det du har lasta opp. Om det tyder at du ikkje får plass til alt du vil sende no, kan du <Lenke>ettersende fleire dokument</Lenke>.',
    '@core.formik-vedlegg-form.alert.totalSize.noLink':
        'Du har totalt lasta opp meir enn grensa på 24 MB. Det tyder at du må fjerne noko av det du har lasta opp.',

    ...pictureScanningGuideMessages.nn,
};
