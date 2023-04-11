const divPresupuesto = document.getElementById("presupuesto");
const divPorcentaje = document.getElementById("porcentaje");
const divIngresos = document.getElementById("ingresos");
const divEgresos = document.getElementById("egresos");

const ingresos = [
    new Ingreso("Salario", 2100.00),
    new Ingreso("venta coche", 1500)
];

const egresos = [
    new Egreso("renta", 900),
    new Egreso("ropa", 400)
];

let cargarApp = () => {
    cargarCabecero();
}

let totalIngresos = () => {
    let totalIngreso = 0;

    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }

    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;

    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }

    return totalEgreso;
}


let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
   
    divPresupuesto.innerHTML = presupuesto;
    divPorcentaje.innerHTML = porcentajeEgreso;
    divIngresos.innerHTML = totalIngresos();
    divEgresos.innerHTML = totalEgresos();
}