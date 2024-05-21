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
import {ShareButton} from "./src/components/share-button.component";
import {DownloadButton} from "./src/components/download-button.component";
import {NextImage} from "./src/components/next-image.component";

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
                        <Animated.View style={{
                            position: 'absolute',
                            width: '100%',
                            opacity: spinnerOpacity,
                            transform: [{translateY: spinnerTransform}]
                        }}>
                            <ActivityIndicator size="large" color="white"/>
                        </Animated.View>
                        <Animated.View style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            display: 'flex',
                            flex: 1,
                            opacity: mainGifOpacity,
                            transform: [{translateY: mainGifTransform}]
                        }}>
                            <DisplayImageComponent url={currentGif as string}/>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <ShareButton url={currentGif as string}/>
                                {/*<DownloadButton/>*/}
                            </View>
                            <NextImage onPress={() => actions.searchAnother()}/>
                        </Animated.View>
                    </View>
                </View>
            </ImageBackground>
            <View style={{position: 'absolute', bottom: 30, left: 15}}>
                <Image source={require('./assets/powered_by_giphy.png')}/>
            </View>
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
        display: 'flex',
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        maxHeight: '50%',
        height: '50%',
        justifyContent: 'center'
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
