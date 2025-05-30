
let personas = [];

function esEmailValido(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}



function limpiarErrores() {
    document.getElementById('msg-error-nombre').textContent = '';
    document.getElementById('msg-error-edad').textContent = '';
    document.getElementById('msg-error-email').textContent = '';
}

function validarFormulario() {
    limpiarErrores();
    let esValido = true;

    const nombre = document.getElementById('input-nombre').value.trim();
    const edad = document.getElementById('input-edad').value;
    const email = document.getElementById('input-email').value.trim();

    if (nombre === '') {
        document.getElementById('msg-error-nombre').textContent = 'Debe ingresar un nombre';
        esValido = false;
    }

    if (edad === '' || edad < 0) {
        document.getElementById('msg-error-edad').textContent = 'Debe ingresar una edad';
        esValido = false;
    }

    if (email === '') {
        document.getElementById('msg-error-email').textContent = 'Debe ingresar un email';
        esValido = false;
    } else if (!esEmailValido(email)) {
        document.getElementById('msg-error-email').textContent = 'Debe ingresar un email válido';
        esValido = false;
    }

    return esValido;
}


function agregarPersona() {
    if (validarFormulario()) {
        const nombre = document.getElementById('input-nombre').value.trim();
        const edad = parseInt(document.getElementById('input-edad').value);
        const email = document.getElementById('input-email').value.trim();

        // Crear objeto persona
        const persona = {
            id: Date.now(), // ID único basado en timestamp
            nombre: nombre,
            edad: edad,
            email: email
        };

        // Agregar al array
        personas.push(persona);

        // Limpiar formulario
        document.getElementById('input-nombre').value = '';
        document.getElementById('input-edad').value = '';
        document.getElementById('input-email').value = '';
        
        // Limpiar mensajes de error
        limpiarErrores();

        // Actualizar lista
        actualizarLista();

        console.log('Persona agregada:', persona);
        console.log('Total personas:', personas.length);
    }
}

// Función para eliminar persona
function eliminarPersona(id) {
    if (confirm('¿Está seguro que desea eliminar esta persona?')) {
        personas = personas.filter(persona => persona.id !== id);
        actualizarLista();
        console.log('Persona eliminada. Total personas:', personas.length);
    }
}

// Función para actualizar la lista
function actualizarLista() {
    const tbody = document.getElementById('lista-nombres');
    
    if (personas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">No hay nombres registrados</td></tr>';
    } else {
        tbody.innerHTML = '';
        personas.forEach(persona => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td><button class="btn-eliminar" onclick="eliminarPersona(${persona.id})">Eliminar</button></td>
                <td>${persona.nombre}</td>
                <td>${persona.edad}</td>
                <td>${persona.email}</td>
            `;
            tbody.appendChild(fila);
        });
    }
}

// Función que se ejecuta al cargar la página
function inicializar() {
    console.log('Aplicación inicializada');
    actualizarLista();
}

// Eventos adicionales para mejorar la experiencia del usuario
document.addEventListener('DOMContentLoaded', function() {
    // Agregar evento Enter en los campos del formulario
    const inputs = ['input-nombre', 'input-edad', 'input-email'];
    
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    agregarPersona();
                }
            });
        }
    });
});