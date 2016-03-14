

(function(exports) {
  "use strict";
  
/*function exp_reg(cadena){
var reg1 = '^(\\s*)                                                        '+
           '(?<val> ([-+]?\\d+(?:\\.\\d+)?)\\s*(e[-+]?\\d+(?:\\.\\d+)?)?)  '+
           '(\\s*)                                                         '+
           '(?<tipo> [fck])                                                '+
           '(\\s*)                                                         ';
var reg2 = '(a?)                                                           '+
           '(\\s*)                                                         '+
           '(?<destino> [fck])                                             '+
           '(\\s*)$                                                        ';
var regexp = XRegExp( reg1+reg2 ,'xi');

var med = XRegExp.exec(cadena, regexp);
return med;
}*/
var reg1 = '^(\\s*)                                                        '+
           '(?<val> ([-+]?\\d+(?:\\.\\d+)?)\\s*(e[-+]?\\d+(?:\\.\\d+)?)?)  '+
           '(\\s*)                                                         '+
           '(?<tipo> [fck])                                                '+
           '(\\s*)                                                         ';
var reg2 = '(a?)                                                           '+
           '(\\s*)                                                         '+
           '(?<destino> [fck])                                             '+
           '(\\s*)$                                                        ';

  function Medida(valor,tipo)
  {
    //console.log("entre en medida");
    this.valor_ = valor;
    this.tipo_ = tipo;
    if (tipo) {
      this.valor_ = valor;
      this.tipo_ = tipo;
    }else {
      //var med = exp_reg(valor);
      var regex = XRegExp( reg1 ,'xi');
      var med = XRegExp.exec(valor,regex);
      if (med) {
        var val = med.val;
        val = parseFloat(val);
        var tip = med.tipo;
        this.valor_ = val;
        this.tipo_ = tip;
      }
    }
  };
   Medida.constructor = Medida;
   Medida.measures = {} || 0;

  Medida.convertir = function(valor) {

    //var match = exp_reg(valor);
    var regex = XRegExp( reg1+reg2 ,'xi');
    var match = XRegExp.exec(valor,regex);
    if (match) {
      //console.log("entre al if");
      var numero = match.val;
      var tipo = match.tipo;
      tipo = tipo.toLowerCase();
      var to = match.destino;
      to = to.toLowerCase();
      numero = parseFloat(numero);
      //console.log("numero "+numero+" tipo "+tipo+" destino "+ to);
    try{
      var measures = Medida.measures;
      var source = new measures[tipo](numero);
      //console.log("Origen"+ source);
      var target = "to"+measures[to].name;
      //console.log("Target"+target);
      //console.log("Devuelvo"+source[target]());
      return source[target]().toFixed(2) + " "+to;
    }
    catch(err){
      //console.log('Desconozco como convertir desde "'+tipo+'" hasta "'+to+'"');
      return 'Desconozco como convertir desde "'+tipo+'" hasta "'+to+'"';
    }
  }
    else{
      //console.log("entre al del final");
      return "Introduzca algo como 32c a F";
    }
  };
  exports.Medida  = Medida;
})(this);
