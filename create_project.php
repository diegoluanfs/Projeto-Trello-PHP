<?php
// conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "db_trello_projeto");

// verificação da conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// receber os dados do formulário
$projeto = $_POST["projeto"];

echo "Projeto: ", $projeto;

// inserir os dados no banco de dados
$sql = "INSERT INTO tb_projetos (nome) VALUES ('$projeto')";
if ($conn->query($sql) === TRUE) {
    echo "Projeto cadastrado com sucesso!";
} else {
    echo "Erro ao cadastrar o projeto: " . $conn->error;
}

// fechar a conexão com o banco de dados
$conn->close();
?>