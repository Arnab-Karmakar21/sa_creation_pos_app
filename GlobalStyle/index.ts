import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    boxShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    highBoxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
    fontFamily: {
        fontFamily: 'sans-serif-condensed',
    }
})

export default globalStyles;