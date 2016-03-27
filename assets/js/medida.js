(function(exports) {
  "use strict";

//---Cadenas para las expresiones regulares---
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
    //---Si me introducen las dos variables---
    if (tipo) {
      console.log("Se pasaron dos parametros");
      this.valor_ = valor;
      this.tipo_ = tipo;
    //---Si introducen toda la temperatura como un sólo argumento---
    }else {
      var med = XRegExp.exec(valor,XRegExp( reg1 ,'xi'));
      if (med) {
        var val = med.val;
        val = parseFloat(val);
        var tip = med.tipo;
        this.valor_ = val;
        this.tipo_ = tip;
      }
    }
  };
   Medida.prototype.constructor = Medida;
   //---Tabla hash donde se almacenarán las parejas identificador de la medida y la clase de la medida---
   Medida.prototype.measures = {} || 0;
   Medida.prototype.toS = function (){
     return this.valor_;
   };
   Medida.prototype.type = function(){
     return this.tipo_;
   };

  //Medida.protoype.convertir = function(valor) {
  Medida.prototype.convertir = function(valor) {

    var match = XRegExp.exec(valor,XRegExp( reg1+reg2 ,'xi'));
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
      //---Creamos un objeto de la medida tipo a través de la tabla measures---
      var source = new measures[tipo](numero);
      //---Obtenemos mediante la tabla measures la medida destino de la conversión---
      var target = "to"+measures[to].name;
      //---Ordenamos al objeto convertirse, lo que nos devuelve un objeto del tipo destino---
      var resultado = source[target]();
      return resultado.toS() + " " + to;
    }
    catch(err){
      return 'Desconozco como convertir desde "'+tipo+'" hasta "'+to+'"';
    }
  }
    else{
      return "Introduzca algo como 32c a F";
    }
  };
  exports.Medida  = Medida;
})(this);
