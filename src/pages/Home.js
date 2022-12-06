import { useEffect, useState } from "react";
import Books from "../components/Books";
import CreateBook from "../components/CreateBook"
import { 
    collection, onSnapshot, orderBy, query
} from 'firebase/firestore'
import { db } from "../firebase"
import DeleteBook from "../components/Deletebook";

const Home = () => {
    const [books, setBooks] = useState(null)

    useEffect(() => {
        const colRef = collection(db, "books")
        const q = query(colRef, orderBy('createdAt'))
        //real time data collection
        const unsubscribe = onSnapshot(q, (snapshot) => {
            //new fetch every snapshot. resets previously fetched books
            let fetchedBooks = []
            snapshot.docs.forEach(doc => {
                //parse result into data we need
                fetchedBooks = [...fetchedBooks, { ...doc.data(), id: doc.id}]
            })
            setBooks(fetchedBooks)
            
            //detect changes
            // snapshot.docChanges().forEach((change) => {
            //     if (change.type === "added") {
            //         console.log("New city: ", change.doc.data());
            //         console.log(books)
            //     }
            //     if (change.type === "modified") {
            //         console.log("Modified city: ", change.doc.data());
            //     }
            //     if (change.type === "removed") {
            //         console.log(books)
            //         console.log("Removed city: ", change.doc.data());
            //     }
            // })
        
        
        })
        
        return () => unsubscribe()
    }, [])


    return (
        <div className="home">
            <div className="books">
                {books && books.map(book => (
                    [
                        <Books book={book} key={book.id}/>,
                        <DeleteBook book={book} key={"deleteButton"}/>   
                    ]
                ))}
                
            </div>
            
            <CreateBook />
        </div>
    );
}
 
export default Home;