/// <reference types="react" />
import { PathProps, SvgProps } from 'react-native-svg';
interface ArcProps extends PathProps {
    color?: string;
    opacity?: number;
    arcWidth?: number;
    lineCap?: SvgProps['strokeLinecap'];
}
export default function Arc({ color, opacity, arcWidth, lineCap, ...rest }: ArcProps): JSX.Element;
export {};
