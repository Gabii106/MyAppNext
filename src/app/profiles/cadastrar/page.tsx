"use client";

import { firestore } from "../../lib/firebaseconfig";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";

interface Aluno {
    id: string;
    nome: string;
    sobrenome: string;
    datanascimento: string;
    sexo: string;
}

const Cadastro = () => {
    const [formData, setFormData] = useState<Aluno>({
        id: '',
        nome: '',
        sobrenome: '',
        datanascimento: '',
        sexo: '',
    });

    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        const fetchAlunos = async () => {
            const alunosCollection = collection(firestore, 'alunos');
            const alunosDocs = await getDocs(alunosCollection);
            const alunosData: Aluno[] = alunosDocs.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Aluno[];
            setAlunos(alunosData);
        };
        fetchAlunos();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name as keyof Aluno]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        try {
            if (formData.id) {
                const alunoDoc = doc(firestore, 'alunos', formData.id);
                await updateDoc(alunoDoc, { ...formData });
                alert('Dados atualizados com sucesso');
            } else {
                await addDoc(collection(firestore, 'alunos'), formData);
                alert('Dados cadastrados com sucesso');
            }
            setFormData({
                id: '',
                nome: '',
                sobrenome: '',
                datanascimento: '',
                sexo: ''
            });
            loadAlunos();
        } catch (e) {
            console.error('Erro ao salvar/atualizar os dados do aluno', e);
        }
    };

    const loadAlunos = async () => {
        const alunosCollection = collection(firestore, 'alunos');
        const alunosDocs = await getDocs(alunosCollection);
        const alunosData: Aluno[] = alunosDocs.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as Aluno[];
        setAlunos(alunosData);
    };

    const handleEdit = (aluno: Aluno) => {
        setFormData(aluno);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja deletar?')) {
            try {
                await deleteDoc(doc(firestore, 'alunos', id));
                alert('Aluno deletado com sucesso');
                loadAlunos();
            } catch (e) {
                console.error('Erro ao deletar', e);
            }
        }
    };

    useEffect(() => {
        const testConnection = async () => {
            try {
                const testCollection = collection(firestore, "teste");
                await getDocs(testCollection);
                setMensagem("Conectado ao Firestore com sucesso!");
            } catch (error) {
                console.error("Erro ao conectar ao Firestore:", error);
                setMensagem("Falha ao conectar ao Firestore. Tente novamente mais tarde.");
            }
        };

        testConnection();
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-400 p-8">
            <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-center">Cadastro</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="sobrenome">Sobrenome</label>
                    <input
                        type="text"
                        id="sobrenome"
                        name="sobrenome"
                        value={formData.sobrenome}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="datanascimento">Data de Nascimento</label>
                    <input
                        type="date"
                        id="datanascimento"
                        name="datanascimento"
                        value={formData.datanascimento}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Sexo</label>
                    <select
                        name="sexo"
                        value={formData.sexo}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Salvar
                </button>
               
            </form>

            <div className="mt-8 w-full">
                <h2> LISTA DE ALUNOS CADASTRADOS </h2>
                <ul>
                    {alunos.map(aluno => (
                        <li key={aluno.id} className="flex justify-between items-center">
                            <span>{aluno.nome}</span>
                            <div>
                                <button onClick={() => handleEdit(aluno)} className="mr-2">Editar</button>
                                <button onClick={() => handleDelete(aluno.id)}>Deletar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Cadastro;
