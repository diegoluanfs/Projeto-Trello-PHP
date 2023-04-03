
$(document).ready(function() {
	// Obter a string 'de consulta da URL
	var queryString = window.location.search;
	// Analisar a string de consulta usando URLSearchParams
	var urlParams = new URLSearchParams(queryString);
	// Obter o valor do parâmetro "id"

const id_projeto = urlParams.get("id");
const id_tarefa = urlParams.get("id_tarefa");

	if(id_tarefa != null){
		$.ajax({
			type: 'GET',
			url: './get_tarefa_by_id.php?id='+id_projeto+'&id_tarefa='+id_tarefa,
			data: null,
			success: function(response) {
				var response = JSON.parse(response);
				$('#id-tarefa').val(response[0].id);
				$('#id-projeto').val(response[0].id_projeto);
				$('#requisito').val(response[0].requisito);
				$('#descricao').val(response[0].descricao);
				$('#prioridade').val(response[0].prioridade);
				table.ajax.reload();
			},
			error: function() {
				Swal.fire({
					title: 'Erro ao cadastrar a tarefa',
					icon: 'error'
				});
			}
		});
	}

	// Atribuir o valor ao campo de texto
	$("#id-projeto").val(id_projeto);
	$("#id-tarefa").val(id_tarefa);

	$('#btn-clear').on('click', function(){
		window.location.href = './tarefas.html?id=' + id_projeto;
	});

	// Enviar o formulário quando o botão for clicado
	$('#btn-save').on('click', function(event) {
		event.preventDefault();
		// seleciona os campos do formulário
		const id_projeto = document.getElementById('id-projeto');
		const requisito = document.getElementById('requisito');
		const descricao = document.getElementById('descricao');
		const prioridade = document.getElementById('prioridade');

		// verifica se todos os campos foram preenchidos
		if (id_projeto.value.trim() === '' || requisito.value.trim() === '' || descricao.value.trim() === '' || prioridade.value.trim() === '') {
			Swal.fire({
				title: 'Por favor, preencha todos os campos',
				icon: 'warning'
			});
		}else{
			if($('#id-tarefa').val() == null ||$('#id-tarefa').val() == ''){
				console.log('O valor dentro do if é: ', $('#id-tarefa').val());
				$.ajax({
					type: 'POST',
					url: './create_task.php',
					data: {id_projeto: id_projeto.value, id_tarefa: id_tarefa.value, requisito: requisito.value, descricao: descricao.value, prioridade: prioridade.value},
					success: function() {
						window.location.href = './tarefas.html?id=' + id_projeto.value;
					},
					error: function() {
						Swal.fire({
							title: 'Erro ao cadastrar a tarefa',
							icon: 'error'
						});
					}
				});
			}else{
				$.ajax({
					type: 'POST',
					url: './update_task.php',
					data: {id_projeto: id_projeto.value, id_tarefa: id_tarefa.value, requisito: requisito.value, descricao: descricao.value, prioridade: prioridade.value},
					success: function() {
						Swal.fire({
							title: 'Tarefa cadastrada com sucesso!',
							icon: 'success'
						});
						$('#requisito').val('');
						$('#descricao').val('');
						$('#prioridade').val('');
						table.ajax.reload();
					},
					error: function() {
						Swal.fire({
							title: 'Erro ao cadastrar a tarefa',
							icon: 'error'
						});
					}
				});
			}
		}
	});

	var initLoad = true;
	
	var table = $('#list-table').DataTable({
		ajax: {
			url: './get_requisitos.php?id='+id_projeto,
			type: 'GET',
			dataSrc: ''
		},
		order: [1],
		columns: [
			{ data: 'id' },
			{ data: 'id' },
			{ data: 'requisito' },
			{ data: 'descricao' },
			{ data: 'prioridade' },
			{ data: 'id_projeto' },
			{ data: '' }
		],
		columnDefs: [
			{
				className: 'control',
				responsivePriority: 2,
				targets: 0
			},
			{
				targets: 1,
				visible: false,
				render: function (data, type, full, meta) {
					return formatColumnText(full['id']);
				}
			},
			{
				targets: 2,
				render: function (data, type, full, meta) {
					return formatColumnText(full['requisito']);
				}
			},
			{
				targets: 3,
				render: function (data, type, full, meta) {
					return formatColumnText(full['descricao']);
				}
			},
			{
				targets: 4,
				render: function (data, type, full, meta) {
					return formatColumnText(full['prioridade']);
				}
			},
			{
				targets: 5,
				visible: true,
				render: function (data, type, full, meta) {
					return formatColumnText(full['id_projeto']);
				}
			},
			{
				targets: -1,
				render: function (data, type, full, meta) {
					var buttons = [
						{
							text: 'Edit',
							action: './tarefas.html?id=' + id_projeto + '&id_tarefa=' +full['id'],
							icon: 'edit',
							class: ''
						},
						{
							text: 'Del',
							action: './tarefas.html?id=' + id_projeto + '&id_tarefa=' +full['id'],
							icon: 'edit',
							class: ''
						},
					]
					return formatColumnButtons(buttons);
				}
			}
		],
	});

	function formatColumnText(text) {
		var $rowOutput =
			'<div class="d-flex justify-content-left align-items-center">' +
			'<div class="d-flex flex-column">' +
			'<h6 class="user-name text-truncate mb-0">' +
			text +
			'</h6>' +
			'</div>' +
			'</div>';
		return $rowOutput;
	}

	function formatColumnButtons(buttons) {
		var ret = '<div class="d-flex align-items-center col-actions">';
		$.each(buttons, function (index, button) {
			if (button.property == null) {
				button.property = '';
			}
			ret += '<a href="' + button.action + '" class="dropdown-item ' + button.class + '" ' + button.property + '>' + button.text + '</a>';
		});
		ret += '</div>';
		return ret;
	}
});