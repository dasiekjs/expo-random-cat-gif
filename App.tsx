import {StatusBar} from 'expo-status-bar';
import {
    ActivityIndicator,
    Button,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
    TouchableOpacity,
} from 'react-native';
import {useRandomCatGifState} from "./src/random-cat-gif.state";
import {DisplayImageComponent} from "./src/components/display-image.component";
import {useDisplayElementAnimation} from "./src/hooks/display-element.animation";

export default function App() {
    const {status, actions, currentGif} = useRandomCatGifState();
    const [spinnerOpacity, spinnerTransform] = useDisplayElementAnimation({
        property: status === 'loading',
        endTransform: -100
    });
    const [mainGifOpacity, mainGifTransform] = useDisplayElementAnimation({
        property: status === 'success',
    });

    return (
        <View style={styles.container}>
            <ImageBackground source={{uri: currentGif}} resizeMode="cover" style={styles.image}>
                <View style={styles.descriptionContainer}>
                    <View style={styles.description}>
                        <Animated.View style={{opacity: spinnerOpacity, transform: [{translateY: spinnerTransform}]}}>
                            <ActivityIndicator size="large" color="white"/>
                        </Animated.View>
                        <Animated.View style={{opacity: mainGifOpacity, transform: [{translateY: mainGifTransform}]}}>
                            <DisplayImageComponent url={currentGif as string}/>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <Button
                                    title={'Share'}
                                    onPress={() => console.log('TODO')}/>
                                <Button
                                    title={'Download'}
                                    onPress={() => console.log('TODO')}/>
                            </View>
                        </Animated.View>
                        <Button title={'Show me another cat'} onPress={() => actions.searchAnother()}/>
                    </View>
                </View>
            </ImageBackground>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    description: {
        backgroundColor: '#000000c8',
        flex: 1,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        maxHeight: '50%',
    },
    loadingIcon: {
        flexDirection: "row",
        justifyContent: "center",
    },
    descriptionContainer: {
        backgroundColor: '#000000c8',
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        paddingLeft: 25,
        paddingRight: 25,
        alignItems: "center",
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
