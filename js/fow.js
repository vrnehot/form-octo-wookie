//FORM-OCTO-WOOKIE!!
/*REQUIRE:
any addEventListener polyfill
*/
(function(window,und){
	var doc = window.document;
	var fpref = 'form-octo-wookie_';

	/* helpers */
	function ext(){
		var i,j,arg = arguments;
		for(i = 1; i < arg.length; i++){
<<<<<<< HEAD
			for(var j in arg[i])if(arg[i].hasOwnProperty(j)){ arg[0][j] = arg[1][j]; }
=======
			for(var j in arg[i])if(arg[i].hasOwnProperty(j)){ arg[0][j] = arg[i][j]; }
>>>>>>> e25def808fb64b04615edc35659c5f48ad72df8e
		}
	}
	var isCtrl = false, isShift = false;
	doc.addEventListener('keyup',function(e){
		var keyCode = ('which' in e) ? e.which : e.keyCode;
		if(keyCode == 17){ isCtrl = false; }
		if(keyCode == 16){ isShift = false; }
	});
	doc.addEventListener('keydown',function(e){
		var keyCode = ('which' in e) ? e.which : e.keyCode;
		if(keyCode == 17){ isCtrl = true; }
		if(keyCode == 16){ isShift = true; }
	});
	/* helpers */

	function inp(){
		var opt,type,obj;
		if(typeof arguments[0] == 'object'){ opt = arguments[0]; }
		else{ opt = { type:arguments[0] }; }
		obj = new inp[opt.type](opt);
		// Добавить в глобальную базу объектов, на форму, еще кудато
		return obj;
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
				z._addInp();
				if(z.validate){ z._addMessage(); }
			}
			, _events:function(){/*events*/}
			, _addLabel:function(){
				var z = this;
				z.el_label = doc.createElement('div');
				z.el_label.className = fpref+'label';
				z.el_label.innerHTML = z.label;
				z.elem.appendChild(z.el_label);
			}
			, _addHint:function(){
				var z = this;
				z.el_hint = doc.createElement('div');
				z.el_hint.className = fpref+'hint';
				z.el_hint.innerHTML = z.hint;
				z.elem.appendChild(z.el_hint);
			}
			, _addMessage:function(){}
			, _addInp:function(){/* сам инпут */ throw('call virtual method _addInp');}
			, val:function(){
				var z = this;
				if(arguments.length){ return z._set.apply(this,arguments); }
				return z._get();
			}
			, _get:function(){ /* возврат значения */ throw('call virtual method _get'); }
			, _set:function(value){ /* установка значения */ throw('call virtual method _set'); }
		}
		, callbacks:{
			$callbacks:true
			, invoke:function(ev){
				var z = this,i;
				if(!z.callbacks){ z.callbacks = {}; }
				if(!z.callbacks[ev]){ return; }
				for( i = 0; i < z.callbacks.length; i++)if(z.callbacks[i]){
					z.callbacks[i].fn.call(z.callbacks[i].context || z);
				}
			}
			, addListener:function(ev,fn,ct){
				var z = this;
				if(!z.callbacks){ z.callbacks = {}; }
				if(!z.callbacks[ev]){ z.callbacks[ev] = []; }
				z.callbacks[ev].push({
					event:ev
					, func:fn
					, context:ct
				});
			}
			, removeListener:function(ev,fn){
				var z = this,i;
				if(!z.callbacks){ z.callbacks = {}; }
				if(!z.callbacks[ev]){return;}
				for(i = 0; i < z.callbacks.length; i++)if(z.callbacks[i]){
					if(fn){ if(z.callbacks[i].fn === fn){ z.callbacks[i] = null; } }
					else{ z.callbacks[i] = null; }
				}
			}
			, pauseListener:function(ev,fn){}
			, playListener:function(ev,fn){}
		}
		, sequence:{
			$sequence:true
			, next:function(){/* следующее значение */ throw('call virtual method next');}
			, prev:function(){/* предыдущее значение */ throw('call virtual method prev');}
		}
	};
	inp.text = function(opt){ ext(this,opt); this.init(); }
	ext(inp.text.prototype
		, faces.inp
		, faces.callbacks
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
			, _get:function(){ var z = this; return z.inp.value; }
			, _set:function(val){ var z = this; z.inp.value = val; }
		}
	);
//var keyCode = ('which' in event) ? event.which : event.keyCode;
	inp.number = function(opt){ ext(this,opt); this.init(); }
	ext(inp.number.prototype
		, faces.inp
		, faces.callbacks
		, faces.sequence
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
			, _get:function(){ var z = this; return z.inp.value; }
			, _set:function(val){ var z = this; z.inp.value = val; }
			, _events:function(){
				var z = this;
				z.inp.addEventListener('input',function(e){
					var keyCode = ('which' in e) ? e.which : e.keyCode;
					if(
						( ~[46, 8, 9, 27, 13, 110, 190].indexOf(keyCode) )
						|| ( keyCode == 65 && isCtrl )
						|| ( keyCode == 67 && isCtrl )
						|| ( keyCode == 88 && isCtrl )
						|| ( keyCode > 34 && keyCode < 40 )
					){ return; }
					if((isShift || (keyCode < 48 || keyCode > 57)) && (keyCode < 96 || keyCode > 105)){ e.preventDefault(); }
				});
			}
			, next:function(){
				var z = this,val;
				val = parseFloat(z._get());
				val++;
				z._set(val);
				return val;
			}
			, prev:function(){
				var z = this,val;
				val = parseFloat(z._get());
				val--;
				z._set(val);
				return val;
			}
		}
	);

	window.fow = inp;
})(window);
