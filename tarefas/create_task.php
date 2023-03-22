<?php
// conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "db_trello_projeto");

// verificação da conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// receber os dados do formulário
$tarefa = $_POST["tarefa"];
$descricao = $_POST["descricao"];
$projeto = $_POST["projeto"];

// inserir os dados no banco de dados
$sql = "INSERT INTO tb_tarefas (nome, descricao, fk_projeto) VALUES ('$tarefa', '$descricao', '$projeto')";
if ($conn->query($sql) === TRUE) {
    echo "Tarefa cadastrada com sucesso!";
} else {
    echo "Erro ao cadastrar a tarefa: " . $conn->error;
}

// fechar a conexão com o banco de dados
$conn->close();
?>