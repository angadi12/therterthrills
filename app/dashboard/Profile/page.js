"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, User, Lock, Eye, EyeOff } from 'lucide-react'
import { cn } from "@/lib/utils"



export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState('personal')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    location: "",
    email: "",
    address: ""
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDiscard = () => {
    if (activeTab === 'personal') {
      setProfileData({
        firstName: "",
        lastName: "",
        phoneNo: "",
        location: "",
        email: "",
        address: ""
      })
    } else {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      })
    }
  }

  const handleSave = () => {
    if (activeTab === 'personal') {
    } else {
    }
  }

  return (
    <div className="w-full mx-auto p-6 h-screen">
      <div className="flex gap-6">
        {/* Left Sidebar */}
        <div className="w-64 space-y-6">
          <div className="relative">
            <div className="w-40 h-40 rounded-full overflow-hidden">
              <img
                src="/placeholder.svg?height=160&width=160"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full bg-pink-500 hover:bg-pink-600"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('personal')}
              className={cn(
                "w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-left",
                activeTab === 'personal' 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={cn(
                "w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-left",
                activeTab === 'login' 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Lock className="h-5 w-5" />
              <span>Login & Password</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg p-6">
          {activeTab === 'personal' ? (
            <>
              <h1 className="text-2xl font-bold mb-6">Personal Information</h1>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNo">Phone No.</Label>
                    <Input
                      id="phoneNo"
                      name="phoneNo"
                      value={profileData.phoneNo}
                      onChange={handleInputChange}
                      placeholder="Phone No."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                      placeholder="Location"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-pink-500 text-pink-500 hover:bg-pink-50"
                    onClick={handleDiscard}
                  >
                    Discard Changes
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Login & Password</h1>
                <Button
                  variant="link"
                  className="text-pink-500 hover:text-pink-600"
                >
                  I forgot my Password
                </Button>
              </div>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Enter Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <p className="text-pink-500 text-sm">
                  In order to change your password, you must enter your previous password, this is for security purposes.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Enter New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-pink-500 text-pink-500 hover:bg-pink-50"
                    onClick={handleDiscard}
                  >
                    Discard Changes
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleSave}
                  >
                    Reset Password
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}