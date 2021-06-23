require('colors');

const mostrarMenu = () => {
    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción'.green);
    console.log('========================='.green);

    console.log(`${'1.'.green} Crear Tarea`);
    console.log(`${'2.'.green} Listar Tareas`);
    console.log(`${'3.'.green} Listar Tareas Completadas`);
    console.log(`${'4.'.green} Listar Tareas Pendientes`);
    console.log(`${'5.'.green} Completar Tarea(s)`);
    console.log(`${'6.'.green} Borrar Tarea`);
    console.log(`${'0.'.green} Crear Tarea \n`);

    const readLine = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readLine.question('Seleccione una Opción: ', (option)=>{
        readLine.close();
    });
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.green} para continuar \n`
        }
    ]
    await inquirer.prompt()

    readLine.question(`\nPresione ${'ENTER'.green} para continuar \n`, (option)=>{
        readLine.close();
    });
}

module.exports = { 
    mostrarMenu, 
    pausa 
};