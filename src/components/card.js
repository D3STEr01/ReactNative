// Card.js
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Card = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={{  marginTop: 10, alignItems:'center' }}>
      <View style={{ backgroundColor: 'white', borderRadius: 10, borderColor: '#D3D3D3', borderWidth: 1, elevation: 2 }}>
        {/* Remove the Image component as it was empty in the provided code */}
        <View style={{ padding: 50 }}>
          <Text style={{ fontSize: hp(2), fontWeight: 'bold', marginBottom: 8}}>{title}</Text>
          {/* Add more card content here if needed */}
        </View>
      </View>
    </Pressable>
  );
};

export default Card;
