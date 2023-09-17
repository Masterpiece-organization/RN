import {ReactNode} from 'react';

export interface CardPropsType {
  title?: string;
  titleButton?: ReactNode;
  className?: string;
  children: ReactNode;
}
