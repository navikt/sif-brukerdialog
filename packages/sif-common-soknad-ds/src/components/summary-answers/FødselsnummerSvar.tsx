import SpacedCharString from '@navikt/sif-common-core-ds/lib/atoms/spaced-char-string/SpacedCharString';

interface Props {
    fødselsnummer: string;
}

const FødselsnummerSvar = ({ fødselsnummer }: Props) => <SpacedCharString str={fødselsnummer} />;

export default FødselsnummerSvar;
