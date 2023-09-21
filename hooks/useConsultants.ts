'use client'
import {
  Consultant,
  retrieveConsultants,
} from '@/functions/retrieve-consultants'
import { useEffect, useState } from 'react'

const consultantsMock: Consultant[] = [
  {
    co_usuario: '1',
    no_usuario: 'Consultor 1',
  },
  {
    co_usuario: '2',
    no_usuario: 'Consultor 2',
  },
  {
    co_usuario: '3',
    no_usuario: 'Consultor 3',
  },
  {
    co_usuario: '4',
    no_usuario: 'Consultor 4',
  },
  {
    co_usuario: '5',
    no_usuario: 'Consultor 5',
  },
  {
    co_usuario: '6',
    no_usuario: 'Consultor 6',
  },
  {
    co_usuario: '7',
    no_usuario: 'Consultor 7',
  },
  {
    co_usuario: '8',
    no_usuario: 'Consultor 8',
  },
  {
    co_usuario: '9',
    no_usuario: 'Consultor 9',
  },
  {
    co_usuario: '10',
    no_usuario: 'Consultor 10',
  },
  {
    co_usuario: '11',
    no_usuario: 'Consultor 11',
  },
  {
    co_usuario: '12',
    no_usuario: 'Consultor 12',
  },
  {
    co_usuario: '13',
    no_usuario: 'Consultor 13',
  },
  {
    co_usuario: '14',
    no_usuario: 'Consultor 14',
  },
  {
    co_usuario: '15',
    no_usuario: 'Consultor 15',
  },
]
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
