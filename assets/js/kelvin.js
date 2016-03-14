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
  return resultado;
};
Kelvin.prototype.toFarenheit = function(){
  var resultado = ((this.valor_ - 273) * (9/5))+32
  return resultado;
};
})(this);
