'use client'
import {
  Consultant,
  retrieveConsultants,
} from '@/functions/retrieve-consultants'
import { useEffect, useState } from 'react'

const useConsultants = () => {
  const [availableUsers, setAvailableUsers] = useState<Consultant[]>([])
  const [selectedUsers, setSelectedUsers] = useState<Consultant[]>([])
  const [movedUsers, setMovedUsers] = useState<Consultant[]>([])

  const handleUserClick = (user: Consultant) => {
    if (selectedUsers.includes(user)) {
      const updatedSelectedUsers = selectedUsers.filter((u) => u !== user)
      setSelectedUsers(updatedSelectedUsers)
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  const handleMove = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setAvailableUsers([...availableUsers, ...selectedUsers])
      const updatedMovedUsers = movedUsers.filter(
        (user) => !selectedUsers.includes(user),
      )
      setMovedUsers(updatedMovedUsers)
    } else {
      setMovedUsers([...movedUsers, ...selectedUsers])
      const updatedAvailableUsers = availableUsers.filter(
        (user) => !selectedUsers.includes(user),
      )
      setAvailableUsers(updatedAvailableUsers)
    }
    setSelectedUsers([])
  }

  const handleAlertUsers = () => {
    const userList = movedUsers.map((user) => user.no_usuario).join(', ')
    alert(`Usuarios Selecionados: ${userList}`)
  }

  useEffect(() => {
    const retrieveUser = async () => {
      const data = await retrieveConsultants()
      setAvailableUsers(data)
    }
    retrieveUser()
  }, [])

  return {
    availableUsers,
    selectedUsers,
    movedUsers,
    handleUserClick,
    handleMove,
    handleAlertUsers,
  }
}

export default useConsultants
