import React, { useEffect, useState } from 'react'
import './Feed.css'
import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from './Post';
import { db } from './firebaseConnection';
import {serverTimestamp} from 'firebase/firestore';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import FlipMove from 'react-flip-move'


function Feed() {

    const inputOptions = [
        {
            icon: ImageIcon,
            title: 'Photo',
            color: '#70B5F9'
        },
        {
            icon: SubscriptionsIcon,
            title: 'Video',
            color: '#E7A33E'
        },
        {
            icon: EventNoteIcon,
            title: 'Event',
            color: '#C0CBCD'
        },
        {
            icon: CalendarViewDayIcon,
            title: 'Write Article',
            color: '#7FC15E'
        },
    ]

    const inputOptionsData = inputOptions.map((data, idx) => {
        return <InputOption key={idx} Icon={data.icon} title={data.title} color={data.color}/>
    })

    const [posts, setPosts] = useState([])
    const [input, setInput] = useState("")
    const user = useSelector(selectUser)

    useEffect(() => {
        db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => (
            setPosts(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ))
    }, [])

    const sendPost = e => {
        e.preventDefault();
        db.collection("posts").add({
            name: user.user.displayName,
            description: user.user.email,
            message: input,
            photoUrl: user.user.photoUrl || "",
            timestamp: serverTimestamp()
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            setInput("")
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon />
                    <form>
                        <input value={input} onChange={e=>setInput(e.target.value)} type="text"/>
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                    {inputOptionsData}
                </div>
            </div>
            <FlipMove>
                {posts.map(({id, data: {name, description, message, photoUrl}}) => {
                    return (
                        <Post
                            key={id}
                            name={name}
                            description={description}
                            message={message}
                            photoUrl={photoUrl}
                        />
                    )
                })}
            </FlipMove>
            
        </div>
    )
}

export default Feed