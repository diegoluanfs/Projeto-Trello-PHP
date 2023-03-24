$(document).ready(function() {
    $("#projeto-form").submit(function(event) {
        event.preventDefault(); // impede o envio normal do formulário
        var projeto = $("#projeto").val();
        $.ajax({
            url: "./create_project.php",
            type: "POST",
            data: {projeto: projeto},
            success: function(response) {
                console.log('response: ', response);
                var id_projeto = parseInt(response); // Converte a resposta em um número inteiro
                Swal.fire(
                    'Salvo!',
                    'Projeto salvo com sucesso!'
                );
                setTimeout(function() {
                    window.location.href = './tarefas/tarefas.html?id=' + id_projeto; // Redireciona para outra página, passando o ID do projeto como parâmetro na URL
                }, 3000); // Espera 3 segundos antes de redirecionar para outra página
            },
            error: function(ex){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo deu errado, tente mais tarde!'
                });
            }
        });
        
    });
});
