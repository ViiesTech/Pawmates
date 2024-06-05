import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../Constants/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import BasUrl from '../../BasUrl';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import CustomButton from '../../Components/Button';
// import {ActivityIndicator} from 'react-native-paper';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import InnerButton from '../../Components/innerButton';
import DropDownPicker from 'react-native-dropdown-picker';

const SitterDetails = ({navigation, route}) => {
  const {sitterData, myPets} = route.params;
  const {token} = useSelector(state => state.authData);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  const [open, setOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  // dropdown for services 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [services, setServices] = useState(null);
  const [items, setItems] = useState([]);

  function transformArray(array) {
    const transformedArray = array.map(item => {
        const words = item.split(' ');
        const label = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const value = item.replace(/\s+/g, ' ').toLowerCase();
        return { label, value };
    });
    return transformedArray;
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const transformedArray = transformArray(sitterData.petPurposeType)
      setItems(transformedArray)
    })
    return unsubscribe
  }, [navigation])

  function formatDate(inputDate) {
    // Create a new Date object from the input date string
    const date = new Date(inputDate);

    // Extract the year, month, and day from the date object
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so we add 1
    const day = date.getDate().toString().padStart(2, '0');

    // Construct the formatted date string in the desired format (YYYY-MM-DD)
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  
  
  const handleRequestSend = () => {
    let data = JSON.stringify({
      pet_id: selectedPet._id,
      receive_sitter_id: sitterData.petSitterId,
      pet_service: services,
      start_date: formatDate(startDate),
      end_date: formatDate(endDate)
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BasUrl}/pet/owner-req-send`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    setLoading(true);

    axios
      .request(config)
      .then(response => {
        setLoading(false);
        if (response.data.success) {
          navigation.navigate('Home');
          setModalVisible(false)
          Toast.show({
            type: 'success',
            text1: 'Hiring Request Sent Successfully 😊',
            text2: 'Your hiring request has been sent to the sitter',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: response.data.message,
          });
        }
      })
      .catch(error => {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
      });
  };

  return (
    <FastImage source={images.BackGround} style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 25,
          width: wp('90%'),
          alignSelf: 'center',
        }}>
        <AntDesign
          name="arrowleft"
          size={25}
          color={'black'}
          onPress={() => navigation.goBack()}
          style={{
            padding: 8,
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: 250,
          }}
        />
        <Text style={[styles.HeadingText, {fontWeight: 'bold', fontSize: 25}]}>
          Sitter Details
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size={100} color="black" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 10}}>
          <View style={{height: 240, paddingLeft: 10}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {sitterData.images.map((eachUri, index) => {
                return (
                  <Image
                    source={{uri: `${BasUrl}/${eachUri}`}}
                    key={index}
                    style={{
                      width: 200,
                      height: 230,
                      marginHorizontal: 6,
                      backgroundColor: 'lightgrey',
                      borderRadius: 8,
                    }}
                  />
                );
              })}
            </ScrollView>
          </View>

          <Text
            style={{
              color: 'black',
              fontSize: hp('4%'),
              width: wp('90%'),
              alignSelf: 'center',
              fontWeight: 'bold',
            }}>
            {sitterData.name} . {sitterData.age}
          </Text>
          <Text
            style={{
              color: 'black',
              marginTop: 15,
              fontSize: hp('2%'),
              width: wp('88%'),
              alignSelf: 'center',
              fontWeight: 'bold',
            }}>
            About Sitter
          </Text>
          <Text
            style={{
              color: 'rgba(0,0,0,0.7)',
              fontSize: hp('2%'),
              width: wp('90%'),
              alignSelf: 'center',
              backgroundColor: 'lightgrey',
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
            }}>
            {sitterData.about}
          </Text>

          <View
            style={{
              marginLeft: 5,
              width: wp('90%'),
              alignSelf: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                fontSize: hp('2.8%'),
                color: 'black',
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              Services Provided
            </Text>
            {sitterData.petPurposeType.map((eachItem, index) => {
              return (
                <View
                  key={index}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <AntDesign
                    name="pushpin"
                    size={20}
                    color={'black'}
                    style={{marginRight: 4}}
                  />
                  <Text style={{fontSize: hp('2%'), color: 'rgba(0,0,0,0.8)'}}>
                    {' '}
                    {eachItem}
                  </Text>
                </View>
              );
            })}
          </View>

          <View
            style={{
              marginLeft: 5,
              width: wp('90%'),
              alignSelf: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                fontSize: hp('2.8%'),
                color: 'black',
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              Sizes this sitter can keep
            </Text>
            {sitterData.pet_size.map((eachItem, index) => {
              return (
                <View
                  key={index}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <AntDesign
                    name="pushpin"
                    size={20}
                    color={'black'}
                    style={{marginRight: 4}}
                  />
                  <Text style={{fontSize: hp('2%'), color: 'rgba(0,0,0,0.8)'}}>
                    {' '}
                    {eachItem}
                  </Text>
                </View>
              );
            })}
          </View>

          <CustomButton
            buttonText={'Send hire request'}
            // onPress={() => handleRequestSend(sitterData.petSitterId, petId)}
            onPress={() => setModalVisible(true)}
          />
        </ScrollView>
      )}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        animationIn={'fadeInLeftBig'}
        animationOut={'fadeOutRightBig'}>
        <SafeAreaView
          style={{
            width: '100%',
            height: '80%',
            borderRadius: 12,
            backgroundColor: 'white',
          }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
          <AntDesign name='closecircleo' size={25} color={'black'} style={{position: 'absolute', top: 10, right: 10, padding: 5}} onPress={() => setModalVisible(false)} />
          
          <Text
            style={{
              color: 'black',
              fontSize: hp('3%'),
              fontWeight: 'bold',
              marginTop: hp('3%'),
              alignSelf: 'center',
            }}>
            Hire Pet Sitter
          </Text>

          <Text style={{color: 'black', fontSize: hp('2%'), width: '90%', alignSelf: 'center', marginTop: 25, marginBottom: 15}}>
            Choose a pet, you want services for:
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              width: '95%',
              alignSelf: 'center',
            }}>
            {myPets.map((eachPet, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedPet(eachPet)}
                  activeOpacity={0.6}
                  style={[
                    styles.cardCont,
                    selectedPet?.pet_nickname === eachPet.pet_nickname
                      ? {borderWidth: 5, borderColor: COLORS.primary}
                      : null,
                  ]}>
                  <>
                    <FastImage
                      source={{uri: `${BasUrl}/${eachPet.images[0]}`}}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: -1,
                      }}
                    />
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.22)',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                      }}
                    />
                  </>

                  <View
                    style={{
                      position: 'absolute',
                      bottom: 44,
                      left: 20,
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      borderRadius: 10,
                      padding: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: hp('2.8%'),
                        fontWeight: 'bold',
                      }}>
                      {eachPet.pet_nickname}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: hp('2.8%'),
                        fontWeight: 'bold',
                      }}>
                      {' '}
                      .{' '}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: hp('2.8%'),
                        fontWeight: 'bold',
                      }}>
                      {eachPet.age}
                    </Text>
                  </View>
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      left: 20,
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      borderRadius: 6,
                      padding: 5,
                      color: COLORS.black,
                      fontSize: hp('2%'),
                      fontWeight: 'bold',
                    }}>
                    {eachPet.pet_type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.header, {width: '89%', marginTop: 15, marginBottom: 10, fontWeight: 'normal', fontSize: hp('2%')}]}>
            Choose a service
          </Text>
          <DropDownPicker
            style={{marginTop: 5, borderColor: 'black', color: 'grey', paddingHorizontal: 20, width: '90%', alignSelf: 'center', backgroundColor: 'transparent'}}
            placeholder="Service you want"
            placeholderStyle={{color: 'rgba(0,0,0,0.5)'}}
            open={dropdownOpen}
            value={services}
            items={items}
            setOpen={setDropdownOpen}
            setValue={setServices}
            setItems={setItems}
            dropDownContainerStyle={{width: '90%', alignSelf: 'center'}}
            zIndex={3}
          />

          <View style={styles.container}>
            <Text style={[styles.header, {width: '98%', marginTop: -20, fontWeight: 'normal', fontSize: hp('2%')}]}>
              Schedule our services that you want
            </Text>
            <DatePicker
              modal
              open={open}
              date={startDate}
              minimumDate={new Date()}
              onConfirm={date => {
                setOpen(false);
                setStartDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <DatePicker
              modal
              open={endOpen}
              date={endDate}
              minimumDate={startDate}
              onConfirm={date => {
                setEndOpen(false);
                setEndDate(date);
              }}
              onCancel={() => {
                setEndOpen(false);
              }}
            />
            <InnerButton
              buttonText={startDate.toDateString()}
              onPress={() => setOpen(true)}
              Lefticon={true}
              name="calendar"
              type={'feather'}
              color={COLORS.black}
              size={20}
            />
            <InnerButton
              buttonText={endDate.toDateString()}
              onPress={() => setEndOpen(true)}
              Lefticon={true}
              name="calendar"
              type={'feather'}
              color={COLORS.black}
              size={20}
            />

            <View style={{height: 30}} />
          </View>
          <CustomButton
            isDisabled={Object.values(selectedPet).length > 0 && services ? false : true}
            style={{backgroundColor: COLORS.secondary_with_opacity, marginTop:hp('-1%')}}
            buttonText={loading ? <ActivityIndicator size={'large'} color='white' /> :'Send hire request'}
            onPress={() => handleRequestSend()}
          />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </FastImage>
  );
};

export default SitterDetails;

const styles = StyleSheet.create({
  HeadingText: {
    color: COLORS.black,
    fontSize: 15,
  },
  container: {
    backgroundColor: COLORS.text_white,
    width: '100%',
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  header: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 10,
    fontWeight: '600',
    color: COLORS.black,
  },
  domestic: {
    borderColor: '#1EBA1E',
  },
  txtInput: {
    height: 50,
    width: wp('90%'),
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: COLORS.text_placeholder,
    borderRadius: 5,
    marginTop: 5,
  },
  cardCont: {
    width: '46%',
    alignSelf: 'center',
    height: hp('15%'),
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 8,
    backgroundColor: 'grey',
    margin: 8,
  },
});
