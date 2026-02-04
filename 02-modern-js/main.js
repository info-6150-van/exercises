/**
 * Main entry point for the library management system
 * Demonstrates ES6 modules, async operations, and coordination of different modules
 */

import { books, filterBooksByStatus, groupBooksByGenre, bookTitleGenerator, createBookSummary } from './data.js';
import libraryManager, { LibraryManager, createBookFormatter, memoize } from './library.js';
import { displayStatistics, displayBooks, displaySearchResults, showBookAnalysis, formatAvailability } from './ui.js';

/**
 * TODO: Implement main application function and variable scoping demonstration
 * runLibraryDemo(): Coordinate all modules, handle null default export, show library features
 * demonstrateScoping(): Show let/const behavior, block scoping, temporal dead zone awareness
 */
async function runLibraryDemo() {
    console.log(' Starting Library Management System Demo');
    console.log('='.repeat(50));

    try {
        // Handle case where default export might be null
        const library = libraryManager ?? new LibraryManager(books);

        demonstrateScoping();

        displayStatistics(library.getStatistics());

        const availableBooks = filterBooksByStatus(library.books, 'available');
        displayBooks('Available Books', availableBooks);

        const searchResults = library.searchBooks({ author: 'john' });
        displaySearchResults(searchResults);

        const formatter = createBookFormatter(createBookSummary);
        const memoizedFormatter = memoize(formatter);
        showBookAnalysis(memoizedFormatter(library.books));

        demonstrateErrorHandling(library);
        showGeneratorExample();

        const booksByGenre = groupBooksByGenre(library.books);
        console.log('\n Books Grouped by Genre:', booksByGenre);
        
    } catch (error) {
        console.error('Application error:', error.message);
    } finally {
        console.log('\n Demo completed!');
    }
}

function demonstrateScoping() {
    console.log('\n === VARIABLE SCOPING DEMO ===');
    const appName = 'Library App';
    let counter = 0;

    if (true) {
        let counter = 10; 
        const blockOnly = 'Inside block';
        console.log('Block counter:', counter);
        console.log(blockOnly);

        }

    counter++;
    console.log('Outer counter:', counter);
    console.log('App name:', appName);

    console.log('Temporal Dead Zone exists before let/const declarations');
    
}

/**
 * TODO: Implement error handling and generator demonstrations  
 * demonstrateErrorHandling(library): Show try/catch, optional chaining, nullish coalescing
 * showGeneratorExample(): Use bookTitleGenerator to iterate through titles
 */
function demonstrateErrorHandling(library) {
    console.log('\n  === ERROR HANDLING DEMO ===');
   
    try {
        const unknownBooks = library?.nonExistentProperty ?? [];
        console.log('Safe fallback length:', unknownBooks.length);

        const status = library.books[0]?.availability?.status ?? 'unknown';
        console.log('First book status:', formatAvailability(status));

    } catch (err) {
        console.error('Handled error:', err.message);
    }
}


function showGeneratorExample() {
    console.log('\n === GENERATOR DEMO ===');

    const generator = bookTitleGenerator(books);
    for (const title of generator) {
        console.log('', title);
    }
}

/**
 * TODO: Start the application and demonstrate array destructuring
 * Call runLibraryDemo() when module loads
 * Show destructuring with first book, second book, and rest pattern
 */
// Start application and show destructuring example
console.log('\n === DESTRUCTURING DEMO ===');
const [firstBook, secondBook, ...remainingBooks] = books;

console.log('First book:', firstBook?.title);
console.log('Second book:', secondBook?.title);
console.log('Remaining count:', remainingBooks.length);

runLibraryDemo();