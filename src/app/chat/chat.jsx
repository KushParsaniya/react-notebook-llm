'use client'

import { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function ChatPage() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!input.trim()) return

        const newMessage = { role: 'user', content: input }
        setMessages([...messages, newMessage])
        setInput('')

        // TODO: Send message to backend and get AI response
        // This is a placeholder for demonstration
        setTimeout(() => {
            const aiResponse = { role: 'assistant', content: 'This is a placeholder response from the AI.' }
            setMessages((prevMessages) => [...prevMessages, aiResponse])
        }, 1000)
    }

    return (
        <Layout>
            <Card className="h-[calc(100vh-12rem)]">
                <CardHeader>
                    <CardTitle>Chat with AI</CardTitle>
                </CardHeader>
                <CardContent className="overflow-y-auto flex-grow">
                    {messages.map((message, index) => (
                        <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {message.content}
              </span>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
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
            </Card>
        </Layout>
    )
}

