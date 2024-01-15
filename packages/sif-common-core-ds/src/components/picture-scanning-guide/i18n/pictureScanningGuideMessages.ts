import pictureScanningNb from './picturescanningguide.nb.json';
import pictureScanningNn from './picturescanningguide.nn.json';

type messageKeys = keyof typeof pictureScanningNb;

export const pictureScanningGuideMessages: {
    nb: Record<messageKeys, string>;
    nn: Record<messageKeys, string>;
} = {
    nb: pictureScanningNb,
    nn: pictureScanningNn,
};
