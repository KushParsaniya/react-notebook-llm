import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import userService from "@/service/UserService.js";

export default function SignupPage() {
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        // TODO: Implement signup logic here
        if (password < 8) {
            setSuccess(null)
            setError("Password should be at least 8 characters")
        }
        console.log('Signup with:', username, password, phone)
        try {
            const {status, data} = await userService.createUser(username, password, phone)
            if (status === 200) {
                navigate('/login')
                setSuccess("User created successfully")
            } else if (status === 409) {
                setUsername('')
                setError("User with email already exists")
            } else {
                setError("Something went wrong please try again!")
            }
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sign up for Notebook LLM</CardTitle>
                    <CardDescription>Create your account to get started</CardDescription>
                </CardHeader>
                <form onSubmit={handleSignup}>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{success}</span>
                        </div>
                    )}
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="username">Email</label>
                            <Input
                                id="username"
                                type="email"
                                placeholder="Enter your email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password">Password</label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone">Phone</label>
                            <Input
                                id="phone"
                                type="text"
                                placeholder="Enter your phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full">Sign Up</Button>
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary hover:underline">
                                Log in
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
