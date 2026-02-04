/**
 * UI utilities module demonstrating template literals, destructuring, and modern JS
 */

/**
 * TODO: Implement display functions using destructuring and template literals
 * displayStatistics(statistics): Extract properties with destructuring, format with template literals
 * displayBooks(books, title): Show formatted book list, use optional chaining for availability
 */
export function displayStatistics(statistics) {onst { total, available, checkedOut } = statistics;

    console.log('\n === LIBRARY STATISTICS ===');
    console.log(`
Total books   : ${total}
Available    : ${available}
Checked out  : ${checkedOut}
    `.trim());
}
   export function displayBooks(books, title = 'Books') {
    console.log(`\n === ${title.toUpperCase()} ===`);

    if (!books?.length) {
        console.log('No books to display.');
        return;
    }

    books.forEach(({ title, author, genre, availability }) => {
        const status = availability?.status ?? 'unknown';

        console.log(
            `• "${title}" by ${author} [${genre}] — ${formatAvailability(status)}`
        );
    });
}


/**
 * TODO: Implement search results and availability formatting
 * displaySearchResults(results, criteria): Show search results with dynamic title
 * formatAvailability(availability): Return formatted status string with optional chaining
 */
export function displaySearchResults(searchResults, searchCriteria = {}) {
    const { title, author, genre } = searchCriteria;

    const criteriaText = [
        title && `title: "${title}"`,
        author && `author: "${author}"`,
        genre && `genre: "${genre}"`
    ]
        .filter(Boolean)
        .join(', ') || 'all books';

    console.log(`\n === SEARCH RESULTS (${criteriaText}) ===`);

    displayBooks(searchResults, 'Search Results');
}


export function formatAvailability(availability) {
    const status = availability?.toLowerCase?.() ?? 'unknown';

    switch (status) {
        case 'available':
            return 'Available';
        case 'checked_out':
            return 'Checked Out';
        default:
            return ' Unknown';
    }
}

/**
 * TODO: Create analysis function demonstrating array methods
 * showBookAnalysis(books): Use map, filter, reduce to show insights
 * Calculate most common decade, genre distribution, etc.
 */
export function showBookAnalysis(books) {
    console.log('\n === BOOK ANALYSIS ===');

    if (!books?.length) {
        console.log('No books available for analysis.');
        return;
    }
    const decades = books
        .map(book => Math.floor(book.year / 10) * 10)
        .reduce((acc, decade) => {
            acc[decade] = (acc[decade] || 0) + 1;
            return acc;
        }, {});
    const genres = books.reduce((acc, { genre }) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
    }, {});
    const mostCommonDecade = Object.entries(decades).reduce(
        (max, current) => (current[1] > max[1] ? current : max)
    );

    console.log('Publication decades:', decades);
    console.log(' Genre distribution:', genres);
    console.log(
        ` Most common decade: ${mostCommonDecade[0]}s (${mostCommonDecade[1]} books)`
    );
}