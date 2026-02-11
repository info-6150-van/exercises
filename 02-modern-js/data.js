export const books = [
    {
        id: 1,
        title: "The Clean Coder",
        author: "Robert C. Martin",
        year: 2011,
        genre: "Programming",
        availability: { status: "available", location: "A1-23" }
    },
    {
        id: 2,
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        year: 2014,
        genre: "Programming",
        availability: { status: "checked_out", dueDate: "2024-12-01" }
    },
    {
        id: 3,
        title: "Design Patterns",
        author: "Gang of Four",
        year: 1994,
        genre: "Software Engineering"
       
    },
    {
        id: 4,
        title: "Clean Architecture",
        author: "Robert C. Martin",
        year: 2017,
        genre: "Programming",
        availability: { status: "available", location: "A2-15" }
    }
];


export const categoryDescriptions = new Map([
    ["Programming", "Books about programming languages and techniques"],
    ["Software Engineering", "Books about software design and architecture"]
])

const authors = books.map(book => book.author)

export const uniqueAuthors = new Set([
    ...authors
]);

export function filterBooksByStatus(bookArray, status){
    return bookArray.filter(book => book.availability?.status === status)
}

export function groupBooksByGenre(bookArray){
    const genreMap = new Map();
      for(const book of bookArray){
       const genre = book.genre;

       if(genreMap.has(genre)){
        genreMap.get(genre).push(book);
       }else{
        genreMap.set(genre, [book]);
       }
      }
    return genreMap
}

export function* bookTitleGenerator(bookArray){
    for(const book of bookArray){
        yield book.title
    }
}
export function createBookSummary(book){
    const{ title, author, year, availability} = book;

    const status = availability?.status === "available" ? 
                   `Available at ${availability.location}` : 
                   `Checked out (due ${availability?.dueDate ?? "unknown"})`;

                   return `${title} by ${author} (${year}) - ${status}`;
}


