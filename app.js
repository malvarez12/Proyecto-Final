let listaTareas=[];

const objTarea={
    id: '',
    nombre: ''
}

let editando =false;

const formulario=document.querySelector('#formulario');
const nombreInput=document.querySelector('#nombre');
const btAgregarInput=document.querySelector('#btAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e){
    e.preventDefault();

    if(nombreInput.value===''){
        alert('Debe ingresar tarea');
        return;
    }

    if(editando) {
        editarTarea();
        editando=false;
    } 
     else{
        objTarea.id=Date.now();
        objTarea.nombre=nombreInput.value;

        agregarTarea();
    }
}

function agregarTarea() {
    listaTareas.push({...objTarea});

    mostrarTareas();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objTarea.id = '';
    objTarea.nombre = '';
}

function mostrarTareas(){
    limpiarHTML();

    const divTareas=document.querySelector('.div-tareas');

    listaTareas.forEach( tarea => {
        const{id,nombre}= tarea;

        const parrafo=document.createElement('p');
        parrafo.textContent= `${id} - ${nombre} - `;
        parrafo.dataset.id=id; 

        const editarBtn = document.createElement('button');
        editarBtn.onclick = () => cargarTarea(tarea);
        editarBtn.textContent = 'Editar';
        editarBtn.classList.add('btn', 'btn-editar');
        parrafo.append(editarBtn);

        const eliminarBtn = document.createElement('button');
        eliminarBtn.onclick = () => eliminarTarea(id);
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBtn);

        const hr = document.createElement('hr');

        divTareas.appendChild(parrafo);
        divTareas.appendChild(hr);
    });
}

function cargarTarea(tarea) {
    const {id, nombre} = tarea;

    nombreInput.value = nombre;

    objTarea.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarTarea() {

    objTarea.nombre = nombreInput.value;

    listaTareas.map(tarea => {

        if(tarea.id === objTarea.id) {
            tarea.id = objTarea.id;
            tarea.nombre = objTarea.nombre;
        }
    });

    limpiarHTML();
    mostrarTareas();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando= false;
    
}

function eliminarTarea(id) {
    listaTareas = listaTareas.filter(tarea => tarea.id !== id);

    limpiarHTML();
    mostrarTareas();
}

function limpiarHTML() {
    const divTareas=document.querySelector('.div-tareas');
    while(divTareas.firstChild) {
        divTareas.removeChild(divTareas.firstChild);
    }
}
