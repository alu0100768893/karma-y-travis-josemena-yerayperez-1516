

(function(exports) {
  "use strict";

var reg1 = '^(\\s*)                                                        '+
           '(?<val> ([-+]?\\d+(?:\\.\\d+)?)\\s*(e[-+]?\\d+(?:\\.\\d+)?)?)  '+
           '(\\s*)                                                         '+
           '(?<tipo> [a-z]+[0-9]*)                                         '+
           '(\\s*)                                                         ';
var reg2 = '(a?)                                                           '+
           '(\\s*)                                                         '+
           '(?<destino> [a-z]+[0-9]*)                                      '+
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
      var target = "to"+measures[to].name;
      var resultado = source[target]();
      return resultado.toS() + " " + to;
    }
    catch(err){
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
