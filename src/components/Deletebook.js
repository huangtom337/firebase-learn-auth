import { 
    deleteDoc, doc
} from 'firebase/firestore'
import { db } from "../firebase"

const DeleteBook = ({book}) => {

    const handleDelete = async() => {
        const docRef = doc(db, 'books', book.id)
        
        await deleteDoc(docRef)
    }
    return (
        <button onClick={handleDelete}> Delete </button>
    );
}
 
export default DeleteBook;