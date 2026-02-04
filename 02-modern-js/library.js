/**
 * Library management module demonstrating modern JavaScript features
 */

import { books, categoryDescriptions, uniqueAuthors, filterBooksByStatus, groupBooksByGenre } from './data.js';

/**
 * LibraryManager class demonstrating modern JavaScript class features
 */
export class LibraryManager {
    #statistics = {}; // Private field for storing statistics

    constructor(initialBooks = []) {
        this.books = [...initialBooks]; // Shallow copy using spread
        this.#updateStatistics();
    }

    /**
     * TODO: Implement addBooks method using rest parameters and search functionality
     * addBooks(...newBooks): Add multiple books using spread operator, update statistics
     * searchBooks({title, author, genre} = {}, caseSensitive = false): Search with destructuring and optional chaining
     */
    addBooks(...newBooks) { 
        this.books.push(...newBooks);
        this.#updateStatistics();
    }

    searchBooks({ title, author, genre } = {}, caseSensitive = false) {return this.books.filter(book => {
            const normalize = value =>
                caseSensitive ? value : value?.toLowerCase();

            return (
                (!title ||
                    normalize(book.title)?.includes(normalize(title))) &&
                (!author ||
                    normalize(book.author)?.includes(normalize(author))) &&
                (!genre ||
                    normalize(book.genre)?.includes(normalize(genre)))
            );
        }); 
    }

    /**
     * TODO: Implement getStatistics and updateBook methods
     * getStatistics(): Return computed statistics object with total, available, checked out counts
     * updateBook(book, updates): Use logical assignment operators (??=, ||=, &&=)
     */
    getStatistics() {return {
            total: this.#statistics.total,
            available: this.#statistics.available,
            checkedOut: this.#statistics.checkedOut
        };
    }

    updateBook(book, updates) {if (!this.books.includes(book)) return;

        for (const [key, value] of Object.entries(updates)) {
            book[key] ??= value;   
            book[key] ||= value;   
            book[key] &&= value;   
        }

        this.#updateStatistics();
    }

    /**
     * TODO: Implement higher-order functions and memoization
     * createBookFormatter(formatter): Return function that applies formatter to book arrays
     * memoize(fn): Use Map to cache function results
     */
    #updateStatistics() {
        this.#statistics = {
            total: this.books.length,
            available: this.books.filter(
                book => book.availability?.status === 'available'
            ).length,
            checkedOut: this.books.filter(
                book => book.availability?.status === 'checked_out'
            ).length
        };
    }
}

export const createBookFormatter = (formatter) => {
    return (books = []) => books.map(formatter);
};

export const memoize = (fn) => {const cache = new Map();

    return (...args) => {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

export default new LibraryManager(books);