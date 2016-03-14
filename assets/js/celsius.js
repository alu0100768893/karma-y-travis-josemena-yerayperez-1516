(function(exports) {
  "use strict";

  function Celsius(valor)
  {
    Temperatura.call(this, valor, 'c');
  };
  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;
  var measures= Medida.measures;
  measures.c = Celsius;
  Celsius.prototype.toFarenheit = function(){
    var resultado = (this.valor_ * (9/5))+32;
    var objetoResultado = new Farenheit(resultado);
    return objetoResultado;
  };
  Celsius.prototype.toKelvin = function(){
    var resultado = this.valor_ + 273;
    var objetoResultado = new Kelvin(resultado);
    return objetoResultado;
  };
  Celsius.prototype.toS = function(){
    return this.valor_;
  };
})(this);
