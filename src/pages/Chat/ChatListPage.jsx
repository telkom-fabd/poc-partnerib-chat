import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Flex} from "@chakra-ui/react";
import SendbirdChat from '@sendbird/chat'
import {GroupChannelFilter, GroupChannelListOrder, GroupChannelModule} from "@sendbird/chat/groupChannel";
import ChatItem from "../../components/chat/ChatItem.jsx";

import * as merchantService from "../../services/merchant";
import * as cookie from "../../utils/cookie.js";

const ChatListPage = () => {
    const navigate = useNavigate();
    const sb = SendbirdChat.init({
        appId: 'CFEC9256-8DDF-4D86-BD78-8106455347BC',
        modules: [
            new GroupChannelModule(),
        ],
    });

    const [userId, setUserId] = useState('');
    const [sendBirdUser, setSendBirdUser] = useState(null);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const user = cookie.getUser();
        setUserId(user._id);
        getSendBirdUser();
    }, []);

    const getSendBirdUser = async () => {
        const result = await merchantService.getSendBirdUser();
        if (result.isSuccess && result.data && result.data.user) {
            console.log("getSendBirdUser :", result.data.user);
            setSendBirdUser(result.data.user);
        }
    }

    useEffect(() => {
        if (sendBirdUser && sendBirdUser.user_id) {
            console.log("sendBirdUser :", sendBirdUser);
            connectSendbird(sendBirdUser.user_id);
        }
    }, [sendBirdUser]);

    const connectSendbird = async (userId) => {
        try {
            await sb.connect(userId);

            const groupChannelFilter = new GroupChannelFilter();
            groupChannelFilter.includeEmpty = true;
            const params = {
                filter: groupChannelFilter,
                order: GroupChannelListOrder.LATEST_LAST_MESSAGE,
            };
            const channelCollection = sb.groupChannel.createGroupChannelCollection(params);
            const channels = await channelCollection.loadMore();
            console.log("channels :", channels);

            const chatList = channels.map((channel) => {
                let members = [];
                if (channel.members && channel.members.length > 0) {
                    members = channel.members.map((member) => {
                        return {
                            userId: member.userId,
                            avatar: member.plainProfileUrl,
                            name: member.nickname,
                            isOnline: member.connectionStatus === 'online',
                        };
                    });
                }

                let lastMessage = null;
                if (channel.lastMessage) {
                    lastMessage = {
                        content: channel.lastMessage.message,
                        createdAt: channel.lastMessage.createdAt,
                        sender: {
                            userId: channel.lastMessage.sender.userId,
                            avatar: channel.lastMessage.sender.plainProfileUrl,
                            name: channel.lastMessage.sender.nickname,
                        },
                    };
                }

                return {
                    url: channel._url,
                    members: members,
                    lastMessage: lastMessage,
                    createdAt: channel.createdAt,
                };
            })

            console.log("chatList :", chatList);
            setChats(chatList);
        } catch (err) {
            console.log("connectSendbird error :", err);
            // Handle error.
        }
    }

    return (
        <>
            <Flex
                flexDir='column'
                justifyContent='start'
                alignItems='start'
                h='500px'
                overflow='auto'
            >
                {
                    chats.map((chat, index) => (
                        <ChatItem
                            key={`chat-${index}`}
                            userId={userId}
                            chat={chat}
                            onClick={() => {
                                navigate(`/chat/${chat.url}`);
                            }}
                        />
                    ))
                }
            </Flex>
        </>
    );
};

export default ChatListPage;
