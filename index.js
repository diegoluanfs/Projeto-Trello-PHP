
$(document).ready(function() {
    $("#projeto-form").submit(function(event) {
        event.preventDefault(); // impede o envio normal do formulário
        var projeto = $("#projeto").val();
        $.ajax({
            url: "./create_project.php",
            type: "POST",
            data: {projeto: projeto},
            success: function(response) {
                Swal.fire(
                    'Salvo!',
                    'Projeto salvo com sucesso!'
                  );
            },
            error: function(ex){
                console.log(ex);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo deu errado, tente mais tarde!'
                  });
            }
        });
    });
});