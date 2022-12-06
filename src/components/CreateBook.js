import { 
    collection, addDoc, serverTimestamp
} from 'firebase/firestore'
import { useState } from "react"
import { db } from "../firebase"


const CreateBook = () => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [createdAt, setTimestamp] = useState("")

    const handleCreate = async(e) => {
        e.preventDefault()
        setTimestamp(serverTimestamp())
        //collection ref
        const colRef = collection(db, "books")

        //add book to db
        let book = {
            title, 
            author, 
            createdAt
        }

        try {
            await addDoc(colRef, book)

            setTitle("")
            setAuthor("")

        } catch (err) {
            console.log(err.message)
        }

    }
    return (
        <div className="create-book">
            <form onSubmit={handleCreate}>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text"
                    name="title"
                    value={title} 
                    required
                    onChange={(e) => {setTitle(e.target.value)}}
                    />
                <label htmlFor="author">Author:</label>
                <input 
                    type="text"
                    name="author" 
                    required
                    value={author}
                    onChange={(e) => {setAuthor(e.target.value)}}
                    />
                <button>add a new book</button>
            </form>
        </div>
    );
}
 
export default CreateBook
