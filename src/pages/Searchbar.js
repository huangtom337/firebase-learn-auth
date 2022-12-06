import { useState } from "react";
import {
    query, where, collection, onSnapshot, orderBy
} from 'firebase/firestore'
import { db } from "../firebase"

const Searchbar = () => {
    const [searchAuthor, setSearchAuthor] = useState("")
    const [queriedAuthors, setAuthors] = useState(null)
    const [error, setError] = useState("")

    const handleSearch = () => {
        //queries
        const colRef = collection(db, 'books')
        const q = query(colRef, where("author", "==", `${searchAuthor}`), orderBy('createdAt'))
        const unsubscribe = onSnapshot(q, snapshot => {
            let fetchedAuthors = []
            snapshot.docs.forEach(doc => {
                fetchedAuthors = [...fetchedAuthors, {...doc.data(), id: doc.id}]
            })
           
            setAuthors(fetchedAuthors)
            
            if (fetchedAuthors.length === 0) {
                setError("None found")
            } else {
                setError("")
            }
        })

        return () => unsubscribe
    }

    return (

        <div className="search-bar">
            <input 
                type="search" 
                placeholder="Search Author here"
                onChange={(e) => {setSearchAuthor(e.target.value)}}
                value={searchAuthor}
                required={true}
                />
            <button onClick={handleSearch}>Search</button>

            <div className="queries">
                {queriedAuthors && 
                    queriedAuthors.map(queriedAuthor => {
                    return (<div className="queriedAuthor" key={queriedAuthor.id}>
                        <h2>Title: {queriedAuthor.title}</h2>
                        <h3>Author: {queriedAuthor.author}</h3>
                        <h3>ID: {queriedAuthor.id}</h3>
                    </div>)
                    })
                }
                    
                {error && <div className='error'>{error}</div>}
               
            </div>
        </div>
    );
}
 
export default Searchbar;