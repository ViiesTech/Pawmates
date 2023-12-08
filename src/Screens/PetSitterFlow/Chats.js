import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
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
import axios from 'axios';
import Button from '../../Components/Button';
import Bottleneck from 'bottleneck';

const Chats = ({navigation}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const {user, token} = useSelector(state => state.authData);
  const [chats, setChats] = useState([]);
  const [chatLoading, setChatLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredChats, setFilteredChats] = useState('');

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
    firestore()
      .collection('chats')
      .where('ids', 'array-contains', `${user.id}`)
      .orderBy('lastMessageTime', 'desc')
      .onSnapshot(snapshot => {
        const chatsData = [];
        snapshot?.forEach(eachChat => {
          const chatId = eachChat.data().ids.filter(id => {
            return id !== `${user.id}`;
          });

          chatsData.push({
            ...eachChat.data(),
            chatId,
          });
        });

        Promise.all(
          chatsData.map(chat => {
            return limiter.schedule(async () => {
              try {
                let config = {
                  method: 'get',
                  url: `https://customdemo.website/apps/spill-app/public/api/user/${chat.chatId}`,
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
                const response = await axios.request(config);
                if (response.data.success) {
                  return {
                    ...response.data.data,
                    lastMessage: chat.lastMessage.text,
                    lastMessageTime: chat.lastMessageTime,
                  };
                } else {
                  console.log('there is a error ');
                  return null;
                }
              } catch (error) {
                console.error(error);
                return null;
              }
            });
          }),
        )
          .then(userData => {
            // Filter out null values from the array
            const validUserData = userData.filter(user => user !== null);
            setChats(validUserData);
            setChatLoading(false);
          })
          .catch(error => {
            console.error(error);
            setChatLoading(false);
          });
      })
  };


  const handleSearchFilter = changedText => {
    setSearchText(changedText);

    const theFilteredChats = chats.filter(chat => {
      return chat.user_name.toLowerCase().includes(changedText.toLowerCase());
    });
    setFilteredChats(theFilteredChats);
  };

  const renderChatCard = ({item}) => {
    if (chats) {
      return (
        <View style={{marginVertical: 10}}>
          <ChatCard
            onPress={() =>
              navigation.navigate('ChatScreen', {
                otherUserId: item.user_id,
                navigatedFrom: 'chats',
                userData: {
                  user_name: item.user_name,
                  user_profile_image: item.user_profile_image,
                  fcm_token: item.fcm_token,
                },
              })
            }
            username={item.user_name}
            userAvatar={item.user_profile_image}
            lastMessage={item.lastMessage}
            lastMessageTime={formatDateinHours(item.lastMessageTime)}
          />
        </View>
      );
    } else {
      <Text>Currently you have not chats</Text>;
    }
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
        ) : chats.length > 0 ? (
          <FlatList
            data={searchText ? filteredChats: chats}
            renderItem={renderChatCard}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <>
            <Text style={styles.warningText}>
              You don't have any chats with people.
            </Text>
          </>
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
});
