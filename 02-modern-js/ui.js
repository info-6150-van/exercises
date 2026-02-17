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
    // Use template literals for formatted console output
    const { total, available, checkedOut } = statistics;
    console.log(`\n📊 Library Statistics:
    Total Books: ${total}
    Available: ${available}
    Checked Out: ${checkedOut}`); 
}

export function displayBooks(books, title = "Books") {
    // Display books with formatted output using template literals
    
    console.log(`\n📚 ${title}:`);
    // Use optional chaining to handle cases where availability might be undefined
    // Handle undefined availability with optional chaining
}
    books.forEach(book => {
        const availabilityStatus = book.availability?.status || 'Unknown';
        console.log(`- ${book.title} by ${book.author} (${book.year}) - Status: ${availabilityStatus}`);
    });
    

/**
 * TODO: Implement search results and availability formatting
 * displaySearchResults(results, criteria): Show search results with dynamic title
 * formatAvailability(availability): Return formatted status string with optional chaining
 */
export function displaySearchResults(searchResults, searchCriteria) {
    // Use destructuring for search criteria
    const { query, category } = searchCriteria;
    // Create dynamic title with template literals
    console.log(`\n🔍 Search Results for "${query}" in category "${category}":`);
    searchResults.forEach(book => {
        console.log(`- ${book.title} by ${book.author}`);
    });
}

export function formatAvailability(availability) {
    // Use optional chaining and nullish coalescing
    const status = availability?.status ?? 'Unknown';
    const location = availability?.location ?? 'Unknown location';
    return status === 'available' ? `Available at ${location}` : 'Not available';   
    // Return formatted status with appropriate symbols
}

/**
 * TODO: Create analysis function demonstrating array methods
 * showBookAnalysis(books): Use map, filter, reduce to show insights
 * Calculate most common decade, genre distribution, etc.
 */
export function showBookAnalysis(books) {
    console.log('\n🔍 === BOOK ANALYSIS ===');
    
    // Use modern array methods to analyze the book collection
    // Show publication decades, genre counts, etc.
    const decadeCounts = books.reduce((acc, book) => {
        const decade = Math.floor(book.year / 10) * 10;
        acc[decade] = (acc[decade] || 0) + 1;
        return acc;
    }, {});

    console.log('Books by Decade:');    
}