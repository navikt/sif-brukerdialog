import { Fieldset, FieldsetProps } from '@navikt/ds-react';
import React, { forwardRef } from 'react';
import { TestProps } from '../../../types';

const SkjemagruppeQuestion = forwardRef(function SkjemagruppeQuestion(
    props: FieldsetProps & TestProps,
    ref: React.Ref<any>,
) {
    const { id, legend, ...rest } = props;
    return <Fieldset {...rest} legend={legend} ref={ref} tabIndex={id ? -1 : undefined} />;
});

export default SkjemagruppeQuestion;
