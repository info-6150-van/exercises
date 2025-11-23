/**
 * Library management module demonstrating modern JavaScript features
 */

import { books, categoryDescriptions, uniqueAuthors, filterBooksByStatus, groupBooksByGenre, createBookSummary } from './data.js';

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
            const match = (field, value) => {
                if (!value || !field) return true;
                return caseSensitive
                    ? field.includes(value)
                    : field.toLowerCase().includes(value.toLowerCase());
            };

            return (
                match(book.title, title) &&
                match(book.author, author) &&
                match(book.genre, genre)
            );
        });
    }

    /**
     * TODO: Implement getStatistics and updateBook methods
     * getStatistics(): Return computed statistics object with total, available, checked out counts
     * updateBook(book, updates): Use logical assignment operators (??=, ||=, &&=)
     */
    getStatistics() {
        // Return statistics with computed property names
        return { ...this.#statistics };
    }

    updateBook(book, updates) {
        // Use logical assignment operators to update book properties
        Object.entries(updates).forEach(([key, value]) => {
            if (value !== undefined) {
                book[key] ??= value; // Assign if undefined
            }
        });

        if (updates.availability) {
            book.availability ||= {};
            Object.entries(updates.availability).forEach(([k, v]) => {
                book.availability[k] ??= v;
            });
        }

        this.#updateStatistics();
        return book;
    }

    /**
     * TODO: Implement higher-order functions and memoization
     * createBookFormatter(formatter): Return function that applies formatter to book arrays
     * memoize(fn): Use Map to cache function results
     */
    #updateStatistics() {
        // Calculate statistics and store in private field
        const total = this.books.length;
        const available = this.books.filter(book => book.availability?.status === 'available').length;
        const checkedOut = this.books.filter(book => book.availability?.status === 'checked_out').length;

        this.#statistics = { total, available, checkedOut };
    }
}

// ----------------------
// Higher-order function to format books
export const createBookFormatter = (formatter) => {
    // Return function that applies formatter to book arrays
    return (bookArray) => bookArray.map(book => formatter(book));
};

// ----------------------
// Memoization function using Map
export const memoize = (fn) => {
    // Use Map to cache expensive function results
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (!cache.has(key)) {
            const result = fn(...args);
            cache.set(key, result);
        }
        return cache.get(key);
    };
};

// ----------------------
// Default library instance
export default new LibraryManager(books);
