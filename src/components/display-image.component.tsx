import React from 'react';
import {Image, View} from "react-native";

interface DisplayImageComponent {
    url: string;
}

export const DisplayImageComponent: React.FC<DisplayImageComponent> = ({url}) => {
    return (
        <View style={{
        }}>
            <Image
                style={{
                    height: 300
                }}
                resizeMode="contain"
                source={{uri: url}}
            />
        </View>
    )
}
