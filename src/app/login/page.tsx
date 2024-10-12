"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try{
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/profiles/cadastrar')
        } catch (err) {
            const errorMessage = (err instanceof Error) ? err.message : "Erro ao autenticar";
            setError(errorMessage);
            router.push('/login');
        }
    }


    return(
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="bg-gray-300 p-8 rounded shadow-md w-96">
                <h2 className="text-3xl mx-4 text-center"> Sistema de Login </h2>
                
                {error && <p className="text-red-500 p-4 text-center">{error}</p>}
                
                <div className="mt-4 text-center">
                    <label className="block text-sm">Digite seu email: </label>
                    <input type="email" id="email" required placeholder="Digite seu email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        className="mt-4 block w-full p-2 rounded "/>
                    <label className="block text-sm mt-4">Digite sua senha: </label>
                    <input type="password" id="password" required placeholder="Digite sua senha"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        className="mt-4 block w-full p-2 rounded"/>
                </div>
                <button type="submit" className="w-full my-6 bg-blue-300 text-white p-3 rounded">Entrar</button>
            </form>
        </div>

    );
}