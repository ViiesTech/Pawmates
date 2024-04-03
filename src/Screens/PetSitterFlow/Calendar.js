import {SafeAreaView, StyleSheet, Text, View, Switch} from 'react-native';
import React, {createRef, useEffect, useRef, useState} from 'react';
import {Agenda} from 'react-native-calendars';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CustomButton from '../../Components/Button';
import BasUrl from '../../BasUrl';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { ActivityIndicator } from 'react-native-paper';

const Calendar = ({navigation}) => {
  const {token} = useSelector(state => state.authData);
  const [showModal, setShowModal] = useState(false);
  const [selectedServices, setSelectedServices] = useState(['boarding']);
  const [isEnabled, setIsEnabled] = useState(false);
  const [allAgenda, setAllAgenda] = useState({});
  const [selectedDate, setSelectedDate] = useState(null)
  const [loading, setLoading] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const renderEmptyItem = () => {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text style={{color: 'black', fontSize: hp('2%'), margin: 20}}>
          You are available at this date by default.
        </Text>
        <CustomButton
          buttonText={'Customize Availability'}
          onPress={() => setShowModal(true)}
          style={{marginTop: -5}}
        />
      </View>
    );
  };

  const getAgenda = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BasUrl}/schedule/get-date`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

    axios
      .request(config)
      .then(response => {
        if(response.data.success){
          setAllAgenda(response.data.data)
        }else {
          Toast.show({
            type: 'error',
            text1: response.data.message
          })
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error.message
        })
      });
  };

  const removeService = string => {
    const filteredService = selectedServices.filter(
      eachService => eachService !== string,
    );
    setSelectedServices(filteredService);
  };

  const updateSchedule = () => {
    let data = JSON.stringify({
      date: selectedDate,
      services: selectedServices,
      dayOff: isEnabled
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BasUrl}/schedule/add-date`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      data : data
    };
    
    setLoading(true)

    axios.request(config)
    .then((response) => {
      setLoading(false)
      if(response.data.success){
        setShowModal(false)
        getAgenda()
        setSelectedServices([])
        setIsEnabled(false)
        Toast.show({
          type: 'success',
          text1: 'Schedule updated'
        })
      }else {
        Toast.show({
          type: 'error',
          text1: response.data.message
        })
      }
    })
    .catch((error) => {
      setLoading(false)
      Toast.show({
        type: 'error',
        text1: error.message
      })
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAgenda()
    })
    return unsubscribe;
  }, [navigation])


  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:'row', alignItems: 'center', width: '90%', alignSelf: 'center', marginVertical: 30}}>
        <AntDesign name={'arrowleft'} size={25} color={'black'} onPress={() => navigation.goBack()} style={{paddingRight: 10}} />
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: hp('3.5%'), marginLeft: 25}}>Calendar</Text>
      </View>

      <Agenda
        // selected="2022-12-01"
        // items={{
        //   '2024-03-29': [
        //     {services: ['drop in visit', 'day care'], dayOff: false},
        //   ],
        // }}
        pastScrollRange={0}
        futureScrollRange={50}

        items={allAgenda}
        onDayPress={(date) => setSelectedDate(date.dateString)}
        renderItem={(item, isFirst) => (
          <View style={styles.item}>
            <Text style={{color: 'black', fontSize: hp('2%'), margin: 5}}>
              Services you provide on this date:
            </Text>
            <View style={{flexDirection: 'row'}}>
              {item.services.map((eachService, index) => {
                return (
                  <Text
                    key={index}
                    style={{
                      backgroundColor: 'grey',
                      margin: 3,
                      color: 'white',
                      padding: 10,
                      marginVertical: 3,
                      borderRadius: 10,
                    }}>
                    {eachService}
                  </Text>
                );
              })}

            </View>
              {item.dayOff ? (
                <View style={{backgroundColor: 'rgba(255, 0, 0, 0.3)', padding: 7, borderRadius: 8, margin: 5}}>
                  <Text style={{fontSize: hp('1.8%')}}>You have set yourself away for this date</Text>
                </View>
              ) : null}
            <CustomButton onPress={() => setShowModal(true)} buttonText={'Customize Availability'} style={{marginTop: 8,margin: 5, alignSelf: 'flex-start'}} />
          </View>
        )}
        renderEmptyData={renderEmptyItem}
        minDate='2024-03-29'
      />

      <Modal
        onBackButtonPress={() => setShowModal(false)}
        onBackdropPress={() => setShowModal(false)}
        isVisible={showModal}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 10,
          }}>
          <AntDesign
            name="closesquare"
            size={25}
            color={'black'}
            style={{alignSelf: 'flex-end', padding: 5}}
            onPress={() => setShowModal(false)}
          />
          <Text
            style={{
              color: 'black',
              fontSize: hp('2.6%'),
              width: '90%',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            Select which services you can provide for this date.
          </Text>
          <View
            style={[styles.optionCont, {marginTop: 25}]}>
            <BouncyCheckbox
              size={25}
              fillColor="black"
              unfillColor="#FFFFFF"
              iconStyle={{borderColor: 'black'}}
              style={{borderColor: 'blacks'}}
              isChecked={selectedServices.includes('boarding')}
              onPress={isChecked =>
                isChecked
                  ? setSelectedServices([...selectedServices, 'boarding'])
                  : removeService('boarding')
              }
            />
            <Text style={{color: 'black', fontSize: hp('2.2%')}}>Boarding</Text>
          </View>
          <View
            style={styles.optionCont}>
            <BouncyCheckbox
              size={25}
              fillColor="black"
              unfillColor="#FFFFFF"
              iconStyle={{borderColor: 'black'}}
              style={{borderColor: 'blacks'}}
              isChecked={selectedServices.includes('house sitting')}
              onPress={isChecked =>
                isChecked
                  ? setSelectedServices([...selectedServices, 'house sitting'])
                  : removeService('house sitting')
              }
            />
            <Text style={{color: 'black', fontSize: hp('2.2%')}}>
              House Sitting
            </Text>
          </View>
          <View
            style={styles.optionCont}>
            <BouncyCheckbox
              size={25}
              fillColor="black"
              unfillColor="#FFFFFF"
              iconStyle={{borderColor: 'black'}}
              style={{borderColor: 'blacks'}}
              isChecked={selectedServices.includes('drop in visit')}
              onPress={isChecked =>
                isChecked
                  ? setSelectedServices([...selectedServices, 'drop in visit'])
                  : removeService('drop in visit')
              }
            />
            <Text style={{color: 'black', fontSize: hp('2.2%')}}>
              Drop in visit
            </Text>
          </View>
          <View
            style={styles.optionCont}>
            <BouncyCheckbox
              size={25}
              fillColor="black"
              unfillColor="#FFFFFF"
              iconStyle={{borderColor: 'black'}}
              style={{borderColor: 'blacks'}}
              isChecked={selectedServices.includes('pet day care')}
              onPress={isChecked =>
                isChecked
                  ? setSelectedServices([...selectedServices, 'pet day care'])
                  : removeService('pet day care')
              }
            />
            <Text style={{color: 'black', fontSize: hp('2.2%')}}>
              Pet day care
            </Text>
          </View>
          <View
            style={styles.optionCont}>
            <BouncyCheckbox
              size={25}
              fillColor="black"
              unfillColor="#FFFFFF"
              iconStyle={{borderColor: 'black'}}
              style={{borderColor: 'blacks'}}
              isChecked={selectedServices.includes('pet walking')}
              onPress={isChecked =>
                isChecked
                  ? setSelectedServices([...selectedServices, 'pet walking'])
                  : removeService('pet walking')
              }
            />
            <Text style={{color: 'black', fontSize: hp('2.2%')}}>
              Pet walking
            </Text>
          </View>

          <Text
            style={{
              color: 'black',
              fontSize: hp('2.6%'),
              width: '90%',
              alignSelf: 'center',
              marginTop: 30,
            }}>
            OR
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: hp('2.6%'),
              width: '90%',
              alignSelf: 'center',
              marginTop: 30,
            }}>
            Set yourself as away for this date.
          </Text>
          <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={isEnabled ? 'lightgrey' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{
              alignSelf: 'flex-start',
              marginLeft: 15,
              marginVertical: 15,
              transform: [{scaleX: 1}, {scaleY: 1}],
            }}
          />
          <Text
            style={{
              color: 'grey',
              fontSize: hp('1.8%'),
              width: '60%',
              marginLeft: 20,
              marginBottom: 30,
            }}>
            Turn the switch on to set yourself away for the day
          </Text>

          <CustomButton onPress={updateSchedule} buttonText={loading ? <ActivityIndicator size={25} color='white' /> : 'Update'} style={{marginTop: -10, marginBottom: 10}} />
        </View>

        <Toast />
      </Modal>
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: '#888',
    fontSize: 16,
  },
  optionCont: {flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: 'center'}
});
