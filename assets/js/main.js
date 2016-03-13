(function(exports) {
  "use strict";
  function main() {
    console.log("entre a convertir");
      var valor     = document.getElementById('convert').value,
          elemento  = document.getElementById('converted');
      console.log("En medida: "+ Medida.convertir(valor));
      elemento.innerHTML = Medida.convertir(valor);
      return false;
  }
  exports.main = main;
})(this);
