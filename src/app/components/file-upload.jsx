'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function FileUpload({ onUpload }) {
    const [file, setFile] = useState(null)

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = async () => {
        if (!file) return

        // TODO: Implement file upload logic here
        console.log('Uploading file:', file)

        // Call the onUpload callback with the uploaded file
        onUpload(file)

        // Reset the file input
        setFile(null)
    }

    return (
        <div className="flex items-center space-x-2">
            <Input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="flex-grow"
            />
            <Button onClick={handleUpload} disabled={!file}>
                Upload
            </Button>
        </div>
    )
}

