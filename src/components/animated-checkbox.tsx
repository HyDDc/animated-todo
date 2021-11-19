import React, {useEffect, memo} from 'react'
import Animated, {Easing, useSharedValue, useAnimatedProps, withTiming, interpolateColor } from 'react-native-reanimated'
import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg'
import AnimatedStroke from './animated-stroke'

const MARGIN = 10
const vWidth = MARGIN + 64
const hWidth = MARGIN + 64
const checkMarkPath = "M7.50824 26.843C7.42152 27.6668 8.0191 28.405 8.84297 28.4918L22.2688 29.905C23.0927 29.9917 23.8309 29.3941 23.9176 28.5703C24.0043 27.7464 23.4067 27.0082 22.5829 26.9215L10.6488 25.6653L11.905 13.7312C11.9917 12.9073 11.3941 12.1691 10.5703 12.0824C9.7464 11.9957 9.00821 12.5933 8.92149 13.4171L7.50824 26.843ZM29.0562 8.83413L8.0562 25.8341L9.9438 28.1659L30.9438 11.1659L29.0562 8.83413Z"
const outlineBoxPath = "M38 1H1V37H38V1ZM0 0V38H39V0H0Z"

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface Props {
    checked?: boolean
}


const AnimatedCheckbox = (props: Props) => {
    const {checked} = props
    const checkMarkColor = '#000000'
    const highlightColor = '#ff0000'
    const boxOutlineColor = '#000000'

    const progress = useSharedValue(0)

    useEffect(() => {
        progress.value = withTiming(checked? 1:0, {
            duration: checked? 500:100,
            easing: Easing.linear  
        })
    }, [checked])

    const animatedBoxProps = useAnimatedProps(() => ({
        stroke: interpolateColor(
            Easing.bezier(0.16, 1, 0.3, 1)(progress.value),
            [0,1], 
            [boxOutlineColor, highlightColor],
            'RGB'
        ),
        fill: interpolateColor(
            Easing.bezier(0.16, 1, 0.3, 1)(progress.value),
            [0,1], 
            ['#00000000', highlightColor],
            'RGB'
        )
    }),
    [highlightColor, boxOutlineColor]
    ) 




    return(
        <Svg viewBox={[-MARGIN, -MARGIN, vWidth + MARGIN, hWidth + MARGIN].join(' ')}>
            <Path d={outlineBoxPath} fill="grey"/>
            <AnimatedPath d={outlineBoxPath} stroke= {7} strokeLinejoin="round" strokeLinecap="round" animatedProps={animatedBoxProps}/>
            <Path d={checkMarkPath} fill="white"/>
        </Svg>
    )
}



export default AnimatedCheckbox


