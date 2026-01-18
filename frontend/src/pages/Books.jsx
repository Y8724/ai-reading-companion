import { useEffect, useState } from "react";
import axios from "axios";
import { IS_ADMIN, ADMIN_TOKEN } from "../config/admin";

const API_URL = "http://127.0.0.1:8000/books/";


const authConfig = ADMIN_TOKEN
    ? {
        headers: {
            Authorization: `Bearer ${ADMIN_TOKEN}`,
            "Content-type": "application/json",
        },
    }
    : null;

export default function Books() {
    console.log("IS_ADMIN", IS_ADMIN);
    console.log("BOOKS COMPONENT WORKS")

    const [books, setBooks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        title: "",
        author: "",
        notes: "",
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    // Fetch all books (public)
    const fetchBooks = async () => {
        try {
            const res = await axios.get(API_URL);
            setBooks(res.data);
        } catch (err) {
            console.error("Failed to load books", err);
        }
    };

        //Start editing a book
    const startEdit = (book) => {
        setEditingId(book.id);
        setForm({
            title: book.title || "",
            author: book.author || "",
            notes: book.notes || "",
        });
    };

        //create or update
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!authConfig) {
            alert("Admin token missing");
            return;
        }
        
        try {
            if (editingId) {
                //update
                await axios.put(`${API_URL}${editingId}/`, form, authConfig);
            } else {
                //create
                await axios.post(API_URL, form, authConfig);
            }

            setForm({ title: "", author: "", notes: "" });
            setEditingId(null);
            fetchBooks();
        } catch (err) {
        console.error("Save failed", err);
        alert("Action failed (check token / backend");
        }
    };

        //delete book (admin)
    const handleDelete = async (id) => {
        if (!authConfig) {
            alert("Admin token missing");
            return;
        }

        try {
            await axios.delete(
                `${API_URL}${id}/`, authConfig);
            fetchBooks();
        } catch (err) {
            console.error("Delete failed", err);
            alert("Delete failed");
        }
    };
    
    //render
    return (
        <div className="container">

            {/* ADMIN only */}
            {IS_ADMIN && (
                <div className="card">
                    <h2>{ editingId ? "Edit book" : "Add New Book"}</h2>

                    <form className="book-form" onSubmit={handleSubmit}>
                        <h2>Add Book</h2>
                        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value})} required/>
                        <input placeholder="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value})} required/>
                        <textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value})}></textarea>
                        <button type="submit">{ editingId ? "Update Book" : "Add Book"}</button>

                        {editingId && (
                            <button type="button" onClick={() => {
                                setEditingId(null);
                                setForm({ title: "", author: "", notes: "" });
                            }}>Cancel</button>
                        )}
                    </form>
                </div>
            )}

            <h2>My Books</h2>

            {books.map((book) => (
                <div className="card" key={book.id} style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, marginBottom: 16, }}>
                    <div className="book-card">
                        <h3>{book.title}</h3>
                        
                        {book.author && (
                            <p><strong>Author:</strong> {book.author}</p>
                        )}

                        {/* Show AI summary if exist, otherwise notes */}
                        {book.ai_summary ? (
                            <p><strong>AI Sumary:</strong>{book.ai_summary}</p>
                        ) : (
                            <p>{book.notes}</p>
                        )}
                    
                    

                        {/* ADMIN ACTIONS */}
                        {IS_ADMIN && (
                            <div className="actions">
                                <button onClick={() => startEdit(book)}>Edit</button>

                                <button className="danger" onClick={() => handleDelete(book.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
} 
