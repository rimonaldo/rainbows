import React from 'react'
import { User } from '../types'

interface AvatarProps {
   user: User | null
}

export const Avatar: React.FC<AvatarProps> = ({ user }) => {
   const avatarStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '1.5rem',
      height: '1.5rem',
      borderRadius: '50%',
      backgroundColor: 'gray',
      color: 'white',
      fontSize: '20px',
   }

   const getInitials = (username?: string) => {
      return username ? username[0].toUpperCase() : 'Log in'
   }

   return <div style={user?avatarStyle:{color:'red'}}>{getInitials(user?.username)}</div>
}
