import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {Button} from "../components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "../components/ui/card"
import FileUpload from '../app/components/file-upload.jsx'
import Layout from '../app/components/layout.jsx'
import {addUploadedFile} from "@/app/store/slice/chatSlice.js";
import UploadFileService from "@/service/UploadFileService.js";
import LocalStorageService from "@/service/LocalStorageService.js";

export default function DashboardPage() {
    const navigate = useNavigate()
    const { userChats, uploadedFiles } = useSelector(state => state.chat)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const dispatch = useDispatch()

    const handleLogout = () => {
        navigate('/login')
        LocalStorageService.removeAllItems()
    }

    const handleFileUpload = async (file) => {
        try {
            setError(null)
            if (file.size > 5000000) {
                setError("File size should be less than 5MB")
                return;
            }

            const response = await UploadFileService.uploadSmallFile(file)
            console.log('File uploaded:', response)
            if (response.status === 200) {
                LocalStorageService.addItemToLocalStorageArray("uploadedFiles", response.data)
                dispatch(addUploadedFile(response.data))
                setSuccess("File uploaded successfully.")
            } else if (response.status === 400) {
                setError("Bad request")
            } else {
                setError("Something went wrong please try again!")
            }
        } catch (err) {
            console.error('File upload error:', err)
            setError('Failed to upload file. Please try again.')
        }
    }

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                {/*<Button onClick={handleLogout}>Logout</Button>*/}
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Your PDFs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FileUpload onUpload={handleFileUpload} />
                        <ul className="mt-4 space-y-2">
                            {uploadedFiles.map((file) => (
                                <li key={file.id} className="flex items-center justify-between">
                                    <span>{file.fileName}</span>
                                    <Button variant="outline" size="sm">
                                        {file.status === 'REMAINING' ? 'Processing' : 'View'}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Chat History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {userChats.map((chat) => (
                                <li key={chat.chatId} className="flex items-center justify-between">
                                    <span>{chat.title}</span>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link to={`/chat/${chat.chatId}`}>Continue</Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    )
}