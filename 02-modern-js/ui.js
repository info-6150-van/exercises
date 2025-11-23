/**
 * UI utilities module demonstrating template literals, destructuring, and modern JS
 */

/**
 * TODO: Implement display functions using destructuring and template literals
 * displayStatistics(statistics): Extract properties with destructuring, format with template literals
 * displayBooks(books, title): Show formatted book list, use optional chaining for availability
 */
export function displayStatistics(statistics) {
    // Use destructuring to extract statistics properties
    const { total, available, checkedOut } = statistics;
    
    // Use template literals for formatted console output
    console.log(`
    Library Statistics:
   Total Books: ${total}
   Available: ${available}
   Checked Out: ${checkedOut}
   Availability Rate: ${((available / total) * 100).toFixed(1)}%
`);
}

export function displayBooks(books, title = "Books") {
    // Display books with formatted output using template literals
    // Handle undefined availability with optional chaining
    console.log(`\n ${title} (${books.length}):`);
    
    if (books.length === 0) {
        console.log('   No books found');
        return;
    }
    
    books.forEach((book, index) => {
        const status = book.availability?.status ?? 'unknown';
        const location = book.availability?.location ?? 'N/A';
        const dueDate = book.availability?.dueDate ?? 'N/A';
        
        console.log(`
   ${index + 1}. ${book.title}
      Author: ${book.author}
      Year: ${book.year}
      Genre: ${book.genre}
      Status: ${status}
      ${status === 'available' ? `Location: ${location}` : `Due: ${dueDate}`}
`);
    });
}

/**
 * TODO: Implement search results and availability formatting
 * displaySearchResults(results, criteria): Show search results with dynamic title
 * formatAvailability(availability): Return formatted status string with optional chaining
 */
export function displaySearchResults(searchResults, searchCriteria) {
    // Use destructuring for search criteria
    const { title, author, genre } = searchCriteria || {};
    
    // Create dynamic title with template literals
    const criteriaParts = [];
    if (title) criteriaParts.push(`Title: "${title}"`);
    if (author) criteriaParts.push(`Author: "${author}"`);
    if (genre) criteriaParts.push(`Genre: "${genre}"`);
    
    const criteriaText = criteriaParts.length > 0 ? criteriaParts.join(', ') : 'All books';
    
    console.log(`\n Search Results for ${criteriaText}:`);
    displayBooks(searchResults, `Search Results (${searchResults.length} found)`);
}

export function formatAvailability(availability) {
    // Using optional chaining and nullish coalescing
    const status = availability?.status ?? 'unknown';
    const location = availability?.location;
    const dueDate = availability?.dueDate;
    
    // Return formatted status with appropriate symbols
    switch (status) {
        case 'available':
            return `Available${location ? ` at ${location}` : ''}`;
        case 'checked_out':
            return `Checked Out${dueDate ? `, due ${dueDate}` : ''}`;
        default:
            return `Availability unknown`;
    }
}

/**
 * TODO: Create analysis function demonstrating array methods
 * showBookAnalysis(books): Use map, filter, reduce to show insights
 * Calculate most common decade, genre distribution, etc.
 */
export function showBookAnalysis(books) {
    console.log('\n === BOOK ANALYSIS ===');
    
    if (!books || books.size === 0) {
        console.log('No data to analyze');
        return;
    }
    
    // Convert Map to array if needed
    const booksArray = books instanceof Map ? 
        Array.from(books.values()).flat() : 
        books;
    
    // Using modern array methods to analyze the book collection
    
    // Genre distribution using reduce
    const genreDistribution = booksArray.reduce((acc, book) => {
        acc[book.genre] = (acc[book.genre] || 0) + 1;
        return acc;
    }, {});
    
    console.log('\n Genre Distribution:');
    Object.entries(genreDistribution).forEach(([genre, count]) => {
        console.log(`   ${genre}: ${count} book${count !== 1 ? 's' : ''}`);
    });
    
    // Publication decades using map and reduce
    const decadeDistribution = booksArray
        .map(book => Math.floor(book.year / 10) * 10)
        .reduce((acc, decade) => {
            acc[decade] = (acc[decade] || 0) + 1;
            return acc;
        }, {});
    
    console.log('\n Publication Decades:');
    Object.entries(decadeDistribution)
        .sort(([a], [b]) => a - b)
        .forEach(([decade, count]) => {
            console.log(`   ${decade}s: ${count} book${count !== 1 ? 's' : ''}`);
        });
    
    // Author statistics using filter and map
    const uniqueAuthors = [...new Set(booksArray.map(book => book.author))];
    console.log(`\n Unique Authors: ${uniqueAuthors.length}`);
    
    // Average publication year using reduce
    const currentYear = new Date().getFullYear();
    const averageYear = booksArray.reduce((sum, book) => sum + book.year, 0) / booksArray.length;
    const averageAge = currentYear - averageYear;
    
    console.log(`\n Collection Overview:`);
    console.log(`   Average Publication Year: ${Math.round(averageYear)}`);
    console.log(`   Average Book Age: ${Math.round(averageAge)} years`);
    console.log(`   Total Books Analyzed: ${booksArray.length}`);
    
    // Most recent book using reduce
    const mostRecent = booksArray.reduce((latest, book) => 
        book.year > latest.year ? book : latest
    );
    console.log(`\n Most Recent Book: "${mostRecent.title}" (${mostRecent.year})`);
}
