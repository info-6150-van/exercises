/**
 * Main entry point for the library management system
 * Demonstrates ES6 modules, async operations, and coordination of different modules
 */

import {
  books,
  filterBooksByStatus,
  groupBooksByGenre,
  bookTitleGenerator,
  createBookSummary,
} from "./data.js";

import libraryManager, {
  LibraryManager,
  createBookFormatter,
  memoize,
} from "./library.js";

import {
  displayStatistics,
  displayBooks,
  displaySearchResults,
  showBookAnalysis,
  formatAvailability,
} from "./ui.js";

/**
 * Helper: safely call UI functions (in case the UI module is incomplete)
 */
function safeUI(fn, fallback) {
  try {
    if (typeof fn === "function") return fn();
  } catch (e) {
    console.warn("UI function error:", e?.message ?? e);
  }
  if (typeof fallback === "function") fallback();
}

/**
 * Helper: async delay to demonstrate async/await
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Main application function:
 * - Coordinate all modules
 * - Handle null default export
 * - Demonstrate library features + async operations
 */
async function runLibraryDemo() {
  console.log("🚀 Starting Library Management System Demo");
  console.log("=".repeat(50));

  try {
    // Handle case where default export might be null
    const library = libraryManager || new LibraryManager(books);

    // 1) Variable scoping demo
    demonstrateScoping();

    // 2) Statistics (UI module)
    console.log("\n📊 === LIBRARY STATISTICS ===");
    safeUI(
      () => displayStatistics(library),
      () => console.log("(stats) Total books:", books.length)
    );

    // 3) Basic listing (UI module)
    console.log("\n📚 === ALL BOOKS (first 5 shown) ===");
    const firstFive = books.slice(0, 5);
    safeUI(
      () => displayBooks(firstFive),
      () => firstFive.forEach((b, i) => console.log(`${i + 1}. ${b?.title ?? "Untitled"}`))
    );

    // 4) Show summaries (data module)
    console.log("\n🧾 === BOOK SUMMARIES (data.js) ===");
    for (const b of firstFive) {
      const summary = createBookSummary?.(b);
      console.log("-", summary ?? `${b?.title ?? "Untitled"} (no summary available)`);
    }

    // 5) Filtering by status (data module)
    console.log("\n✅ === FILTERING DEMO ===");
    const availableBooks = filterBooksByStatus?.("available") ?? [];
    console.log(`Available books: ${availableBooks.length}`);
    safeUI(
      () => displayBooks(availableBooks.slice(0, 5)),
      () => availableBooks.slice(0, 5).forEach((b) => console.log("•", b?.title ?? "Untitled"))
    );

    // 6) Grouping by genre (data module)
    console.log("\n🗂️  === GROUPING DEMO (by genre) ===");
    const grouped = groupBooksByGenre?.() ?? {};
    const genres = Object.keys(grouped);
    console.log("Genres found:", genres.length ? genres.join(", ") : "(none)");
    for (const g of genres.slice(0, 3)) {
      console.log(`- ${g}: ${grouped[g]?.length ?? 0} book(s)`);
    }

    // 7) Async demo: pretend to "load" something / do a network-like step
    console.log("\n⏳ === ASYNC DEMO ===");
    console.log("Simulating async operation (loading/searching)...");
    await delay(300);

    // 8) Searching (try library method if it exists; otherwise do a simple search)
    console.log("\n🔎 === SEARCH DEMO ===");
    const query = "the";
    const results =
      library?.search?.(query) ??
      library?.searchBooks?.(query) ??
      books.filter((b) => (b?.title ?? "").toLowerCase().includes(query));

    safeUI(
      () => displaySearchResults(results, query),
      () => {
        console.log(`Query: "${query}" | Results: ${results.length}`);
        results.slice(0, 5).forEach((b) => console.log("•", b?.title ?? "Untitled"));
      }
    );

    // 9) Analysis (UI module) + availability formatting
    console.log("\n🧠 === ANALYSIS + AVAILABILITY DEMO ===");
    const sample = results?.[0] ?? books[0];
    safeUI(
      () => showBookAnalysis(sample),
      () => console.log("Analysis book:", sample?.title ?? "Untitled")
    );

    const availabilityText =
      (typeof formatAvailability === "function" ? formatAvailability(sample) : null) ??
      (sample?.status ?? "unknown");
    console.log("Availability:", availabilityText);

    // 10) Formatter factory (library.js)
    console.log("\n🧩 === FORMATTER FACTORY DEMO ===");
    const formatter = typeof createBookFormatter === "function"
      ? createBookFormatter({ uppercaseTitle: true })
      : (b) => (b?.title ?? "Untitled");

    console.log("Formatted title:", formatter(sample));

    // 11) Memoization (library.js)
    console.log("\n🧠 === MEMOIZATION DEMO ===");
    const expensiveCountByGenre = (genre) => {
      // Pretend expensive work:
      let count = 0;
      for (const b of books) {
        if ((b?.genre ?? "").toLowerCase() === (genre ?? "").toLowerCase()) count++;
      }
      return count;
    };

    const memoizedCountByGenre =
      typeof memoize === "function" ? memoize(expensiveCountByGenre) : expensiveCountByGenre;

    const testGenre = genres[0] ?? "fiction";
    console.log(`Counting genre "${testGenre}" (first call) ->`, memoizedCountByGenre(testGenre));
    console.log(`Counting genre "${testGenre}" (cached call) ->`, memoizedCountByGenre(testGenre));

    // 12) Error handling + generator demos
    demonstrateErrorHandling(library);
    showGeneratorExample();

  } catch (error) {
    console.error("Application error:", error?.message ?? error);
  } finally {
    console.log("\n✅ Demo completed!");
  }
}

