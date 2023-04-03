import { ReactNode } from 'react';
import { SvgProps } from 'react-native-svg';
export interface SpeedometerProps {
    width?: number;
    height?: number;
    angle?: number;
    rotation?: number;
    value?: number;
    min?: number;
    max?: number;
    lineCap?: SvgProps['strokeLinecap'];
    accentColor?: string;
    fontFamily?: string;
    children: JSX.Element | ReactNode;
}
export default function Speedometer({ width, height, angle, rotation, value, min, max, lineCap, accentColor, fontFamily, children, }: SpeedometerProps): JSX.Element;
