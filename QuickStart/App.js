/**
 * Sample React Native App with adyen-react-native Quick Integration
 * https://github.com/dmitry-blackwave/adyen-react-native
 *
 * @author Dmitry Belov <dmitry@belov.dev>
 */

import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, ImageBackground, Dimensions} from 'react-native';
import Adyen from "adyen-react-native";

const API_KEY = '';
const MERCHANT_ACCOUNT = '';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
        };

        Adyen.onRequestPaymentSession(this.onRequestPaymentSession);
        Adyen.onPaymentResult((code, payload) => this.setState({status: 'success'}));
        Adyen.onError((code, error) => this.setState({status: 'failure'}));
    }

    onRequestPaymentSession(token, returnUrl) {
        console.log(token, returnUrl);
        fetch('https://checkout-test.adyen.com/v41/paymentSession', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-API-key': API_KEY,
            },
            body: JSON.stringify({
                amount: {
                    value: 174,
                    currency: 'USD'
                },
                reference: 'Test payments',
                countryCode: 'NL',
                shopperReference: 'demo@demo.com',
                returnUrl: 'return-url://',
                token,
                merchantAccount: MERCHANT_ACCOUNT
            }),
        })
            .then((response) => response.json())
            .then((responseData) => Adyen.confirmPayment(responseData.paymentSession))
            .done();
    }

    renderPayment() {
        return (
            <View style={{marginTop: 60,}}>
                <Image
                    source={require('./assets/checkout/Checkoutwindow.png')}
                    style={{
                        width: Dimensions.get('window').width - 20,
                        height: Dimensions.get('window').height / 1.5,
                        resizeMode: 'contain'
                    }}
                />
                <TouchableOpacity onPress={() => {
                    Adyen.startPayment();
                }}>
                    <Image
                        source={require('./assets/btn/Btn_cta.png')}
                        style={{
                            width: Dimensions.get('window').width - 20,
                            height: 50,
                            resizeMode: 'contain',
                            marginTop: 10,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    renderSuccess() {
        return (
            <View>
                <Image
                    source={require('./assets/success/Success.png')}
                    style={{
                        width: Dimensions.get('window').width - 20,
                        height: Dimensions.get('window').height / 1.5,
                        resizeMode: 'contain'
                    }}
                />
            </View>
        );
    }

    renderFailure() {
        return (
            <View>
                <Image
                    source={require('./assets/failure/Failure.png')}
                    style={{
                        width: Dimensions.get('window').width - 20,
                        height: Dimensions.get('window').height / 1.5,
                        resizeMode: 'contain'
                    }}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={{width: '100%', height: '100%'}}>
                <ImageBackground style={styles.container} source={require('./assets/background/Background.png')}>
                    {!this.state.status ? this.renderPayment() : (this.state.status === 'success' ? this.renderSuccess() : this.renderFailure())}
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});
