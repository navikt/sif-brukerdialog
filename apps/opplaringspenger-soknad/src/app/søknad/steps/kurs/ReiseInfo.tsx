import { AppText, useAppIntl } from '../../../i18n';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';

const ReiseInfo = () => {
    const { text } = useAppIntl();
    return (
        <ExpandableInfo title={text('steg.kurs.reiserUtenforKursdager.info.tittel')}>
            <p>
                <AppText id="steg.kurs.reiserUtenforKursdager.info.tekst.1" />
            </p>
            <p>
                <AppText id="steg.kurs.reiserUtenforKursdager.info.tekst.2" />
            </p>
            <p>
                <AppText id="steg.kurs.reiserUtenforKursdager.info.tekst.3" />
            </p>
        </ExpandableInfo>
    );
};

export default ReiseInfo;
