/*!
 * Table Count v0.1
 * Presione o SHIT para somar valore em uma tabela
 *
 * https://github.com/goforu/Table-Selector
 *
 * by Fernando Valler
 */
(function($) {

	$('body').append('<div id="_selectcount"></div>');
	$('head').append('<style>div#_selectcount {position: fixed; top:0;z-index: 99999;}div#_selectcount #selectcount_sum {color: #FFF; font-family: Arial, sans-serif; font-size: 14px; white-space: nowrap; z-index: 99999; background-color: rgba(2, 140, 185, 0.97); overflow: hidden; /* padding: 10px; */ transition: opacity 0.2s ease 0s;}div#_selectcount #selectcount_sum b { color: rgb(209, 230, 255); display: inline-block; font-weight: 200; margin: 0px 1px; padding: 12px 12px 12px 0px;}div#_selectcount #selectcount_sum b i {font-style: normal; padding-left: 6px; font-weight: 700; color: white;}td._highlighted_  { background: #b5d5ff !important; }</style>');

	var isMouseDown = false,
		isHighlighted;

	function _moeda(valor) {
		_valor = valor.split('.').join('');
		_valor = _valor.replace(',', '.');
		_valor = _valor.replace('R$', '');

		//Remover tags html
		_valor = _valor.replace(/(<([^>]+)>)/ig, "");
		return parseFloat(_valor);
	}

	//Limpa os dados
	function clear() {
		var selected = $('._highlighted_');

		if (typeof selected !== 'undefined' && selected.length > 0) {
			$.each(selected, function(index, val) {
				//remover todas as class
				$(this).removeClass('_highlighted_');
			});
		}
		$('#_selectcount').html('');
	}


	//calcula os dados
	function soma() {
		var options = '';
		var soma = parseFloat(0);
		var media = 0;
		var mim = 0;
		var max = 0;
		var array = [];
		var selected = $('._highlighted_');

		if (typeof selected !== 'undefined' && selected.length > 0) {

			//Calcula a soma
			$.each(selected, function(index, val) {
				var _val_ = $(this).html();
				if (_val_) {
					_var = _moeda(_val_);
					array.push(_var);
					soma += _var;
				}
			});
			soma_final = soma.toLocaleString('pt-BR');
			media = (soma / parseInt(selected.length)).toLocaleString('pt-BR')
			min = Math.min.apply(Math, array);
			max = Math.max.apply(Math, array);

			//Contagem
			options = '<b>Cont.: <i>' + parseInt(selected.length) + '</i></b>';

			//Se a soma for NaN nao exibe essas informacoes
			if (!isNaN(soma)) {
				options += '<b>Soma: <i>' + soma_final + '</i></b>';

				options += '<b>Média: <i>' + media + '</i></b>';

				options += '<b>Min: <i>' + min + '</i></b>';

				options += '<b>Max: <i>' + max + '</i></b>';
			}

			$('#_selectcount').html('<div id="selectcount_sum">' + options + '</div>');
		}
	}

	$("table td").mousedown(function(evt) {
			if (evt.shiftKey) {
				isMouseDown = true;
				$(this).toggleClass("_highlighted_");
				isHighlighted = $(this).hasClass("_highlighted_");
				soma();
				return false; //evitar a seleção do texto
			}
		})
		.mouseover(function(evt) {
			if (evt.shiftKey) {
				if (isMouseDown) {
					$(this).toggleClass("_highlighted_", isHighlighted);
					soma();
				}
			}

		})
		.bind("selectstart", function(evt) {
			if (evt.shiftKey) {
				return false; //evitar a seleção do texto
			}
		});

	$(document).mouseup(function(evt) {

		if (evt.shiftKey) {
			isMouseDown = false;
		} else {
			clear();
		}
	});

})(jQuery);