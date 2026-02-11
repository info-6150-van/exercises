export function displayStatistics(statistics) {
    const { total, available, checkedOut } = statistics;

    console.log(`\n === LIBRARY STATISTICS ===`);
    console.log(`Total books: ${total}`);
    console.log(`Available books: ${available}`);
    console.log(`Checked out books: ${checkedOut}`);
}

export function displayBooks(books, title = "Books") {
    console.log(`\n === ${title} ===`);
    books.forEach(book => {
        const { title: bookTitle, author, year, availability } = book;
        const status = formatAvailability(availability);
        console.log(`${bookTitle} by ${author} (${year}) - ${status}`);
    });
}

export function displaySearchResults(searchResults, searchCriteria) {
    const { title, author, genre } = searchCriteria;
    let criteriaText = [];
    if (title) criteriaText.push(`Title: "${title}"`);
    if (author) criteriaText.push(`Author: "${author}"`);
    if (genre) criteriaText.push(`Genre: "${genre}"`);

    console.log(`\n === SEARCH RESULTS ===`);
    console.log(`Criteria: ${criteriaText.join(', ') || 'None'}`);
    console.log(`Found ${searchResults.length} result(s):`);
    displayBooks(searchResults);
}

export function formatAvailability(availability) {
    const status = availability?.status ?? "unknown";

    if (status === "available") {
        return ` Available at ${availability?.location ?? "unknown"}`;
    }

    if (status === "checked_out") {
        return ` Checked out (due ${availability?.dueDate ?? "unknown"})`;
    }

    return "Status unknown";
}

export function showBookAnalysis(books) {
    console.log('\n === BOOK ANALYSIS ===');

    const decadeCounts = books.reduce((acc, { year }) => {
        const decade = Math.floor(year / 10) * 10;
        acc[decade] = (acc[decade] ?? 0) + 1;
        return acc;
    }, {});

    const mostCommonDecade = Object.entries(decadeCounts).reduce(
        (a, b) => (b[1] > a[1] ? b : a),
        [0, 0]
    );
    console.log(`Most common decade: ${mostCommonDecade[0]}s (${mostCommonDecade[1]} books)`);

      const genreCounts = books.reduce((acc, { genre }) => {
        acc[genre] = (acc[genre] ?? 0) + 1;
        return acc;
    }, {});

    console.log("Genre distribution:");
    for (const [genre, count] of Object.entries(genreCounts)) {
        console.log(`- ${genre}: ${count}`);
    }
}
