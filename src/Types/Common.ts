import { IconProps } from 'react-native-vector-icons/Icon';

export interface IconInterface
  extends Omit<IconProps, 'name' | 'size' | 'color'> {
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
}
