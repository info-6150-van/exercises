import { books, filterBooksByStatus, groupBooksByGenre, bookTitleGenerator, createBookSummary } from './data.js';
import libraryManager, { LibraryManager, createBookFormatter, memoize } from './library.js';
import { displayStatistics, displayBooks, displaySearchResults, showBookAnalysis, formatAvailability } from './ui.js';



async function runLibraryDemo() {
    console.log('Starting Library Management System Demo');
    console.log('='.repeat(50));

    try {
        const library = libraryManager || new LibraryManager(books);

        demonstrateScoping();

    
        const stats = library.getStatistics();
        displayStatistics(stats);

       
        displayBooks(library.books, "All Library Books");

      
        const availableBooks = filterBooksByStatus(library.books, "available");
        displayBooks(availableBooks, "Available Books");

  const grouped = groupBooksByGenre(library.books);
        console.log('\n === GROUPED BY GENRE ===');
        for (const [genre, books] of grouped.entries()) {
            console.log(`${genre}: ${books.length} book(s)`);
        }

        
        const results = library.searchBooks({ author: "Robert" });
        displaySearchResults(results, { author: "Robert" });
        
        showGeneratorExample();
      
        demonstrateErrorHandling(library);

        showBookAnalysis(library.books);
        } catch (error) {
        console.error('Application error:', error.message);
    } finally {
        console.log('\n Demo completed!');
    }
}

function demonstrateScoping() {
    console.log('\n === VARIABLE SCOPING DEMO ===');

    const constantValue = "I cannot change";
    let changingValue = "I can change";

    if (true) {
        let blockScoped = "Inside block";
        console.log(`Block scoped variable: ${blockScoped}`);
    }

    changingValue = "I changed!";
    console.log(`Const value: ${constantValue}`);
    console.log(`Let value: ${changingValue}`);
}

function demonstrateErrorHandling(library) {
    console.log('\n === ERROR HANDLING DEMO ===');

    try {
        const maybeBook = library.books[100];
        const title = maybeBook?.title ?? "Unknown Book";
        console.log(`Safe access title: ${title}`);

        const safeArray = library.books ?? [];
        console.log(`Safe array length: ${safeArray.length}`);

    } catch (error) {
        console.error("Handled error:", error.message);
    }
}

function showGeneratorExample() {
    console.log('\n === GENERATOR DEMO ===');

    const generator = bookTitleGenerator(books);
    for (const title of generator) {
        console.log(`Generated title: ${title}`);
    }
}

console.log('\n === DESTRUCTURING DEMO ===');
const [firstBook, secondBook, ...remainingBooks] = books;

console.log(`First book: ${firstBook.title}`);
console.log(`Second book: ${secondBook.title}`);
console.log(`Remaining books count: ${remainingBooks.length}`);


runLibraryDemo();
