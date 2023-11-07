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
  import { COLORS } from '../../Constants/theme';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import ChatCard from '../../Components/ChatCard';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import Header from '../../Components/Header';
  import {useSelector} from 'react-redux';
  import axios from 'axios';
  import Button from '../../Components/Button';
  
  
  const Chats = ({navigation}) => {
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [chats, setChats] = useState([
      {
        user_name: 'Patrick',
        lastMessage: 'Hello Patrick',
        lastMessageTime: '12 Oct 2023 10:30 AM'
      },
      {
        user_name: 'Jason',
        lastMessage: 'Hi Jason',
        lastMessageTime: '12 Oct 2023 10:30 AM'
      }
    ]);
    const [chatLoading, setChatLoading] = useState(false);
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
  
    const renderChatCard = ({item}) => {
      if (chats) {
        return (
          <View style={{marginVertical: 10}}>
            <ChatCard
              onPress={() =>
                navigation.navigate('ChatScreen', {
                  otherUserId: item.user_id,
                  userData: {
                    user_name: item.user_name,
                    user_profile_image: '',
                  },
                })
              }
              username={item.user_name}
              userAvatar={item.user_profile_image}
              lastMessage={item.lastMessage}
              // lastMessageTime={formatDateinHours(item.lastMessageTime)}
              lastMessageTime={item.lastMessageTime}
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
              <TextInput
                placeholder="Search chat"
                placeholderTextColor={'grey'}
                style={{color: 'black'}}
                autoFocus={true}
                cursorColor="black"
                value={searchText}
                onChangeText={changedText => setSearchText(changedText)}
              />
              <AntDesign name="search1" size={30} color={COLORS.primary} />
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
          ) : null}
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
    },
    warningText: {
      color: 'grey',
      margin: 15,
      fontSize: hp('2.2%'),
      marginTop: 30,
    },
    buttonCont: {
      width: '50%',
      marginLeft: 15,
    },
  });
  