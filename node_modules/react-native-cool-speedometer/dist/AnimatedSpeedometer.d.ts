/// <reference types="react" />
import { EasingFunction } from 'react-native';
import { SpeedometerProps } from './Speedometer';
interface AnimatedSpeedometerProps extends SpeedometerProps {
    preFill?: number;
    duration?: number;
    easing?: EasingFunction;
    onFillChange?: (value: number) => void;
    onAnimationComplete?: () => void;
    useNativeDriver?: boolean;
}
export default function AnimatedSpeedometer({ duration, easing, preFill, useNativeDriver, onFillChange, onAnimationComplete, value, ...rest }: AnimatedSpeedometerProps): JSX.Element;
export {};
