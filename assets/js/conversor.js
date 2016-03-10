(function(exports) {
  "use strict";
  function exp_reg(cadena){
  var regexp = XRegExp('^(\\s*)              # Blancos                                  '+
                        '(?<val> ([-+]?\\d+(?:\\.\\d+)?)\\s*(e[-+]?\\d+(?:\\.\\d+)?)?)  '+
                        '(\\s*)                                                         '+
                        '(?<tipo> [fck])     # Tipo_temperatura                         '+
                        '(\\s*)                                                         '+
                        '(a?)                # opcional                                 '+
                        '(\\s*)                                                         '+
                        '(?<destino> [fck])  # temperatura_destino                      '+
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

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;

  exports.convertir = function() {
  console.log("entre a convertir");
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted');
    //console.log("valor(med): " + valor);
    valor = exp_reg(valor);

    if (valor) {
      var numero = valor.val;
      var tipo = valor.tipo;
      tipo = tipo.toLowerCase();
      var to = valor.destino;
      to = to.toLowerCase();
      numero = parseFloat(numero);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          if (to == 'f') {
            elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          }else if(to == 'k'){
            elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
          }else{
            elemento.innerHTML = celsius.valor_ + " Celsius";
          }
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          if (to == 'c') {
            elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          }else if(to == 'k'){
            elemento.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvin";
          }else{
            elemento.innerHTML = farenheit.valor_ + " Farenheit";
          }
          break;
        case 'k':
          var kelvin = new Kelvin(numero);
          if (to == 'f') {
            elemento.innerHTML = kelvin.toFarenheit().toFixed(2) + " Farenheit";
          }else if(to == 'c'){
            elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
          }else{
            elemento.innerHTML = kelvin.valor_ + " Kelvin";
          }
          break;

        default:
          //console.log("entre al del case");
          elemento.innerHTML = "Introduzca algo como 32c a F"
      }
    }
    else{
      //console.log("entre al del final");
      elemento.innerHTML = "Introduzca algo como 32c a F";
    }
  };
})(this);
