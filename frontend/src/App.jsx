import Books from "./pages/Books";

export default function App() {
    console.log("APP RENDERED");
    
    return (
        <div className="container">
            <h1>📚 AI Reading Companion</h1>
            <p className="subtitle">
                Track your reading and manage your book collection
            </p>
            <Books />
        </div>
    );
}

