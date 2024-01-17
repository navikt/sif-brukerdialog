import nb from './i18n/durationText.nb.json';
import nn from './i18n/durationText.nn.json';

type messageKeys = keyof typeof nb;

export const durationTextMessages: {
    nb: Record<messageKeys, string>;
    nn: Record<messageKeys, string>;
} = {
    nb,
    nn,
};
