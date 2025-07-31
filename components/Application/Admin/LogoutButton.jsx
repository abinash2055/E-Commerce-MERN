import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { showToast } from '@/lib/showToast'
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute'
import { logout } from '@/store/reducer/authReducer'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Added below 2 lines to resolve my error....
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
      const apiUrl = `${baseUrl}/api/auth/logout`;

      // "{app/auth/logout} iss changed to apiUrl" to resolve error....
      const { data: logoutResponse } = await axios.post(apiUrl);

      if (!logoutResponse.success) {
        throw new Error(logoutResponse.message);
      }

      dispatch(logout());
      showToast("success", logoutResponse.message);
      router.push(WEBSITE_LOGIN);

    } catch (error) {
      showToast('error', error.message);
    }
  }

  return (
    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
      <AiOutlineLogout color="red" />
      Logout
    </DropdownMenuItem>
  )
}

export default LogoutButton