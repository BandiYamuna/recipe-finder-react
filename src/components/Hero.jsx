export default function Hero() {
  return (
    <div className="hero-container">
      <section className="hero">
        <h1>Find Delicious Recipes Instantly</h1>
        <p>Search your favorite meals by ingredient or dish name!</p>

        <button
          className="btn"
          onClick={() =>
            document.getElementById("search").scrollIntoView({ behavior: "smooth" })
          }
        >
          Get Started
        </button>

      </section>
    </div>
  );
}
