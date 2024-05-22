import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
    primary: '#00AFF0',
    secondary: '#F3F2F8',
    text: '#1E0E4B',
    
    green: '#11C145',
    green2: '#33C09D',

    red: '#FD4231',
    red2: '#EF5361',

    white: '#FFFFFF',
    black: '#000000',
    grey: '#757575',
    lightGrey: '#F9F9F9',
    darkGrey: '#D3D3D3',
}

export const SIZES = {
    // global sizes
    base: 12,
    font: 15,
    radius: 10,
    padding: 24,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 28,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,

    // app dimensions
    width,
    height
}

export const FONTS = {
    largeTitle: {fontFamily: 'Roboto-Black', fontSize: SIZES.largeTitle, lineHeight: 55},
    h1: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h1, lineHeight: 32},
    h2: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30},
    h3: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22},
    h4: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22},
    body1: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body1, lineHeight: 36},
    body2: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body2, lineHeight: 30},
    body3: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body3, lineHeight: 22},
    body4: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body4, lineHeight: 22},
}


// export default {
//     COLORS,
//     SIZES,
//     FONTS,
// };
