import Feed from "@components/Feed";
import "./globals.css";

export default function Home() {
  return (
    <section className="w-full flex_center flex-col text-center">
      <h1 className="head_text capitalize">
        search & create
        <br />
        <span className="blue_gradient"> your posts</span>
      </h1>
      <p className="lead_text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolore
        quibusdam dolorem error sunt repellendus officiis harum dolor autem.
        Inventore officia tempora cum magni ducimus labore ab nemo iste
        consectetur!
      </p>
      <Feed />
    </section>
  );
}
