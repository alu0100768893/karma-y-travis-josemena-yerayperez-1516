(function(exports) {
  "use strict";

  function Medida(valor,tipo)
  {
    console.log("entre en medida");
    console.log("valor: " + valor);
    console.log("tipo: " + tipo);
    this.valor_ = valor;
    this.tipo_ = tipo;
    /*if (tipo) {
      this.valor_ = valor;
      this.tipo_ = tipo;
    }else {
      var regexp = /^\s*([-+]?\d+(?:\.\d+)?)\s*(e[-+]?\d+(?:\.\d+)?)?\s*([fFcCkK])\s*(a)?\s*([cCkKfF])\s*$/;
      var med = valor.match(regexp);
      if (med[2]) {
        var val = med[1];
        var exp = med[2];
        val = val.toString()+exp.toString();
        val = parseFloat(val);
        var tip = med[3];
        this.valor_ = val;
        this.tipo_ = tip;
      }else {
        var val = med[1];
        var tip = med[3];
        this.valor_ = val;
        this.tipo_ = tip;
      }
    }*/
  };

  function Temperatura(valor,tipo)
  {
    Medida.call(this, valor, tipo);
  };
  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;


  function Celsius(valor)
  {
    Temperatura.call(this, valor, 'c');
  };
  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;
  Celsius.prototype.toFarenheit = function(){
    var resultado = (this.valor_ * (9/5))+32;
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

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;

  exports.convertir = function() {
  //function convertir() {
  console.log("entre a convertir");
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp, PREGUNTAR POR ESTO */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?)\s*(e[-+]?\d+(?:\.\d+)?)?\s*([fFcCkK])\s*(a)?\s*([cCkKfF])\s*$/;
    valor = valor.match(regexp);

    if (valor) {
      if (valor[2]) {
        var numero = valor[1],
            exp = valor[2];
        numero = numero.toString()+exp.toString();
        var tipo = valor[3];
      }else {
      var numero = valor[1],
          tipo   = valor[3].toLowerCase();
      }
      var to = valor[5].toLowerCase();
      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          if (to == 'f') {
            elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          }else {
            elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
          }
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          if (to == 'c') {
            elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          }else {
            elemento.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvin";
          }
          break;
        case 'k':
          var kelvin = new Kelvin(numero);
          if (to == 'f') {
            elemento.innerHTML = kelvin.toFarenheit().toFixed(2) + " Farenheit";
          }else {
            elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
          }
          break;

        default:
          elemento.innerHTML = "Introduzca algo como 32c a F"
      }
    }
    else
      elemento.innerHTML = "Introduzca algo como 32c a F";
  };
})(this);
