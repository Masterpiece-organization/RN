export const themeColors = {
  black: '#222222',
  white: '#ffffff',
  bg: '#efefef',
  border: '#e7e7e7',
};

export const themeFonts = {};

// Colors
export const elementBackgroundStyle = 'bg-white dark:bg-neutral-800';
export const backgroundStyle = 'bg-white dark:bg-black';
// Border
export const borderBottomStyle =
  'border-b border-neutral-300 dark:border-b-neutral-600';
// Spacing
export const cardGap = 'mt-4 py-4';
// Flex
export const rowCenter = 'items-center justify-center flex-row';

export const colorBasedOnTheme = (
  colorScheme: string | null | undefined,
  dark: string,
  light: string,
) => {
  return colorScheme === 'dark' ? dark : light;
};
