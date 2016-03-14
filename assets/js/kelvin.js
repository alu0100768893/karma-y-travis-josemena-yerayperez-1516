(function(exports) {
  "use strict";
function Kelvin(valor)
{
  Temperatura.call(this, valor, 'k');
};
Kelvin.prototype = new Temperatura();
Kelvin.prototype.constructor = Kelvin;
var measures= Medida.measures;
measures.k = Kelvin;
Kelvin.prototype.toCelsius = function(){
  var resultado = this.valor_ - 273;
  var objetoResultado = new Celsius(resultado);
  return objetoResultado;
};
Kelvin.prototype.toFarenheit = function(){
  var resultado = ((this.valor_ - 273) * (9/5))+32
  var objetoResultado = new Farenheit(resultado);
  return objetoResultado;
};
Kelvin.prototype.toS = function(){
  return this.valor_;
};
})(this);
