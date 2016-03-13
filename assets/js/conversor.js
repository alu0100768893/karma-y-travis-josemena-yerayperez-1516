

(function(exports) {
  "use strict";

function exp_reg(cadena){
var regexp = XRegExp('^(\\s*)                                                       '+
                      '(?<val> ([-+]?\\d+(?:\\.\\d+)?)\\s*(e[-+]?\\d+(?:\\.\\d+)?)?)  '+
                       '(\\s*)                                                         '+
                      '(?<tipo> [fck])                                                '+
                       '(\\s*)                                                         '+
                       '(a?)                                                           '+
                       '(\\s*)                                                         '+
                       '(?<destino> [fck])                                             '+
                      '(\\s*)$                                                        ','xi');
var med = XRegExp.exec(cadena, regexp);
return med;
}


  function Medida(valor,tipo)
  {
    console.log("entre en medida");
    //console.log("valor: " + valor);
    //console.log("tipo: " + tipo);
    //this.valor_ = valor;
    //this.tipo_ = tipo;
    if (tipo) {
      this.valor_ = valor;
      this.tipo_ = tipo;
    }else {
      var med = exp_reg(valor);
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
   Medida.measures = {};
// si pongo la funcion Temperatura en otro fichero da error
// si lo dejo aquí no .

  function Temperatura(valor,tipo)
  {
    Medida.call(this, valor, tipo);
  };

  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;
  exports.Temperatura = Temperatura;

  function Celsius(valor)
  {
    Temperatura.call(this, valor, 'c');
  };
  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;
  Celsius.prototype.toFarenheit = function(){
    var resultado = (this.valor_ * (9/5))+32;
    console.log("valor resultado: " + resultado);
    return resultado;
  };
  Celsius.prototype.toKelvin = function(){
    var resultado = this.valor_ + 273;
    return resultado;
  };

  function Farenheit(valor)
  {
    Temperatura.call(this, valor, 'f');
  };
  Farenheit.prototype = new Temperatura();
  Farenheit.prototype.constructor = Farenheit;
  Farenheit.prototype.toCelsius = function(){
    var resultado = (this.valor_ - 32)*(5/9);
    return resultado;
  };
  Farenheit.prototype.toKelvin = function(){
    var resultado = ((this.valor_ - 32)*(5/9)) + 273;
    return resultado;
  };

  function Kelvin(valor)
  {
    Temperatura.call(this, valor, 'k');
  };
  Kelvin.prototype = new Temperatura();
  Kelvin.prototype.constructor = Kelvin;
  Kelvin.prototype.toCelsius = function(){
    var resultado = this.valor_ - 273;
    return resultado;
  };
  Kelvin.prototype.toFarenheit = function(){
    var resultado = ((this.valor_ - 273) * (9/5))+32
    return resultado;
  };


   exports.Medida  = Medida;
  exports.Temperatura = Temperatura;

  //exports.Celsius = Celsius;
  //exports.Farenheit = Farenheit;
  //exports.Kelvin = Kelvin;

  Medida.convertir = function(valor) {

    //valor = exp_reg(valor);

    var measures= Medida.measures;
        measures.c = Celsius;
        measures.k = Kelvin;
        measures.f = Farenheit;

    var match = exp_reg(valor);

    if (match) {
      console.log("entre al if");
      var numero = match.val;
      var tipo = match.tipo;

      tipo = tipo.toLowerCase();
      var to = match.destino;
      to = to.toLowerCase();
      numero = parseFloat(numero);
      console.log("numero "+numero+" tipo "+tipo+" destino "+ to);
    try{

      var source = new measures[tipo](numero);
      console.log("Origen"+ source);
      var target = "to"+measures[to].name;
      console.log("Target"+target);
      console.log("Devuelvo"+source[target]());
      return source[target]().toFixed(2) + " "+to;
  

    }
    catch(err){
      console.log('Desconozco como convertir desde "'+tipo+'" hasta "'+to+'"');
      return "algo no va bien soy el catch";
    }
  }
    else{
      console.log("entre al del final");
      return "Introduzca algo como 32c a F";
    }
  };
})(this);