/**
 * Show let/const behavior, block scoping, temporal dead zone awareness
 */
function demonstrateScoping() {
  console.log("\n🔍 === VARIABLE SCOPING DEMO ===");

  // const: cannot be reassigned, but objects can be mutated
  const config = { appName: "LibraryDemo", version: 1 };
  console.log("const object before mutation:", config);
  config.version = 2; // allowed (mutation)
  console.log("const object after mutation:", config);

  // let: block scoped + reassignable
  let message = "outer";
  console.log("let before block:", message);

  {
    let message = "inner (block scoped)";
    console.log("let inside block:", message);
  }

  console.log("let after block:", message);

  // Temporal Dead Zone (TDZ) demo
  console.log("\nTDZ demo (ReferenceError expected):");
  try {
    // Accessing `tdzValue` before declaration triggers TDZ error
    // eslint-disable-next-line no-use-before-define
    console.log(tdzValue);
  } catch (e) {
    console.log("Caught error:", e.name, "-", e.message);
  }

  const tdzValue = "Now declared";
  console.log("After declaration:", tdzValue);
}

/**
 * Show try/catch, optional chaining, nullish coalescing, safe array usage
 */
function demonstrateErrorHandling(library) {
  console.log("\n⚠️  === ERROR HANDLING DEMO ===");

  // Optional chaining: call a method only if it exists
  const maybeBook =
    library?.getBookById?.(999999) ??
    library?.findById?.(999999) ??
    null;

  console.log("Safe lookup result:", maybeBook?.title ?? "(no book found)");

  // Nullish coalescing: provide defaults only for null/undefined
  const safeStatus = maybeBook?.status ?? "unknown";
  console.log("Status with default:", safeStatus);

  // Safe array methods on potentially undefined values
  const maybeList = library?.getBooks?.() ?? library?.books ?? books ?? [];
  const titles = (maybeList ?? []).slice(0, 3).map((b) => b?.title ?? "Untitled");
  console.log("First 3 titles (safe):", titles.join(" | "));

  // try/catch example: JSON parsing
  try {
    const badJson = "{ title: unquoted }";
    JSON.parse(badJson);
  } catch (e) {
    console.log("Caught JSON parse error:", e.name);
  }
}

/**
 * Use bookTitleGenerator to iterate through titles
 */
function showGeneratorExample() {
  console.log("\n🔄 === GENERATOR DEMO ===");

  // Some assignments implement generator as bookTitleGenerator(books)
  // others implement it as bookTitleGenerator() using internal books.
  let iterator;

  try {
    iterator = bookTitleGenerator(books);
  } catch {
    iterator = bookTitleGenerator();
  }

  let count = 0;
  for (const title of iterator) {
    console.log("•", title);
    count++;
    if (count >= 5) break; // keep output readable
  }

  if (count === 0) console.log("(No titles produced by generator)");
}

/**
 * Start the application and demonstrate array destructuring
 */
console.log("\n📖 === DESTRUCTURING DEMO ===");
const [firstBook, secondBook, ...remainingBooks] = books;

console.log("First book:", firstBook?.title ?? "Untitled");
console.log("Second book:", secondBook?.title ?? "Untitled");
console.log("Remaining count:", remainingBooks.length);

runLibraryDemo();
