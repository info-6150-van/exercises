/**
 * Main entry point for the Library Management System
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
    console.log('='.repeat(60));

    try {
        // Handle case where default export might be null
        const library = libraryManager || new LibraryManager(books);

        demonstrateScoping();
        demonstrateDestructuring();

        console.log('\n Library Statistics:');
        displayStatistics(library.getStatistics());

        console.log('\n Filtered Books (Available):');
        const availableBooks = filterBooksByStatus(library.books, 'available');
        displayBooks(availableBooks);

        console.log('\n Books Grouped by Genre:');
        const grouped = groupBooksByGenre(library.books);
        showBookAnalysis(grouped);

        console.log('\n Search Results (Programming books):');
        const searchResults = library.searchBooks({ genre: 'Programming' });
        displaySearchResults(searchResults);

        console.log('\n🔄 Generator Example (Book Titles):');
        showGeneratorExample();

        console.log('\n⚙️  Error Handling Demo:');
        demonstrateErrorHandling(library);

        console.log('\n🎨 Book Formatting Example:');
        const formatter = createBookFormatter(createBookSummary);
        displayBooks(formatter(library.books));

        // Demonstrate memoization
        console.log('\n💾 Memoization Demo:');
        const memoizedSearch = memoize(library.searchBooks.bind(library));
        const firstSearch = memoizedSearch({ genre: 'Programming' });
        const secondSearch = memoizedSearch({ genre: 'Programming' }); // Cached
        console.log('Memoized search results count:', firstSearch.length);

    } catch (error) {
        console.error('Application error:', error?.message ?? error);
    } finally {
        console.log('\n Demo completed!');
        console.log('='.repeat(60));
    }
}

/**
 * TODO: Implement variable scoping demonstration
 */
function demonstrateScoping() {
    console.log('\n🔍 === VARIABLE SCOPING DEMO ===');
    // Show const/let behavior, block scoping, temporal dead zone
    
    const globalConst = 'I am constant';
    let globalLet = 'I can change';

    {
        // Block scope demonstration
        let blockLet = 'Block scoped let';
        const blockConst = 'Block scoped const';
        console.log('Inside block:', blockLet, blockConst);
        
        // This would throw error: globalConst = 'try change';
        globalLet = 'Updated global let inside block';
    }

    // console.log(blockLet); // This would throw ReferenceError
    console.log('Outside block:', globalConst, globalLet);
}

/**
 * Demonstrate destructuring with rest pattern
 */
function demonstrateDestructuring() {
    console.log('\n === DESTRUCTURING DEMO ===');
    const [firstBook, secondBook, ...remainingBooks] = books;
    console.log('First Book:', firstBook.title);
    console.log('Second Book:', secondBook.title);
    console.log('Remaining Books Count:', remainingBooks.length);
    console.log('Third Book from remaining:', remainingBooks[0]?.title);
}

/**
 * TODO: Implement error handling and generator demonstrations  
 * demonstrateErrorHandling(library): Show try/catch, optional chaining, nullish coalescing
 * showGeneratorExample(): Use bookTitleGenerator to iterate through titles
 */
function demonstrateErrorHandling(library) {
    console.log('\n  === ERROR HANDLING DEMO ===');
    // Test safe property access, array methods on potentially undefined values
    
    // Optional chaining and nullish coalescing
    const bookWithAvailability = library.books[2]?.availability?.status ?? 'Unknown status';
    console.log('Third book availability status:', bookWithAvailability);

    // Safe array method on potentially undefined
    const undefinedArray = undefined;
    const safeLength = undefinedArray?.length ?? 0;
    console.log('Safe array length:', safeLength);

    // Try-catch example
    try {
        const undefinedFunction = null;
        undefinedFunction?.(); // Safe function call
        // This would throw: undefinedFunction();
    } catch (err) {
        console.error('Caught error:', err.message);
    }

    // Nullish coalescing with default values
    const userSettings = { theme: null };
    const theme = userSettings.theme ?? 'default-theme';
    console.log('Theme with nullish coalescing:', theme);
}

function showGeneratorExample() {
    console.log('\n === GENERATOR DEMO ===');
    // Use bookTitleGenerator and show iteration
    const generator = bookTitleGenerator(books);
    
    console.log('Book titles from generator:');
    for (const title of generator) {
        console.log('  ', title);
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
console.log('First Book:', firstBook?.title);
console.log('Second Book:', secondBook?.title);
console.log('Remaining Books:', remainingBooks.length);

// Start the main demo
runLibraryDemo();
