import {ReactNode} from 'react';

export interface ContainerType {
  scroll?: boolean;
  header?: boolean;
  horizontal?: boolean;
  className?: string;
  children: ReactNode;
}
