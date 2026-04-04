import { PersonCircleIcon } from '@navikt/aksel-icons';
import { ActionMenu, InternalHeader, Spacer } from '@navikt/ds-react';
import { Fragment } from 'react';

export interface ScenarioSelectorHeaderOption<T extends string = string> {
    label: string;
    value: T;
}

export interface ScenarioSelectorHeaderGroup<T extends string = string> {
    label?: string;
    options: Array<ScenarioSelectorHeaderOption<T>>;
}

interface Props<T extends string = string> {
    title: string;
    buttonLabel?: string;
    groups: Array<ScenarioSelectorHeaderGroup<T>>;
    onSelectScenario: (value: T) => void;
}

export const ScenarioSelectorHeader = <T extends string = string>({
    title,
    buttonLabel = 'Velg scenario',
    groups,
    onSelectScenario,
}: Props<T>) => {
    const visibleGroups = groups.filter((group) => group.options.length > 0);

    return (
        <InternalHeader>
            <InternalHeader.Title>{title}</InternalHeader.Title>
            <Spacer />
            <ActionMenu>
                <ActionMenu.Trigger>
                    <InternalHeader.Button>
                        <PersonCircleIcon fontSize="1.5rem" aria-hidden={true} />
                        {buttonLabel}
                    </InternalHeader.Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    {visibleGroups.map((group, groupIndex) => (
                        <Fragment key={group.label ?? `group-${groupIndex}`}>
                            {group.label ? (
                                <ActionMenu.Group label={group.label}>
                                    {group.options.map((option) => (
                                        <ActionMenu.Item
                                            key={option.value}
                                            onSelect={() => onSelectScenario(option.value)}>
                                            {option.label}
                                        </ActionMenu.Item>
                                    ))}
                                </ActionMenu.Group>
                            ) : (
                                group.options.map((option) => (
                                    <ActionMenu.Item key={option.value} onSelect={() => onSelectScenario(option.value)}>
                                        {option.label}
                                    </ActionMenu.Item>
                                ))
                            )}
                            {groupIndex < visibleGroups.length - 1 ? <ActionMenu.Divider /> : null}
                        </Fragment>
                    ))}
                </ActionMenu.Content>
            </ActionMenu>
        </InternalHeader>
    );
};
