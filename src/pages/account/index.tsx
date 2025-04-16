import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useAppSelector } from "@/store/hooks"
import { useNotification } from "@/hooks/notification"
import { userApi } from "@/apis/user"

export default function AccountPage() {
    const { user } = useAppSelector(state => state.user)
    const { showNotification } = useNotification()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        newName: user?.firstName || ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.newPassword !== formData.confirmPassword) {
            showNotification("New passwords do not match", "error")
            return
        }

        setIsLoading(true)
        try {
            await userApi.changePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            })
            showNotification("Password changed successfully", "success")
            setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }))
        } catch (error) {
            showNotification("Failed to change password", "error")
        } finally {
            setIsLoading(false)
        }
    }

    const handleNameChange = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await userApi.updateProfile({ name: formData.newName })
            showNotification("Name updated successfully", "success")
        } catch (error) {
            showNotification("Failed to update name", "error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Account Management</h1>
            
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type="password"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Updating..." : "Change Password"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Update Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleNameChange} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="newName">Display Name</Label>
                                <Input
                                    id="newName"
                                    name="newName"
                                    value={formData.newName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Updating..." : "Update Name"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 