import Nav from "./nav";

export default function Header() {
    return (
      <header className="flex justify-between mb-8 bg-blue-200 py-5">
            <div className="text-xl font-bold"> NEXT APP</div>
            <Nav></Nav>
      </header>
    );
  }
  