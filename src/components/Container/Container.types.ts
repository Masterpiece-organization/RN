import {ReactNode} from 'react';

export interface ContainerType {
  scroll?: boolean;
  horizontal?: boolean;
  className?: string;
  children: ReactNode;
}
