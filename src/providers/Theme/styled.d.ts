import 'styled-components';
import BaseTheme from '~/utils/theme';

type Theme = typeof BaseTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
