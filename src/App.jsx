import "./App.css";
import Header from "./components/Header";
import TrackingBoard from "./components/TrackingBoard";

function App() {
  return (
    <body>
      <Header />
      <main className="relative mx-auto mt-10 w-full max-w-7xl">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TrackingBoard />
        </section>
      </main>
    </body>
  );
}

export default App;
