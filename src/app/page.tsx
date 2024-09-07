import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold mb-10">Página Inicial</h1>
        <p className="border-2 border-blue-900 p-8 text-2xl">Acesso a página inicial</p>
    </div>
    
  );
}
