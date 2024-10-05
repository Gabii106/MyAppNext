"use client";

import { firestore } from "../../../lib/firebaseconfig";
import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

interface Aluno {
    id: string;
    nome: string;
    sobrenome: string;
    datanascimento: string;
    sexo: string;
}

const Listar = () => {
    const [formData, setFormData] = useState<Omit<Aluno, 'id'>>({
        nome: '',
        sobrenome: '',
        datanascimento: '',
        sexo: '',
    });
    const [currentId, setCurrentId] = useState<string>('');
    const [alunos, setAlunos] = useState<Aluno[]>([]);

    const fetchAlunos = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'alunos'));
            const alunosList: Aluno[] = [];
            querySnapshot.forEach(doc => {
                alunosList.push({ id: doc.id, ...doc.data() } as Aluno);
            });
            setAlunos(alunosList);
        } catch (e) {
            console.error('Erro ao buscar alunos', e);
        }
    };

    useEffect(() => {
        fetchAlunos();
    }, []);

    const handleEdit = (aluno: Aluno) => {
        setFormData({ 
            nome: aluno.nome, 
            sobrenome: aluno.sobrenome, 
            datanascimento: aluno.datanascimento, 
            sexo: aluno.sexo 
        });
        setCurrentId(aluno.id); // Armazena o ID do aluno
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentId) {
            console.error('ID do aluno não está definido');
            return;
        }

        const alunoRef = doc(firestore, 'alunos', currentId);
        console.log('Atualizando aluno com ID:', currentId); // Log para depuração

        try {
            await updateDoc(alunoRef, formData);
            alert('Aluno atualizado com sucesso');
            fetchAlunos();
            setFormData({ nome: '', sobrenome: '', datanascimento: '', sexo: '' });
            setCurrentId('');
        } catch (e) {
            console.error('Erro ao atualizar aluno', e);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja deletar?')) {
            try {
                await deleteDoc(doc(firestore, 'alunos', id));
                alert('Aluno deletado com sucesso');
                fetchAlunos();
            } catch (e) {
                console.error('Erro ao deletar aluno', e);
                alert('Erro ao deletar aluno. Verifique os logs para mais detalhes.');
            }
        }
    };

    return (
        <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-4 mx-auto">
            <h2 className="text-xl font-bold mb-4 text-center">Lista de Alunos</h2>
            
            <form onSubmit={handleUpdate} className="mb-4">
                <input
                    type="text"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="border border-gray-300 p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Sobrenome"
                    value={formData.sobrenome}
                    onChange={(e) => setFormData({ ...formData, sobrenome: e.target.value })}
                    className="border border-gray-300 p-2 mr-2"
                />
                <input
                    type="date"
                    value={formData.datanascimento}
                    onChange={(e) => setFormData({ ...formData, datanascimento: e.target.value })}
                    className="border border-gray-300 p-2 mr-2"
                />
                <select
                    value={formData.sexo}
                    onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
                    className="border border-gray-300 p-2 mr-2"
                >
                    <option value="">Selecione Sexo</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600">
                    Atualizar
                </button>
            </form>

            <table className="min-w-full border-collapse border border-gray-300 text-center">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Nome</th>
                        <th className="border border-gray-300 p-2">Sobrenome</th>
                        <th className="border border-gray-300 p-2">Data de Nascimento</th>
                        <th className="border border-gray-300 p-2">Sexo</th>
                        <th className="border border-gray-300 p-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map(aluno => (
                        <tr key={aluno.id}>
                            <td className="border border-gray-300 p-2">{aluno.nome}</td>
                            <td className="border border-gray-300 p-2">{aluno.sobrenome}</td>
                            <td className="border border-gray-300 p-2">{aluno.datanascimento}</td>
                            <td className="border border-gray-300 p-2">{aluno.sexo}</td>
                            <td className="border border-gray-300 p-2">
                                <button
                                    onClick={() => handleEdit(aluno)}
                                    className="bg-yellow-500 text-white p-1 rounded mr-1 hover:bg-yellow-600"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(aluno.id)}
                                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                                >
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Listar;


