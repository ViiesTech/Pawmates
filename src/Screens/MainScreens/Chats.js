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
import React, { useState, useEffect } from 'react';
import { COLORS } from '../../Constants/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ChatCard from '../../Components/ChatCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../Components/Header';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Button from '../../Components/Button';
import Bottleneck from 'bottleneck';
import BasUrl from '../../BasUrl';


const Chats = ({ navigation }) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const { user, token } = useSelector(state => state.authData);
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
    setChatLoading(true);


    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BasUrl}/chat/getAllchat`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setChats(response.data.data)
        setChatLoading(false);
        
      })
      .catch((error) => {
        setChatLoading(false);
        console.log(error);
      });



  };

  const handleSearchFilter = changedText => {
    setSearchText(changedText);

    const theFilteredChats = chats.filter(chat => {
      return chat.name.toLowerCase().includes(changedText.toLowerCase());
    });
    setFilteredChats(theFilteredChats);
  };

  const renderChatCard = ({ item }) => {
    console.log("item: ", item)
    if (chats) {
      return (
        <View style={{ marginVertical: 10 }}>
          <ChatCard
            onPress={() =>
              navigation.navigate('ChatScreen', {
                otherUserId: item.id,
                navigatedFrom: 'chats',
                userData: {
                  user_name: item.name,
                  user_profile_image: item.profileImage,
                },
              })
            }
            username={item.receiver == user.name ? item.receiver : item.sender}
            userAvatar={item.receiver == user.name ?  item.receiverImg : item.senderImg}
            lastMessage={item.message}
            lastMessageTime={formatDateinHours(item.timestamp)}
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
            <AntDesign
              name="left"
              size={30}
              color={COLORS.primary}
              onPress={() => navigation.goBack()}
            />
            <TextInput
              placeholder="Search chat"
              placeholderTextColor={'grey'}
              style={{ color: 'black' }}
              autoFocus={true}
              cursorColor="black"
              value={searchText}
              onChangeText={handleSearchFilter}
            />
            <View style={{ width: 30 }} />
            <AntDesign
              name="search1"
              size={30}
              color={COLORS.primary}
              style={{
                position: 'absolute',
                right: 12,
                zIndex: 10,
                backgroundColor: 'white',
                padding: 5,
                borderRadius: 250,
              }}
            />
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
              style={{ marginVertical: 80 }}
            />
          </>
        ) : (
          <FlatList
            data={searchText ? filteredChats : chats}
            renderItem={renderChatCard}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              return (
                <Text style={styles.warningText}>
                  You don't have any chats with people.
                </Text>
              );
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
    overflow: 'hidden',
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
    marginTop: -20,
  },
});
