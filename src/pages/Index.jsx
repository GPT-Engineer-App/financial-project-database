import { useState } from "react";
import { Container, Text, VStack, HStack, Input, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddUsuario = () => {
    if (editIndex !== null) {
      const updatedUsuarios = usuarios.map((usuario, index) => (index === editIndex ? { nome, email, senha } : usuario));
      setUsuarios(updatedUsuarios);
      setEditIndex(null);
    } else {
      setUsuarios([...usuarios, { nome, email, senha }]);
    }
    setNome("");
    setEmail("");
    setSenha("");
  };

  const handleEditUsuario = (index) => {
    setEditIndex(index);
    setNome(usuarios[index].nome);
    setEmail(usuarios[index].email);
    setSenha(usuarios[index].senha);
  };

  const handleDeleteUsuario = (index) => {
    setUsuarios(usuarios.filter((_, i) => i !== index));
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Gerenciamento de Usuários</Text>
        <HStack spacing={4} width="100%">
          <Input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <Button onClick={handleAddUsuario}>{editIndex !== null ? "Atualizar" : "Adicionar"}</Button>
        </HStack>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {usuarios.map((usuario, index) => (
              <Tr key={index}>
                <Td>{usuario.nome}</Td>
                <Td>{usuario.email}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEditUsuario(index)} />
                    <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => handleDeleteUsuario(index)} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;
