(function() {
  "use strict";
  function Temperatura(valor,tipo)
  {
    Medida.call(this, valor, tipo);
  };
  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;

  //---Hash de medidas---
  var measures= Medida.measures;

  //---Celsius---
  function Celsius(valor)
  {
    Temperatura.call(this, valor, 'c');
  };
  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;
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

  //---Farenheit---
  function Farenheit(valor)
  {
    Temperatura.call(this, valor, 'f');
  };
  Farenheit.prototype = new Temperatura();
  Farenheit.prototype.constructor = Farenheit;
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

  //---Kelvin---
  function Kelvin(valor)
  {
    Temperatura.call(this, valor, 'k');
  };
  Kelvin.prototype = new Temperatura();
  Kelvin.prototype.constructor = Kelvin;
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
