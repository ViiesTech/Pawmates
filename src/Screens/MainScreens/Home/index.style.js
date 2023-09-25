import { StyleSheet } from "react-native";
import { COLORS } from "../../../Constants/theme";

export const styles = StyleSheet.create({
    container:{
        marginHorizontal:20
    },
    avatarContainer:{
        marginHorizontal:15,
        
    },
    innerContainer:{
        flexDirection:'row',
        marginTop:8
    },
    iconsContainer:{
        flexDirection:'row',
        marginTop:12,
        justifyContent:'space-between'
    },
    iconsInnerConatiner:{
        height:45,
        width:45,
        backgroundColor: '#F8A756',
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center'

    }
});
