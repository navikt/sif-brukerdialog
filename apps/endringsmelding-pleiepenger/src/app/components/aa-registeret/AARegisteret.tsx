import { useAppIntl } from '../../i18n';

const AAregisteret = () => {
    const { text } = useAppIntl();
    return <abbr title={text('aaRegisteret.lang')}>{text('aaRegisteret.kort')}</abbr>;
};

export default AAregisteret;
