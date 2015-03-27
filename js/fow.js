(function(window,und){
	var doc = window.document;
	function ext(){
		var i,j,arg = arguments;
		for(i = 1; i < arg.length; i++){
			for(var j in arg[i]).if(arg[i].hasOwnProperty(j)){ arg[0][j] = arg[1][j]; }
		}
	}
	function inp(){
		var opt;
		if(typeof arguments[0] == 'object'){ opt = arguments[0]; }
		else{ opt = { type:arguments[0] }; }
	}
	var faces = {
		inp:{
			$inp:true
			, label:''
			, label_pos:'before'
			, hint:''
			, init:function(){
				this._dom();
				this._events();
			}
			, _dom:function(){
				var z = this;
				z.elem = doc.createElement('label');
				if(z.label){ z._addLabel(); }
				if(z.hint){ z._addHint(); }
			}
			, _events:function(){
				var z = this;
				if(z.validate)
			}
			, _addLabel:function(label){}
			, _addInp:function(){/* сам инпут */}
			, val:function(){/* получение значения */}
		}
		, callbacks:{
			$callbacks:true
			, invoke:function(){}
		}
	};
	inp.text = function(opt){
		ext(this,opt);
	}
	ext(inp.text.prototype
		, faces.inp
		, {
			_addInp:function(){
				var z = this;
				z.inp = doc.createElement('input');
				z.inp.type = 'text';
				z.inp.name = z.name;
				z.inpWrap = doc.createElement('div');
				z.inpWrap.appendChild(z.inp);
				z.elem.appendChild(z.inpWrap);
				// добавить свистелки и свистульки
			}
		}
	);
})(window);
