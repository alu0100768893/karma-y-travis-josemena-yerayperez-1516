(function(exports) {
  "use strict";

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
})(this);
