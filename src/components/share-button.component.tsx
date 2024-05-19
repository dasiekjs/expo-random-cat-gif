import {StyleSheet, Text, TouchableOpacity} from "react-native";
import { Fontisto } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';

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
        backgroundColor: 'black',
        flexDirection: "row",
        gap: 5
    }
});

export const ShareButton = ({url}: {url: string}) => {
    return <TouchableOpacity style={styleSheet.main} onPress={() => {
Sharing.shareAsync(url).then(() => {})
    }}>
        <Fontisto name="share-a" size={15} color="white" />
        <Text style={styleSheet.title}>Share</Text>
    </TouchableOpacity>
}
