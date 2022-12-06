
const Books = ({book}) => {

    return (
        <div className="book">
            <h2>Title: {book.title}</h2>
            <h3>Author: {book.author}</h3>
            <h3>ID: {book.id}</h3>

        </div>
    );
}
 
export default Books
