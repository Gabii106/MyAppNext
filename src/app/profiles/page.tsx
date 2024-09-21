import Image from "next/image";
import Link from "next/link";

export default function Profiles() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold mb-10">Central do Usuário</h1>
        <p className="border-2 border-blue-900 p-8 text-2xl">Gerenciamento de usuários</p>
        <div className="flex flex-col mt-10 gap-6">
          <Link href="/profiles/user1" 
          className="bg-gray-300 rounded-lg p-2 hover:underline"> Usuário 1 </Link>
          <Link href="/profiles/user2" 
          className="bg-gray-300 rounded-lg p-2 hover:underline"> Usuário 2 </Link>
          <Link href="/profiles/user3" 
          className="bg-gray-300 rounded-lg p-2 hover:underline"> Usuário 3 </Link>
        </div>
    </div>
    
  );
}
