/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { ThemeSwitcher } from '@foglamp/design-system/widgets/theme-switcher';
import { defineStory } from '../../lib/story';
function ThemeSwitcherPreview() { return <ThemeSwitcher/>; }
export const story = defineStory({ id: 'widgets/theme-switcher', displayName: 'ThemeSwitcher', registryItem: 'widget-theme-switcher', Component: ThemeSwitcherPreview, args: [{ variant: 'System, light, and dark', initial: {} }] });
