import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../../Constants/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ChatCard from '../../Components/ChatCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../Components/Header';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import axios from 'axios';
import Button from '../../Components/Button';
import Bottleneck from 'bottleneck';

const Chats = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState('upcoming')
  const [showSearchInput, setShowSearchInput] = useState(false);
  const {user, token} = useSelector(state => state.authData);
  const [chats, setChats] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredChats, setFilteredChats] = useState('');
  const [upcomingUsersExists, setUpcomingUsersExists] = useState(false);
  const [bookedUsersExists, setBookedUsersExists] = useState(false);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      setShowSearchInput(false);
    });
  }, [navigation]);

  const formatDateinHours = dateString => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return formattedDate;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getAllChats();
    });
    return unsubscribe;
  }, [navigation]);

  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 1000,
  });

  const getAllChats = () => {
    setChatLoading(true);

    const unsubscribe = firestore()
      .collection('users')
      .doc(user.id)
      .onSnapshot(snapshot => {
        const chatsData = [];
        snapshot.data()?.allChats.forEach(eachChat => {
          const chatId = eachChat.ids.filter(id => {
            return id !== `${user.id}`;
          });

          chatsData.push({
            ...eachChat,
            chatId,
          });
        });
        
        chatsData.sort((a, b) => b.createdAt - a.createdAt);
        Promise.all(
          chatsData.map(async chat => {
            const userSnapshot = await firestore()
              .collection('users')
              .doc(`${chat.chatId}`)
              .get();

            return {
              ...userSnapshot.data(),
              lastMessage: chat.lastMessage.text,
              lastMessageTime: chat.createdAt,
              requestAccepted: chat.requestAccepted
            };
          }),
        )
          .then(userData => {
            setChats(userData);
            setChatLoading(false);
          })
          .catch(error => {
            console.error(error);
            setChatLoading(false);
          });
      });

    return () => {
      unsubscribe();
    };
  };


  const handleSearchFilter = changedText => {
    setSearchText(changedText);

    const theFilteredChats = chats.filter(chat => {
      return chat.name.toLowerCase().includes(changedText.toLowerCase());
    });
    setFilteredChats(theFilteredChats);
  };

  
  const renderChatCard = ({item, index}) => {
    if(!item?.requestAccepted){
      setUpcomingUsersExists(true)
    }else if(item?.requestAccepted){
      setBookedUsersExists(true)
    }

    return (
      <View index ={index}>
      {
        selectedOption === 'upcoming' && !item?.requestAccepted ? (
            <View style={{marginVertical: 10}}>
              <ChatCard
                onPress={() =>
                  navigation.navigate('ChatScreen', {
                    otherUserId: item.id,
                    navigatedFrom: 'chats',
                    userData: {
                      user_name: item.name,
                      user_profile_image: item.profileImage,
                      // fcm_token: item.fcm_token,
                    },
                  })
                }
                username={item.name}
                userAvatar={item.profileImage}
                lastMessage={item.lastMessage}
                lastMessageTime={formatDateinHours(item.lastMessageTime)}
              />
            </View>
          ) : selectedOption === 'upcoming' && !upcomingUsersExists && index===0 ? (
            <Text style={styles.warningText}>
              You don't have any chats here.
            </Text>
          ) : null
      }
      {
        selectedOption === 'booked' && item?.requestAccepted ? (
          <View style={{marginVertical: 10}}>
            <ChatCard
              onPress={() =>
                navigation.navigate('ChatScreen', {
                  otherUserId: item.id,
                  navigatedFrom: 'chats',
                  userData: {
                    user_name: item.name,
                    user_profile_image: item.profileImage,
                    // fcm_token: item.fcm_token,
                  },
                })
              }
              username={item.name}
              userAvatar={item.profileImage}
              lastMessage={item.lastMessage}
              lastMessageTime={formatDateinHours(item.lastMessageTime)}
            />
          </View>
        ) : selectedOption === 'booked' && !bookedUsersExists && index===0? (
          <Text style={styles.warningText}>
            You don't have any chats here.
          </Text>
        ) : null
      }
      </View>
    )
    

  };

  return (
    <View style={styles.container}>
      <View>
        {showSearchInput ? (
            <View style={styles.inputContainer}>
              <AntDesign name="left" size={30} color={COLORS.primary} onPress={() => navigation.goBack()} />
              <TextInput
                placeholder="Search chat"
                placeholderTextColor={'grey'}
                style={{color: 'black'}}
                autoFocus={true}
                cursorColor="black"
                value={searchText}
                onChangeText={handleSearchFilter}
              />
              <View style={{width: 30}} />
              <AntDesign name="search1" size={30} color={COLORS.primary} style={{position: 'absolute', right: 12, zIndex: 10, backgroundColor: 'white', padding: 5, borderRadius: 250}} />
            </View>
        ) : (
          <Header
            showSearchIcon={true}
            onSearchInputPress={() => setShowSearchInput(true)}
            onBackPress={() => navigation.goBack()}
          />
        )}
      </View>

      <View style={{width: wp('95%'), height: hp('6%'), alignSelf: 'center', borderRadius: 25, backgroundColor: 'lightgrey', flexDirection: 'row', alignItems: 'row', overflow: 'hidden', marginVertical: 15}}>
        <TouchableOpacity onPress={() => setSelectedOption('upcoming')} style={[styles.option, selectedOption === 'upcoming' ? {backgroundColor: COLORS.primary_with_opacity} : null]}>
          <Text style={[{fontSize: hp('2.2%'), color: 'rgba(0,0,0,0.6)', fontWeight: 'bold'}, selectedOption === 'upcoming' ? {color: 'white'} : null]}>UPCOMING</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedOption('booked')} style={[styles.option, selectedOption === 'booked' ? {backgroundColor: COLORS.primary_with_opacity} : null]}>
          <Text style={[{fontSize: hp('2.2%'), color: 'rgba(0,0,0,0.6)', fontWeight: 'bold'}, selectedOption === 'booked' ? {color: 'white'} : null]}>BOOKED</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.allChatsContainer}>
        <Text style={styles.headingText}>Messages</Text>
        {chatLoading ? (
          <>
            <ActivityIndicator
              color={'black'}
              size={55}
              style={{marginVertical: 80}}
            />
          </>
        ) : (
          <FlatList
            data={searchText ? filteredChats: chats}
            renderItem={renderChatCard}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              return (
                <Text style={styles.warningText}>
                  You don't have any chats with people.
                </Text>
                )
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  allChatsContainer: {
    width: '95%',
    backgroundColor: COLORS.primary_border,
    borderRadius: 25,
    marginTop: 5,
    alignSelf: 'center',
    padding: 15,
  },
  headingText: {
    color: 'black',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    margin: 15,
  },
  inputContainer: {
    width: '95%',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 12,
    overflow: 'hidden'
  },
  warningText: {
    color: 'grey',
    margin: 15,
    fontSize: hp('2.2%'),
    marginTop: 30,
  },
  buttonCont: {
    width: '50%',
    marginLeft: 5,
    marginTop: -20
  },
  option: {width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}
});
