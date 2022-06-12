import { Avatar } from '@mui/material'
import React, { forwardRef } from 'react'
import './Post.css'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InputOption from './InputOption';

const Post = forwardRef(({ name, description,  message, photoUrl }, ref) => {
    
    const postButtons = [
        {
            icon: ThumbUpAltOutlinedIcon,
            title: 'Like',
            color: 'gray'
        },
        {
            icon: ChatOutlinedIcon,
            title: 'Comment',
            color: 'gray'
        },
        {
            icon: ShareOutlinedIcon,
            title: 'Share',
            color: 'gray'
        },
        {
            icon: SendOutlinedIcon,
            title: 'Send',
            color: 'gray'
        },
    ]

    const postButtonsData = postButtons.map((p, idx) => {
        return (
            <InputOption key={idx} title={p.title} color={p.color} Icon={p.icon} />
        )
    })
    
    return (
        <div ref={ref} className="post">
            <div className="post__header">
                <Avatar src={photoUrl}>{name[0]}</Avatar>
                <div className="post__info">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
            </div>

            <div className="post__body">
                <p>{message}</p>
            </div>

            <div className="post__buttons">
                {postButtonsData}
            </div>

        </div>
    )
})

export default Post