$(document).ready(function() {
	// Preencher o campo select com os projetos do banco de dados
	$.ajax({
		url: './get_projetos.php',
		dataType: 'json',
		success: function(data) {
			$.each(data, function(index, projeto) {
				$('#projeto').append('<option value="' + projeto.id + '">' + projeto.nome + '</option>');
			});
		}
	});

	// Enviar o formulário quando o botão for clicado
	$('#tarefa-form').submit(function(event) {
		event.preventDefault();
		var tarefa = $('#tarefa').val();
		var descricao = $('#descricao').val();
		var projeto = $('#projeto').val();

        console.log(tarefa);
        console.log(descricao);
        console.log(projeto);

		if (tarefa && projeto && descricao) {
			$.ajax({
				type: 'POST',
				url: './create_task.php',
				data: {tarefa: tarefa, projeto: projeto, descricao: descricao},
				success: function() {
					Swal.fire({
						title: 'Tarefa cadastrada com sucesso!',
						icon: 'success'
					});
					$('#tarefa-form')[0].reset();
				},
				error: function() {
					Swal.fire({
						title: 'Erro ao cadastrar a tarefa',
						icon: 'error'
					});
				}
			});
		} else {
			Swal.fire({
				title: 'Por favor, preencha todos os campos',
				icon: 'warning'
			});
		}
	});
});

function carrega_projetos(callback) {
    $.ajax({
        url: './get_projetos.php',
        method: 'GET',
        dataType: 'json',
        success: function(projetos) {
            callback(projetos);
        },
        error: function() {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocorreu um erro ao carregar os projetos!',
            });
        },
    });
}

function preenche_select_projetos(projetos) {
    var select = $('#projeto');
    select.empty();
    $.each(projetos, function(i, projeto) {
        select.append($('<option>').val(projeto.id).text(projeto.nome));
    });
}

$(document).ready(function() {
    carrega_projetos(function(projetos) {
        preenche_select_projetos(projetos);
    });
});