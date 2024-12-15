import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import Layout from '../app/components/layout.jsx'
import chatService from "@/service/ChatService.js"
import ReactMarkdown from 'react-markdown' // For rendering Markdown messages

export default function ChatPage() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const { id } = useParams() // Extract the chat ID from the route
    const navigate = useNavigate()
    const cardContentRef = useRef(null) // Ref to track the scrollable container
    const [isScrolledUp, setIsScrolledUp] = useState(false) // State for "Scroll to Bottom" button visibility

    // Fetch chat messages dynamically based on `id`
    useEffect(() => {
        const fetchChatMessages = async () => {
            if (id) {
                try {
                    const { status, data } = await chatService.getChatHistory(id) // Call API
                    if (status === 200) {
                        const formattedMessages = data.map(msg => ({
                            role: msg.messageType === 'USER' ? 'user' : 'assistant',
                            content: msg.message,
                            createdAt: msg.createdAt,
                        }))
                        setMessages(formattedMessages)
                        scrollToBottom()
                    } else {
                        console.error('Failed to fetch chat messages:', data)
                    }
                } catch (error) {
                    console.error('Error fetching chat messages:', error)
                }
            }
        }
        fetchChatMessages()
    }, [id])

    // Scroll to the bottom of the chat container
    const scrollToBottom = () => {
        if (cardContentRef.current) {
            cardContentRef.current.scrollTop = cardContentRef.current.scrollHeight
        }
    }

    // Track scroll position to show/hide "Scroll to Bottom" button
    const handleScroll = () => {
        if (cardContentRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = cardContentRef.current
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20 // Allow some tolerance
            setIsScrolledUp(!isAtBottom)
        }
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!input.trim()) return

        const newMessage = { role: 'user', content: input, createdAt: new Date().toISOString() }
        setMessages([...messages, newMessage])
        setInput('')

        try {
            // Send message to backend and get response
            const response = await chatService.sendMessage(id, input) // Call send message API
            const aiResponse = {
                role: 'assistant',
                content: response.data, // Response from AI
                createdAt: new Date().toISOString(),
            }
            setMessages(prevMessages => [...prevMessages, aiResponse])
            scrollToBottom() // Scroll to bottom after receiving AI response
        } catch (error) {
            console.error('Error sending message:', error)
        }
    }

    const handleBack = () => {
        navigate('/dashboard')
    }

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Chat {id ? `#${id}` : ''}</h1>
                <Button onClick={handleBack}>Back to Dashboard</Button>
            </div>
            <Card className="h-[calc(100vh-12rem)] flex flex-col relative">
                <CardHeader>
                    <CardTitle>Chat with AI</CardTitle>
                </CardHeader>
                <CardContent
                    ref={cardContentRef}
                    onScroll={handleScroll} // Track scrolling
                    className="overflow-y-auto flex-grow p-4"
                >
                    {messages.map((message, index) => (
                        <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                            <div
                                className={`inline-block p-3 rounded-lg ${
                                    message.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                }`}
                            >
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                            <div
                                className={`text-xs mt-1 ${
                                    message.role === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                                }`}
                            >
                                {new Date(message.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="p-4">
                    <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow"
                        />
                        <Button type="submit">Send</Button>
                    </form>
                </CardFooter>
                {/* Scroll to Bottom Button */}
                {isScrolledUp && (
                    <Button
                        onClick={scrollToBottom}
                        className="fixed bottom-20 right-8 bg-primary text-white rounded-full shadow-lg p-2"
                        aria-label="Scroll to bottom"
                    >
                        ↓
                    </Button>
                )}
            </Card>
        </Layout>
    )
}
