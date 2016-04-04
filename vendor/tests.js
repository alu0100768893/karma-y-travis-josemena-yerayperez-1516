var assert = chai.assert;
var expect = chai.expect;

describe("Pruebas para Medida", function() {

    //hay que hacer pruebas para Celsius, Kelvin, Farenheit, Temperatura y Medida.
    //y para cada una de sus funciones.
  it("Contstructor con un parámetro de entrada", function() {
    var med = new Medida("32F");
    expect(med.toS()).to.equal(32);
  });

  it("Pasando dos parámetros", function() {
    var med = new Medida(45,"C");
    expect(med.toS()).to.equal(45);
  });
  
  it("Definiendo tipo", function() {
    var med = new Medida(45,"C");
    expect(med.type()).to.equal('C');
  });

  it('Comrprobar salida que no sea un string', function() {
        var med = new Medida(45,"C");
        assert.typeOf(med.type(),'string','La salida es un String');
    });
    
 it("Convertir de f a c", function() {
   var med = new Medida();
                expect(med.convertir("32 F a C")).to.equal('0 c'); 
            });
            
  it("Convertir de f a k", function() {
   var med = new Medida("0c");
                expect(med.convertir("32 f a k")).to.equal('273 k'); 
            });
            
  it("Convertir de c a k", function() {
   var med = new Medida("0c");
                expect(med.convertir('32 c a k')).to.equal('305 k'); 
            });
    
   it ("Prueba crear Temperatura", function(){
     
       var temp = new Temperatura(32,'c');
       expect(temp.toS()).to.equal(32);
   }); 
            
  // Queria hacer una comprobacion que seleciona cada parte de la cadena introducida pero no hay una funcion
  //usamos una llamada a dos cadenas
});

describe("Pruebas Temperatura", function() {
   
   it ("Prueba crear Temperatura", function(){
     
       var temp = new Temperatura(32,'c');
       expect(temp.toS()).to.equal(32);
   }); 
   
   describe("Prueba diferentes Temperaturas",function() {
      it ("Prueba Farenheit", function() {
          var far = new Farenheit(32);
          expect(far.toS()).to.equal(32)
      }) ;
      
      it ("Prueba Celcius", function() {
          var far = new Celsius(32);
          expect(far.toS()).to.equal(32)
      }) ;
      
      it ("Prueba Kelvin", function() {
          var far = new Kelvin(32);
          expect(far.toS()).to.equal(32)
      }) ;
      
      
   });
});

describe("Tests Sinon", function(){
 	var sandbox;
 
 	beforeEach(function(){
 		sandbox = sinon.sandbox.create();
 		sandbox.stub(window.console, "log");
 		sandbox.stub(window.console, "error");
 	});
 
 	afterEach(function(){
 		sandbox.restore();
 	});

 	describe("Mensajes de ayuda", function(){
 		it("Comprobamos si se pasaron dos parametros a medida", function(){
 			var medida = new Medida(32,'c');
 			sinon.assert.calledWithExactly(console.log, "Se pasaron dos parametros");
 		});
 	});
 }) 