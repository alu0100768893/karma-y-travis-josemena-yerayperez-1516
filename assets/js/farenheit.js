(function(exports) {
  "use strict";

function Farenheit(valor)
{
  Temperatura.call(this, valor, 'f');
};
Farenheit.prototype = new Temperatura();
Farenheit.prototype.constructor = Farenheit;
var measures = Medida.measures;
measures.f = Farenheit;
Farenheit.prototype.toCelsius = function(){
  var resultado = (this.valor_ - 32)*(5/9);
  var objetoResultado = new Celsius(resultado);
  return objetoResultado;
};
Farenheit.prototype.toKelvin = function(){
  var resultado = ((this.valor_ - 32)*(5/9)) + 273;
  var objetoResultado = new Kelvin(resultado);
  return objetoResultado;
};
Farenheit.prototype.toS = function(){
  return this.valor_;
};
})(this);
