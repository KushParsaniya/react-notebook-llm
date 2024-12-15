import {Link, useNavigate} from "react-router-dom";
import {Button} from "../../components/ui/button"
import LocalStorageService from "@/service/LocalStorageService.js";

export default function Layout({ children }) {

    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login')
        LocalStorageService.removeAllItems()
    }

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-primary text-primary-foreground p-4">
                <nav className="container mx-auto flex justify-between items-center">
                    <Link to="/dashboard" className="text-2xl font-bold">
                        Notebook LLM
                    </Link>
                    <div className="space-x-4">
                        <Button variant="ghost" asChild>
                            <Link to="/dashboard">Dashboard</Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link to="/chat">New Chat</Link>
                        </Button>
                        <Button variant="ghost" onClick={handleLogout}>Logout</Button>
                    </div>
                </nav>
            </header>
            <main className="flex-grow container mx-auto p-4">
                {children}
            </main>
            <footer className="bg-muted p-4 text-center">
                <p>&copy; 2024 Notebook LLM. All rights reserved.</p>
            </footer>
        </div>
    )
}

