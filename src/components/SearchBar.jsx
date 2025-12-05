function SearchBar({ query, setQuery, searchByIngredient, searchByName }) {
  return (
    <section id="search" className="search-panel">

      {/* Frost Glass Box */}
      <div className="search-box-overlay">

        <input
          type="text"
          value={query}
          placeholder="e.g. chicken, rice or 'Paneer'"
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="buttons">
          <button className="btn" onClick={searchByIngredient}>
            Search by ingredient
          </button>

          <button className="btn btn-ghost" onClick={searchByName}>
            Search by name
          </button>
        </div>

        <p className="tip-text">Try ingredients like:</p>

        <div className="chips-container">
          {["chicken", "rice", "egg", "potato"].map((item) => (
            <button key={item} className="chip" onClick={() => setQuery(item)}>
              {item}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

export default SearchBar;
