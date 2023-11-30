import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import CustomText from '../../Components/Text';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLORS } from '../../Constants/theme';
import { useDispatch } from 'react-redux';
import { logOut } from '../../Redux/authSlice';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const Data = [
    {
      id: 1,
      image: images.cat1,
    },
    {
      id: 2,
      image: images.cat2,
    },
    {
      id: 3,
      image: images.cat3,
    },
    {
      id: 4,
      image: images.cat4,
    },
  ];

  return (
    <FastImage source={images.BackGround} style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>

            <TouchableOpacity
              onPress={() => {
                Alert.alert('Log out', 'Are you sure, you want to log out?', [
                  {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'Yes', onPress: () => dispatch(logOut()) },
                ]);
              }}
              style={{
                alignSelf: 'flex-start',
                backgroundColor: COLORS.secondary_with_opacity,
                borderRadius: 10,
                padding: 10,
              }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                Log out
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              <TouchableOpacity onPress={()=> navigation.navigate('NotificationScreenn')}>

                <FontAwesome
                  name={'bell'}
                  size={30}
                  color={COLORS.black}
                />

              </TouchableOpacity>

              <TouchableOpacity

                onPress={() => navigation.navigate('Chats')}
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: COLORS.primary,
                  borderRadius: 10,
                  padding: 10,
                  marginLeft: 10
                }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                  Chats
                </Text>
              </TouchableOpacity>

            </View>
          </View>

          <FastImage
            source={images.petAvatar}
            style={{ height: 400, borderRadius: 15, marginTop: 20 }}
            resizeMode="cover">
            <View style={{ height: '70%' }} />
            <View style={styles.avatarContainer}>
              <CustomText text={'Zack, 32'} style={{ color: 'white' }} />
              <View style={styles.innerContainer}>
                <Feather name={'map-pin'} size={20} color={COLORS.text_white} />
                <CustomText
                  text={'  New York  .  25 Km'}
                  style={{ color: 'white' }}
                />
              </View>
              <View style={styles.iconsContainer}>
                <TouchableOpacity
                  style={styles.iconsInnerConatiner}
                // onPress={() => dispatch(logOut())}
                >
                  <Fontisto
                    name={'close-a'}
                    size={20}
                    color={COLORS.text_white}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconsInnerConatiner}>
                  <Entypo name={'star'} size={30} color={COLORS.text_white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconsInnerConatiner}>
                  <Ionicons
                    name={'checkmark-sharp'}
                    size={30}
                    color={COLORS.text_white}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </FastImage>

          <View style={{ marginTop: 20 }}>
            <CustomText
              text={'About'}
              style={{ fontSize: 18, fontWeight: 'bold' }}
            />
            <CustomText
              text={
                'My Name is Lorem ipsum dolor sit amet, consectetur adipiscing elit'
              }
            />
          </View>

          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={Data}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                    <TouchableOpacity style={styles.Data_View}>
                      {/* <CustomText
                          text={item.title}
                          style={{ marginHorizontal: 6, fontSize: 13 }}
                        />
                        <CustomText text={item.size} /> */}
                      <Image source={item.image} />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </FastImage>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  avatarContainer: {
    marginHorizontal: 15,

  },
  innerContainer: {
    flexDirection: 'row',
    marginTop: 8
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between'
  },
  iconsInnerConatiner: {
    height: 45,
    width: 45,
    backgroundColor: '#F8A756',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'

  },
  header: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    padding: 10,
    justifyContent: 'space-between',
  }
});
