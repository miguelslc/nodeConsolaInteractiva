const inquirer = require("inquirer");
require('colors');

const {preguntas} = require('./preguntas');

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [...preguntas]
    }
];
const inquirerMenu = async() => {
    console.clear();

    console.log('========================='.green);
    console.log('  Seleccione una opción'.white);
    console.log('========================='.green);

    const {opcion} = await inquirer.prompt(questions);
    return opcion;
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.green} para continuar \n`
        }
    ];
    //console.log('\n');
    await inquirer.prompt(question)
}

const readInput = async(message) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor, ingrese un valor'
                }
                return true;
            }
        }
    ]
    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas =[]) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i +1}`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })
    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(questions);
    return id;
}

const confirmarEliminar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async(tareas =[]) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i +1}`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn ) ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    inquirerMenu, 
    pausa,
    readInput,
    listadoTareasBorrar,
    confirmarEliminar,
    mostrarListadoChecklist
}