import {StyleSheet} from 'react-native';
import { COLORS } from '../../../Constants/theme';

export const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.text_white,
        width:'98%',
        paddingHorizontal:15,
        borderRadius:20,
        justifyContent:'center',
        alignSelf:'center',
        marginVertical:20
    },
    header:{
        alignSelf:'center',
        fontSize:20,
        marginTop:20,
        fontWeight:'600'
    },
    domestic:{
        borderColor:'#1EBA1E'
    }
})