const divPresupuesto = document.getElementById("presupuesto");
const divPorcentaje = document.getElementById("porcentaje");
const divIngresos = document.getElementById("ingresos");
const divEgresos = document.getElementById("egresos");
const divListaIngreso = document.getElementById("lista-ingresos");
const divListaEgreso = document.getElementById("lista-egresos");

const ingresos = [
    new Ingreso("Sueldo", 2100.00),
    new Ingreso("venta coche", 1500),
    new Ingreso("Sueldo", 2100.00),
    new Ingreso("venta coche", 1500)
];

const egresos = [
    new Egreso("alquiler", 900),
    new Egreso("ropa", 400),
    new Egreso("alquiler", 900),
    new Egreso("ropa", 400)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
};

let totalIngresos = () => {
    let totalIngreso = 0;

    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }

    return totalIngreso;
};

let totalEgresos = () => {
    let totalEgreso = 0;

    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }

    return totalEgreso;
};

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();

    if(isNaN(porcentajeEgreso)){
        porcentajeEgreso = 0.00;
    }

    divPresupuesto.innerHTML = formatoMoneda(presupuesto);
    divPorcentaje.innerHTML = formatoPorcentaje(porcentajeEgreso);
    divIngresos.innerHTML = formatoMoneda(totalIngresos());
    divEgresos.innerHTML = formatoMoneda(totalEgresos());
};

const formatoMoneda = (valor) => {
    return valor.toLocaleString("en-US", {
        style: 'currency',
        currency: 'USD', minimumFractionDigits: 2
    });
};

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("en-US", { style: 'percent', minimumFractionDigits: 2 })
};

const cargarIngresos = () => {
    let ingresosHtml = "";

    for (let ingreso of ingresos) {
        ingresosHtml += crearIngresoHtml(ingreso);
    }

    divListaIngreso.innerHTML = ingresosHtml;

};

const crearIngresoHtml = (ingreso) => {
    let ingresosHtml = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>
`;

    return ingresosHtml;
};

const cargarEgresos = () => {
    let egresosHtml = "";

    for (let egreso of egresos) {
        egresosHtml += crearEgresoHtml(egreso);
    }

    divListaEgreso.innerHTML = egresosHtml;

};

const crearEgresoHtml = (egreso) => {
    let porcentaje = egreso.valor / totalEgresos();

    if(isNaN(porcentaje)){
        porcentaje = 0.00;
    }

    let egresosHtml = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(porcentaje)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                onclick="eliminarEgreso(${egreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>
`;

    return egresosHtml;
};

const eliminarIngreso = (id) => {
   let indexEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
   ingresos.splice(indexEliminar, 1);
   cargarCabecero();
   cargarIngresos();
};

const eliminarEgreso = (id) => {
    let indexEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indexEliminar, 1);
    cargarCabecero();
    cargarEgresos();
 };

 const agregarDato = () => {
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];

    if(descripcion.value !== "" && valor.value !== ""){
        if(tipo.value === "ingreso"){
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
        } else if(tipo.value === "egreso"){
            egresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
 };