(function(exports) {
  "use strict";
function Temperatura(valor,tipo)
{
  Medida.call(this, valor, tipo);
};
Temperatura.prototype = new Medida();
Temperatura.prototype.constructor = Temperatura;
})(this);
