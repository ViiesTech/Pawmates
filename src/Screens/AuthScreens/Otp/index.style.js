import {StyleSheet} from 'react-native';
import { COLORS } from '../../../Constants/theme';

export const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45,
      },
    
      borderStyleHighLighted: {
        borderColor: '#000000',
      },
    
      underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'white',
        color: 'black'
      },
    
      underlineStyleHighLighted: {
        borderColor: '#000000',
      },
      codeFieldRoot: {
        marginTop: 40,
        padding: 20,
      },
      cell: {
        width: 60,
        height: 60,
        lineHeight: 40,
        fontSize: 34,
        borderWidth: 2,
        borderColor: COLORS.black,
        textAlign: 'center',
        borderRadius: 15,
        padding: 15,
        color: COLORS.black,
      },
      focusCell: {
        borderColor: '#4E4B66',
      },
    
})