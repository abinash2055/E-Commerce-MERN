import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'

const LogoutButton = () => {
  return (
    <DropdownMenuItem className="cursor-pointer">
      <AiOutlineLogout color="red"/>
        Logout
    </DropdownMenuItem>
  )
}

export default LogoutButton