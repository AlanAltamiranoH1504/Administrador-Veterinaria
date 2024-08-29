/**
 * PROYECTO DE CITAS PARA MASCOTAS
 */

//Variables que contienen los input
const inputMascota = document.querySelector("#mascota");
const inputPropietario = document.querySelector("#propietario");
const inputTelefono = document.querySelector("#telefono");
const inputFecha = document.querySelector("#fecha");
const inputHora = document.querySelector("#hora");
const inputSintomas = document.querySelector("#sintomas");
const alertas = document.querySelector("#alertas");
const ulCitas = document.querySelector("#citas");

//Variable del formulario 
const formulario = document.querySelector("#nueva-cita");
let citas = [];

//Variable auxilar para saber si estamos editando 
let editando = false;


//Clase que controla la interfaz
class UI{
    //Funcion que  muestra alerta al usuario
    mostrarAlerta(mensaje, tipo){
        //Creamos div
        const div = document.createElement("div");

        if(tipo === "error"){
            //Agregamos contenido el div 
            div.textContent = mensaje
            //Agregamos clases de estilo erro al div 
            div.classList.add("error-alert", "alert-icon", "alert-text");
        }else{
            //Agregamos contenido al div 
            div.textContent = mensaje;
            //Agregamos estilos al div 
            div.classList.add("success-alert", "alert-icon", "alert-text");
        }
        //Llamamos a la funcion que limpia las alertas
        limpiarAlertas();
        //Agregamos el div de la alerta al div de alertas 
        alertas.appendChild(div);

        //Removemos el div despues de tres segundos
        setTimeout(() => {
            div.remove();
        }, 3000);
    }

    //Funcion que lista todos los objeto del array de citas 
    listarCitas(citas){
        //Limpiamos el ulCitas
        ulCitas.textContent = "";
        
        citas.forEach((cita) => {
            //Por cada atributo del objeto hacemos un destructuring del objeto 
            const {mascota, propietario, telefono, fecha, hora, sintomas, idCita} = cita;

            //Creamos un div
            const li = document.createElement("li");
            //Agregamos clases de estilo 
            li.classList.add("container", "container-hover", "container-typography")
            li.innerHTML = `
                <p>Id Cita: <span>${idCita}</span></p>
                <p>Nombre Mascota: <span>${mascota}</span></p> 
                <p>Nombre Propietario: <span>${propietario}</span></p> 
                <p>Telefono: <span>${telefono}</span></p>
                <p>Fecha: <span>${fecha}</span></p>
                <p>Hora: <span>${hora}</span></p> 
                <p>Sintomas: <span>${sintomas}</span></p>
            `;

            //Creamos botones de eliminar y editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', "colorAmarillo");
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', "colorRojo");
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            
            //Seteamos atributo de id a los dos botones
            btnEditar.setAttribute("data-id", idCita);
            btnEliminar.setAttribute("data-id", idCita);
            
            //Creamos contenedor para los botones
            const contenedorBotones = document.createElement("div");
            contenedorBotones.classList.add("flex", "justify-between", "mt-10");
            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);

            //Agregamos el contenedorBotones dentro del li
            li.appendChild(contenedorBotones);

            //Agregamos cada elemento como hijo del ulCitas
            ulCitas.appendChild(li);

            //Si damos click en el btnEliminar, llamamos a la funcion ElminarPaciente
            btnEliminar.onclick = ()=>{
                EliminarPaciente(idCita);
            }
            //Añadimos eventHandler al boton de editar
            btnEditar.onclick = ()=>{
                //Si damos click llamamos a la funcion cargarInformacion y le pasamos la cita que se esta iterando 
                cargarInformacion(cita);
            }
        });
        
    }
}

