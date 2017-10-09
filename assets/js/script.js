var API = "https://consulta-veiculos.nimble.com.br/v1";

$(document).ready(function(){
	$(".btn-plus").click(function(){
		callAdd();
	});
	
	$("#nFechar").click(function(){
		$("#modal").hide();
	});
	
	$("#buscar").keypress(function(e) {
	    if(e.which == 13) {
	    	buscarVeiculos($(this).val());
	    }
	});
	
	buscarVeiculos("");
});

$.support.cors = true;

function buscarVeiculos(criteria){
	if (criteria.length > 0) {
		var filtro ="?filters=veiculo@"+criteria;
	} else {
		var filtro = "";
	}
	$.ajax({url:API+"/veiculos"+filtro, type:"get", dataType:"json", data:[], crossDomain: true,
		success: function(resp){
			for(aux in resp) {
				$("#listar .listaGp").append(
					'<div class="item" onClick="detalhes('+aux._id+')">'+
							'<div class="info">'+
								'<span class="item-titulo">'+aux.veiculo+'</span>'+
								'<span class="item-modelo">'+aux.marca+'</span>'+
								'<span class="item-ano">'+aux.ano+'</span>'+
							'</div>'+
							'<div class="icon-tag"></div>'+
						'</div>'
				);
			}
	}});
}

function detalhes(id){
	$.ajax({url:API+"/veiculos/"+id, type:"get", crossDomain: true,
		success: function(resp){
			$("#detalhes").append(
				'<div class="dt-body">'+
					'<div id="detalhes-header">'+
						'<div class="titulo">'+
							resp.veiculo+
						'</div>'+
						'<div id="dtMarca" class="dt-header-block">'+
							'<label>Marca</label>'+
							'<span>'+resp.marca+'</span>'+
						'</div>'+
						'<div id="dtAno" class="dt-header-block">'+
							'<label>ANO</label>'+
							'<span>'+resp.ano+'</span>'+
						'</div>'+
					'</div>'+
					'<div id="descricao">'+
						resp.descricao+
					'</div>'+
					'<div id="bottomBar">'+
						'<button onClick="callUpdate('+resp._id+')">EDITAR</button>'+
						'<div class="icon-tag"></div>'+
					'</div>'+
				'</div>'
			);
	}});
}

function callAdd(){
	$("nAdd").attr("onclick", "add()");
	$("nAdd").html("ADD");
	$("#modal").show();
}

function callUpdate(id){
	$("nAdd").attr("onclick", "update("+id+")");
	$("nAdd").html("ATUALIZAR");
	$("#modal").show();
}

function add(){
	var data = {
		"veiculo": $("#nVeiculo").val(),
		"marca": $("#nMarca").val(),
		"ano": $("#nAno").val(),
		"descricao": $("#nDescricao").val(),
		"vendido": $("#nVendido:checked").length>0
	};
	
	$.ajax({url:API+"/veiculos", type:"post", data:data, crossDomain: true,
		success: function(resp){
			$("#modal").hide();
			buscarVeiculos("");
	}});
}

function update(id){
	var data = {
		"veiculo": $("#nVeiculo").val(),
		"marca": $("#nMarca").val(),
		"ano": $("#nAno").val(),
		"descricao": $("#nDescricao").val(),
		"vendido": $("#nVendido:checked").length>0
	};
	
	$.ajax({url:API+"/veiculos/"+id, type:"put", data:data, crossDomain: true,
		success: function(resp){
			$("#modal").hide();
			buscarVeiculos("");
	}});
}