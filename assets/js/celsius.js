(function(exports) {
  "use strict";

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
})(this);
