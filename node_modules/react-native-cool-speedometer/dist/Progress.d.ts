/// <reference types="react" />
import { PathProps } from 'react-native-svg';
interface ProgressProps extends PathProps {
    color?: string;
    arcWidth?: number;
    lineCap?: PathProps['strokeLinecap'];
}
export default function Progress({ color, arcWidth, lineCap, ...rest }: ProgressProps): JSX.Element;
export {};
