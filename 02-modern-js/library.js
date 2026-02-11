import { books } from "./data.js";

export class LibraryManager {
    #statistics = {};

    constructor(initialBooks = []){
        this.books = [...initialBooks];
        this.#updateStatistics();
    }

    addBooks(...newBooks){
        this.books.push(...newBooks);
        this.#updateStatistics();
    }

    searchBooks({title, author, genre} = {}, caseSensitive = false){
        return this.books.filter(book => {
            const bookTitle = book.title ?? '';
            const bookAuthor = book.author ?? '';
            const bookGenre = book.genre ?? '';

            const titleMatch = title
                ? caseSensitive
                    ? bookTitle.includes(title)
                    : bookTitle.toLowerCase().includes(title.toLowerCase())
                : true;

           const authorMatch = author
                ? caseSensitive
                    ? bookAuthor.includes(author)
                    : bookAuthor.toLowerCase().includes(author.toLowerCase())
                : true;     

            const genreMatch = genre
                ? caseSensitive
                    ? bookGenre.includes(genre)
                    : bookGenre.toLowerCase().includes(genre.toLowerCase())
                : true;    

        return titleMatch && authorMatch && genreMatch;        
        });
    }

    getStatistics(){
        return{
            total: this.books.length,
            available: this.books.filter(book => book.availability?.status === 'available').length,
            checkedOut: this.books.filter(book => book.availability?.status === 'checked_out').length
        };
    }

    updateBook(book, updates) {
        book.title ||= updates.title;
        book.author ||= updates.author;
        book.genre ||= updates.genre;
        book.year ??= updates.year;
        book.availability ||= updates.availability;

        this.#updateStatistics();
    }

    #updateStatistics(){
        this.#statistics ={
            total: this.books.length,
            available: this.books.filter(book => book.availability?.status === 'available').length,
            checkedOut: this.books.filter(book => book.availability?.status === 'checked_out').length
        };
    }
}

export const createBookFormatter = (formatter) => {
    return (bookArray) => bookArray.map(formatter);
};

export const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

export default new LibraryManager(books);
