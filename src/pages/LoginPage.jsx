import {useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card"
import userService from "@/service/UserService.js";
import {updateUploadedFile, updateUserChats} from "@/app/store/slice/chatSlice.js";
import {useDispatch} from "react-redux";

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem("userChats", JSON.stringify([]))
        localStorage.setItem("uploadedFiles",JSON.stringify([]))
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('') // Clear any previous errors
        if (password.length < 8) {
            setError('Password must be at least 8 characters')
            return;
        }

        try {
            const response = await userService.loginUser(email, password)
            var data = response.data;
            if (response.status === 200 && data) {
                localStorage.setItem('jwtToken', "Bearer " + data.jwtToken)
                localStorage.setItem("userChats",JSON.stringify(data.userChats))
                localStorage.setItem("uploadedFiles",JSON.stringify(data.uploadedFiles))
                dispatch(updateUserChats(data.userChats))
                dispatch(updateUploadedFile(data.uploadedFiles))
                navigate('/dashboard')
            } else {
                setError(data.message || 'An error occurred during login')
            }
        } catch (error) {
            console.error('Login error:', error)
            setError(error.response?.data?.message || 'An error occurred during login. Please try again.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login to Notebook LLM</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        <div className="space-y-2">
                            <label htmlFor="email">Email</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password">Password</label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full">Login</Button>
                        <p>
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

