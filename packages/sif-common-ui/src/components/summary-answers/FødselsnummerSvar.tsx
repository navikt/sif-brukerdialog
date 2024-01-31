import SpacedCharString from '@navikt/sif-common-core-ds/src/atoms/spaced-char-string/SpacedCharString';

interface Props {
    fødselsnummer: string;
}

const FødselsnummerSvar = ({ fødselsnummer }: Props) => <SpacedCharString str={fødselsnummer} />;

export default FødselsnummerSvar;
