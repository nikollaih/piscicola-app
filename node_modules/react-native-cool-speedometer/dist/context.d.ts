/// <reference types="react" />
import { SvgProps } from 'react-native-svg';
interface ContextProps {
    currentFillAngle: number;
    radius: number;
    rotation: number;
    min: number;
    max: number;
    angle: number;
    lineCap: SvgProps['strokeLinecap'];
    accentColor: string;
    fontFamily: string;
    value: number;
}
declare const _default: import("react").Context<ContextProps>;
export default _default;