//Clase que controla las citas
class Citas{
    //Funcion que agrega el objeto citaObjeto al array de citas
    agregarCita(citaObjeto){
        citas.push(citaObjeto);
    }
    //Funcion que elimina un paciente acorde al idCita
    eliminarPaciente(idCita){
        citas = citas.filter((cita) =>{
            return idCita !== cita.idCita;
        })
        //Mandamos a llamar listarCitas
        ui.listarCitas(citas);
    }
    //Funcion que edita una cita 
    editarCita(citaActualizada){
        citas = citas.map(cita => cita.idCita === citaActualizada.idCita ? citaActualizada : cita);
        //Mandamos a llamar listarCitas para mostrar las citas actualizadas
        ui.listarCitas(citas);
    }
}
//Objeto de la clase Citas 
let cita = new Citas();

//Objeto de la clase UI
let ui = new UI();


//Objeto que contiene los valores de la cita. Se van llenando conforme se escriba
let citaObjeto = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: "",
    idCita: Date.now()
}

//Funcion que reseta el objeto citaObjeto
function resetearObjeto(){
    //Reseteamos el objeto
    citaObjeto = {
        mascota: "",
        propietario: "",
        telefono: "",
        fecha: "",
        hora: "",
        sintomas: "",
        idCita: Date.now()
    };
}

//Leemos los datos del input y llamamos a la funcion leerDatos
inputMascota.addEventListener("change", leerDatos);
inputPropietario.addEventListener("change", leerDatos);
inputTelefono.addEventListener("change", leerDatos);
inputFecha.addEventListener("change", leerDatos);
inputHora.addEventListener("change", leerDatos);
inputSintomas.addEventListener("change", leerDatos);
//Evento para el formulario 
formulario.addEventListener("submit", submitCita);

//Funcion que lee los datos de la cita y los va asignando dinamicamente al objeto citaObjeto
function leerDatos(e){
    citaObjeto[e.target.name] = e.target.value;
}

//Funcion que envia el formulario 
function submitCita(e){
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObjeto;

    //Validamos el formulario
    if(mascota.trim() === "" || propietario.trim() === "" || telefono.trim() === "" || fecha.trim() === "" || hora.trim() === "" || sintomas.trim() === ""){
        //Mandamos una alerta con el objeto ui y el metodo mostrarAlerta. Le pasamos el mensaje y tipo
        ui.mostrarAlerta("Todos los campos son obligatorios", "error");
        return;
    }

    if(editando){
        //Si estamos editando, actualizamos la cita existente 
        ui.mostrarAlerta("Cita actualizada");
        cita.editarCita({...citaObjeto});

        editando = false
    }else{
        //Mandamos alerta de correcto 
        ui.mostrarAlerta("Paciente agendado");
        //Llamamos al objeto cita con el metodo agregarCita y le pasamos el objeto de tipo citaObjeto 
        cita.agregarCita(citaObjeto);
    }
    //Llamamos al objeto ui con el metodo listarPacientes y le pasamos el array de citas 
    ui.listarCitas(citas);

    //Llamamos a la funcion que resetea el objeto y tambien reseteamos el formulario 
    formulario.reset(); 
    resetearObjeto();
}

//Funcion que limpia las alertas duplicadas
function limpiarAlertas(){
    alertas.textContent = "";
}

//Funcion que elimina un paciente 
function EliminarPaciente(idCita){
    //Llamamos al objeto cita con el metodo eliminarPaciente y le pasamos el idCita
    cita.eliminarPaciente(idCita);
}

//Funcion que carga la informacion en el formulario 
function cargarInformacion(citaInfo){
    //Hacemos destructuring de cita 
    const {mascota, propietario, telefono, fecha, hora, sintomas, idCita} = citaInfo;
    //Asignamos los valores en el formulario
    inputMascota.value = mascota;
    inputPropietario.value = propietario;
    inputTelefono.value = telefono;
    inputFecha.value = fecha;
    inputHora.value = hora;
    inputSintomas.value = sintomas;

    // Actualizamos el objeto citaObjeto con los valores de la cita a editar
    citaObjeto = {...citaInfo};

    // Establecemos el modo de edición
    editando = true;
}

/*
→ Esta tambien es una forma de ir asigando el valor al objeto, solo que es mas extenso el codigo
inputMascota.addEventListener("change", (e)=>{
    citaObjeto.mascota = e.target.value;
    console.log(citaObjeto);
});
*/






