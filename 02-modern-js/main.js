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
    console.log('🚀 Starting Library Management System Demo');
    console.log('='.repeat(50));

    try {
        // Handle case where default export might be null
        const library = libraryManager || new LibraryManager(books);

        demonstrateScoping();

        // Display library statistics and demonstrate book operations

        displayStatistics(library.getStatistics());
        displayBooks(library.books); 

        // Show filtering, grouping, search, and analysis features

        const filteredBooks = filterBooksByStatus(library.books, 'available');
        displaySearchResults(filteredBooks);
        showBookAnalysis(library.books);

    } catch (error) {
        console.error('Application error:', error.message);
    } finally {
        console.log('\n✅ Demo completed!');
    }
}

function demonstrateScoping() {
    console.log('\n🔍 === VARIABLE SCOPING DEMO ===');
    // Show const/let behavior, block scoping, temporal dead zone
    {
        let blockScoped = 'I am block scoped';
        const constantValue = 'I cannot be reassigned';
        console.log(blockScoped);
        console.log(constantValue);
        
    }
}

/**
 * TODO: Implement error handling and generator demonstrations  
 * demonstrateErrorHandling(library): Show try/catch, optional chaining, nullish coalescing
 * showGeneratorExample(): Use bookTitleGenerator to iterate through titles
 */
function demonstrateErrorHandling(library) {
    console.log('\n⚠️  === ERROR HANDLING DEMO ===');
    // Test safe property access, array methods on potentially undefined values
    try {
        const unavailableBooks = filterBooksByStatus(library.books, 'unavailable');
        displaySearchResults(unavailableBooks);
    } catch (error) {
        console.error('Error during filtering:', error.message);
    }   
}

function showGeneratorExample() {
    console.log('\n🔄 === GENERATOR DEMO ===');
    // Use bookTitleGenerator and show iteration
    const titleGen = bookTitleGenerator(books);
    for (const title of titleGen) {
        console.log('Book Title:', title);
    }   
}

/**
 * TODO: Start the application and demonstrate array destructuring
 * Call runLibraryDemo() when module loads
 * Show destructuring with first book, second book, and rest pattern
 */
// Start application and show destructuring example
console.log('\n📖 === DESTRUCTURING DEMO ===');
const [firstBook, secondBook, ...remainingBooks] = books;
// Display destructured results
console.log('First Book:', firstBook);
console.log('Second Book:', secondBook);
console.log('Remaining Books:', remainingBooks);    

runLibraryDemo();