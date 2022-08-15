//Agregando funcionalidades
let autos = require("./autos/1-ejercicio");

let persona = {
  nombre: "Juan",
  capacidadDePagoEnCuotas: 20000,
  capacidadDePagoTotal: 100000
  }

let concesionaria = {
  autos: autos,
  
  buscarAuto: function(patenteRequerida){
    for(let i = 0; i < this.autos.length; i++){
      if(patenteRequerida == this.autos[i].patente){
        return this.autos[i];
      }
    }
    return null;
  },
  
  venderAuto: function(patenteRequerida){
    let autoBuscado = this.buscarAuto(patenteRequerida);
    if(autoBuscado != null){
      let numeroAuto = this.autos.indexOf(autoBuscado);
      this.autos[numeroAuto].vendido = true;
    }
    return autoBuscado;
  },
  
  autosParaLaVenta: function(){
    let autosParaVender = this.autos.filter(function(autoElemento){
      return !autoElemento.vendido;
    });
    return autosParaVender;
  },
     
  autosNuevos: function(){
    let autosVenta = this.autosParaLaVenta();
    let autos0KM = autosVenta.filter(function(nuevos){
      return nuevos.km < 100;
    });
    return autos0KM;
  },
  
  listaDeVentas: function(){
    let autosVendidos = this.autos.filter(function(autoElemento){
      return autoElemento.vendido;
    });
    let preciosAutosVendidos = autosVendidos.map(function(autoElemento){
      return autoElemento.precio;
    });
    return preciosAutosVendidos; 
  },
  
  totalDeVentas: function(){
    let preciosAutos = this.listaDeVentas();
    if(preciosAutos.length > 0){
      let total = preciosAutos.reduce(function(sumatoria,autoElemento){
        return sumatoria + autoElemento;
      });
      return total;
    } else {
      return 0;
    }
  },
  
  puedeComprar: function(objAuto,objPersona){
    if (
      (objAuto.precio <= objPersona.capacidadDePagoTotal) 
      && 
      ((objAuto.precio / objAuto.cuotas) <= objPersona.capacidadDePagoEnCuotas)
      ){
        return true;
       } else {
        return false;
       }
  }, 

  autosQuePuedeComprar: function(objPersona){
    let autosDisponibles = this.autosParaLaVenta();
    let autosParaComprar = [];
    for(let x of autosDisponibles){
      if(this.puedeComprar(x,objPersona) == true){
        autosParaComprar.push(x);
      }
    }
    return autosParaComprar;
  }

 /* autosQuePuedeComprar: function(persona){
  let autosDisponibles = this.autosParaLaVenta();
return autosDisponibles.filter(auto => this.puedeComprar(auto,persona));
} */
}

//console.log(concesionaria.buscarAuto('APL123'));
//console.log(concesionaria.venderAuto('APL123'));
//console.log(concesionaria.venderAuto('JJK116'));
//console.log(concesionaria.autosParaLaVenta());
//console.log(concesionaria.autosNuevos());
//console.log(concesionaria.listaDeVentas());
//console.log(concesionaria.totalDeVentas());
//console.log(concesionaria.puedeComprar("auto","persona"));
console.log(concesionaria.autosQuePuedeComprar(persona));