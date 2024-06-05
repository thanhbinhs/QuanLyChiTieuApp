import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import { logo } from '../constants';


export default function ViewAccounts({ listings, title }) {
    const widthScreen = Dimensions.get('window').width;
    const heightScreen = Dimensions.get('window').height;
    return (
        <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>{title}</Text>
            {listings.map((account, index) => (
    <React.Fragment key={index}>
        <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
            <Image source={logo[account.accountImage]} style={{ width: 40, height: 40, borderRadius: 20 }} />
            <View style={{ marginLeft: 15 }}>
                <Text style={{ fontSize: 16 }}>{account.accountName}</Text>
                <Text style={{ fontSize: 16, fontWeight: '700' }}>{account.balance.toLocaleString('en-US')} VND</Text>
            </View>
        </View>
        <View style={{ width: widthScreen, right: 15, height: 1, backgroundColor: "#ccc" }}></View>
    </React.Fragment>
))}
        </View>
    )
}