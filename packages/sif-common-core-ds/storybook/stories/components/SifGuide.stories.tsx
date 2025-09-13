import { Meta, StoryFn } from '@storybook/react-vite';
import SifGuidePanel from '../../../src/components/sif-guide-panel/SifGuidePanel';
import StoryWrapper from '../../decorators/StoryWrapper';

export default {
    title: 'Component/SifGuidePanel',
    component: SifGuidePanel,
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
    argTypes: {
        mood: {
            options: ['happy', 'uncertain'],
        },
    },
} as Meta<typeof SifGuidePanel>;

const Template: StoryFn<typeof SifGuidePanel> = (args) => {
    return (
        <SifGuidePanel mood={args.mood} poster={args.poster} compact={args.compact}>
            Content
        </SifGuidePanel>
    );
};

export const Default = Template.bind({});
Default.args = {
    mood: 'happy',
    poster: false,
    compact: false,
};
