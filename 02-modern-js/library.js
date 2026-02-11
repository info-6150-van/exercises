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
        // Add books using spread operator and update statistics
        this.books.push(...newBooks);
        this.#updateStatistics();
    }

    searchBooks({ title, author, genre } = {}, caseSensitive = false) {
        // Implement search logic with destructuring and optional chaining
        return this.books.filter(book => {
            const matchesTitle = title ? (caseSensitive ? book.title === title : book.title.toLowerCase() === title.toLowerCase()) : true;
            const matchesAuthor = author ? (caseSensitive ? book.author === author : book.author.toLowerCase() === author.toLowerCase()) : true;
            const matchesGenre = genre ? (caseSensitive ? book.genre === genre : book.genre.toLowerCase() === genre.toLowerCase()) : true;
            return matchesTitle && matchesAuthor && matchesGenre;
        });
    }

    /**
     * TODO: Implement getStatistics and updateBook methods
     * getStatistics(): Return computed statistics object with total, available, checked out counts
     * updateBook(book, updates): Use logical assignment operators (??=, ||=, &&=)
     */
    getStatistics() {
        // Return statistics with computed property names
        return {
            ['total']: this.books.length,
            ['available']: this.books.filter(book => book.availability?.status === 'available').length,
            ['checkedOut']: this.books.filter(book => book.availability?.status === 'checked_out').length
        };  
    }

    updateBook(book, updates) {
        // Use logical assignment operators to update book properties
        const index = this.books.findIndex(b => b.id === book.id);
        if (index !== -1) {
            this.books[index] = { ...this.books[index], ...updates };
            this.#updateStatistics();
        }   
    }

    /**
     * TODO: Implement higher-order functions and memoization
     * createBookFormatter(formatter): Return function that applies formatter to book arrays
     * memoize(fn): Use Map to cache function results
     */
    #updateStatistics() {
        // Calculate statistics and store in private field
        this.#statistics = {
            total: this.books.length,
            available: this.books.filter(book => book.availability?.status === 'available').length,
            checkedOut: this.books.filter(book => book.availability?.status === 'checked_out').length
        };
    }
}

export const createBookFormatter = (formatter) => {
    // Return function that applies formatter to book arrays
    return (bookArray) => bookArray.map(formatter); 
};

export const memoize = (fn) => {
    // Use Map to cache expensive function results
    const cache = new Map();
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

// Export default library instance
export default new LibraryManager(books);