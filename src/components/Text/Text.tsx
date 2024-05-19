import {Text as RNText} from 'react-native';
import {clsx} from 'clsx';
import {ReactNode} from 'react';

export const TEXT_TYPES = [
  'display',
  'header',
  'title',
  'body',
  'caption',
  'link',
] as const;

export const TEXT_WEIGHTS = ['bold', 'semibold', 'medium', 'normal'] as const;

export type TextType = (typeof TEXT_TYPES)[number];
export type TextWeight = (typeof TEXT_WEIGHTS)[number];

export interface TextProps {
  type?: TextType;
  weight?: TextWeight;
  color?: string;
  className?: string;
  numberOfLines?: number;
  children: string | ReactNode;
}

const defaultTextColor = 'text-black dark:text-white';

const variants: {[type in TextType]: string} = {
  display: `text-2xl leading-[35px] tracking-tighter font-titleBold ${defaultTextColor}`,
  header: `text-lg leading-[26.3px] tracking-tighter font-bold ${defaultTextColor}`,
  title: `text-base leading-[24px] tracking-tighter font-titleMedium ${defaultTextColor}`,
  body: `text-base ${defaultTextColor}`,
  caption: `text-sm ${defaultTextColor}`,
  link: `text-[11px] ${defaultTextColor}`,
};

const weightVariants: {[weight in TextWeight]: string} = {
  bold: 'font-bodyBold',
  semibold: 'font-bodySemibold',
  medium: 'font-bodyMedium',
  normal: 'font-bodyNormal',
};

// ----------------- TEXT -------------------

const Text = ({
  type = 'body',
  weight = 'normal',
  color,
  className,
  numberOfLines,
  children,
}: TextProps): JSX.Element => {
  const textStyle = clsx(
    weightVariants[weight],
    variants[type],
    color,
    className,
  );

  return (
    <RNText className={textStyle} numberOfLines={numberOfLines}>
      {children}
    </RNText>
  );
};

export default Text;
