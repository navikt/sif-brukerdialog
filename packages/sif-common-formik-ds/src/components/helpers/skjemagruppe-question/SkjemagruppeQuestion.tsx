import { Fieldset, FieldsetProps } from '@navikt/ds-react';
import React, { forwardRef } from 'react';
import { v4 as uuid } from 'uuid';
import { TestProps } from '../../../types';

const SkjemagruppeQuestion = forwardRef(function SkjemagruppeQuestion(
    props: FieldsetProps & TestProps,
    ref: React.Ref<any>
) {
    const { id, legend, ...rest } = props;
    const titleId = `${id || uuid()}__title`;
    return <Fieldset {...rest} legend={<div id={titleId}>{legend}</div>} ref={ref} tabIndex={id ? -1 : undefined} />;
});

export default SkjemagruppeQuestion;
