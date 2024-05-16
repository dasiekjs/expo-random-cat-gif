import {useEffect, useState} from "react";
import {Animated} from "react-native";

interface DisplayElementAnimationProps {
    property: boolean,
    duration?: number,
    startOpacity?: number,
    endOpacity?: number,
    startTransform?: number,
    endTransform?: number;
}

const defaultProps: Omit<Required<DisplayElementAnimationProps>, 'property'> = {
    duration: 200,
    startOpacity: 1,
    endOpacity: 0,
    startTransform: 0,
    endTransform: 100,
}

export const useDisplayElementAnimation = (props: DisplayElementAnimationProps) => {

    const {
        property,
        duration,
        startOpacity,
        endOpacity,
        startTransform,
        endTransform
    } = {
        ...defaultProps,
        ...props
    }

    const [animatedOpacity] = useState(new Animated.Value(1))
    const [animatedTransform] = useState(new Animated.Value(0))

    useEffect(() => {
        if (!property) {
            Animated.parallel([
                Animated.timing(animatedOpacity, {
                    toValue: endOpacity,
                    duration,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedTransform, {
                    toValue: endTransform,
                    duration,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(animatedOpacity, {
                    toValue: startOpacity,
                    duration,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedTransform, {
                    toValue: startTransform,
                    duration,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [property]);

    return [animatedOpacity, animatedTransform];

}
