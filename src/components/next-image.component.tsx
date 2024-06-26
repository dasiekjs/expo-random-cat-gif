import {StyleSheet, Text, TouchableOpacity} from "react-native";
import { Fontisto } from '@expo/vector-icons';

const styleSheet = StyleSheet.create({
   title: {
       fontSize: 16,
       lineHeight: 21,
       fontWeight: 'bold',
       letterSpacing: 0.25,
       color: 'white',
   },
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        flexDirection: "row",
        gap: 5
    }
});

export const NextImage = (props: {onPress: () => void}) => {
    return <TouchableOpacity style={styleSheet.main} onPress={props.onPress}>
        <Fontisto name="random" size={15} color="white" />
        <Text style={styleSheet.title}>Show me another cat</Text>
    </TouchableOpacity>
}
