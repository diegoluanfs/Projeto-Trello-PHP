<?php
// conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "db_trello_projeto");

// verificação da conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// receber os dados do formulário
$id_projeto = $_POST["id_projeto"];
$requisito = $_POST["requisito"];
$descricao = $_POST["descricao"];
$prioridade = $_POST["prioridade"];

// inserir os dados no banco de dados
$sql = "INSERT INTO tb_tarefas (id_projeto, requisito, descricao, prioridade) VALUES ('$id_projeto', '$requisito', '$descricao', '$prioridade')";
if ($conn->query($sql) === TRUE) {
    echo "Tarefa cadastrada com sucesso!";
} else {
    echo "Erro ao cadastrar a tarefa: " . $conn->error;
}

// fechar a conexão com o banco de dados
$conn->close();
?>