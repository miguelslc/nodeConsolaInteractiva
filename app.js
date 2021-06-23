require('colors');

const {saveData, readData} = require('./helpers/dataSave');
const {
    inquirerMenu, 
    pausa, 
    readInput, 
    listadoTareasBorrar, 
    confirmarEliminar, 
    mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    //Traemos las tareas preexistentes
    const tareaDB = readData();
    //si hay tareas las cargamos
    if (tareaDB) {
        tareas.cargarTareasFromArr(tareaDB);
    }
    do {
        opt = await inquirerMenu();
        //console.log({opt})

        switch (opt) {
            //Crea Tarea
            case '1':
                const desc = await readInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            //Lista Tareas
            case '2':
                tareas.listadoCompleto();
                break;
            //Lista tareas Completas
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            //Lista tareas Pendiente                
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            //Completa las Tareas
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            //Borra una Tarea
            case '6':
                const id = await listadoTareasBorrar (tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmarEliminar('¿Está seguro que desa eliminar?');
                    if ( ok ) {
                        tareas.borrarTareas(id);
                        console.log('Tarea Borrada exitosamente');
                    }
                }
                break;
        }
        
        saveData(tareas.listadoArr);

        await pausa();
    } while(opt !== '0');
}

main();
