/// <reference types="react" />
import { SvgProps } from 'react-native-svg';
interface Mark {
    coordinates: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    };
    isEven: boolean;
    textProps: {
        x: number;
        y: number;
        transform: string;
    };
    value: number;
}
interface MarksProps {
    step?: number;
    lineCap?: SvgProps['strokeLinecap'];
    lineColor?: string;
    lineOpacity?: number;
    numbersRadius?: number;
    fontSize?: number;
    lineSize?: number;
    children?: (mark: Mark, index: number) => JSX.Element;
}
export default function Marks({ step, lineCap, lineColor, lineOpacity, numbersRadius, fontSize, lineSize, children, }: MarksProps): JSX.Element;
export {};
