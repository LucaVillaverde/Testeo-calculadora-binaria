import chalk from "chalk";
import readline from "readline";
import keypress from 'keypress';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Configuración de keypress para capturar eventos
keypress(process.stdin);

// Cuando se presione una tecla, la función se activará
process.stdin.on('keypress', (ch, key) => {
    if (key && key.name === 'escape') {
        menu();
    }
    if (key && key.name === 'q') {
        process.exit(1);
    }
});


function menu() {
    console.clear();
    console.log(chalk.cyan.bgBlack("\n--- Ingrese 1 si desea pasar de binario a decimal ---\n"));
    console.log(chalk.cyan.bgBlack("\n--- Ingrese 2 si desea pasar de decimal a binario ---\n"));
    rl.question("\nDigite la opcion: ", (input) => {
        const opcion = parseInt(input.trim());
        switch (opcion) {
            case 1:
                binario();
                break;
            case 2:
                decimal();
                break;
            default:
                console.clear()
                console.log(chalk.red("\n--- Opcion no valida ---\n"));
                console.log(chalk.cyan.bgBlack("\n--- seleccione 1 o 2 en el menu... ---\n"));
                setTimeout(menu, 2500);
                break;
        }
    })
}



function binario() {
    console.clear();
    rl.question(chalk.cyan.bgBlack("ingrese el valor en binario : "), (numero) => {
        console.clear;
        const nBinario = (numero);
        if (!numero.match(/^[01]+$/)) {
            console.log(chalk.red("\n--- El valor ingresado no es valido, binario es solo 0 y 1 ---\n"));
            setTimeout(menu, 2500);
            return;
        }
        const nDecimal = parseInt(nBinario, 2);
        console.log(chalk.cyan.bgBlack(`\n-- El valor en binario: ` + chalk.greenBright(nBinario) + ` --\n`));
        console.log(chalk.cyan.bgBlack(`\n-- El valor en decimal: ` + chalk.greenBright(nDecimal) + ` --\n`));
        console.log(chalk.cyan.bgBlack("\n--- Presione escape para volver al menu principal ---\n"));
    })
}

function decimal() {
    console.clear();
    rl.question("Ingrese el valor en decimal (numero entero) : ", (numero) => {
        console.clear();
        if (isNaN(numero) || !typeof numero === "number") {
            console.log(chalk.red("\n--- El valor ingresado no es un numero ---\n"));
            setTimeout(menu, 2500);
            return;
        }
        if (!Number.isInteger(numero)) {
            console.log(chalk.red("\n--- El valor ingresado no es un numero entero ---\n"));
            setTimeout(menu, 2500);
            return;
        }
        const nDecimal = (numero, 10); // Ensure it's a valid number
        const nBinario = nDecimal.toString(2); // Convert to binary string
        console.log(chalk.cyan.bgBlack(`\n-- El valor en decimal: `+ chalk.greenBright(nDecimal) + ` --\n`));
        console.log(chalk.cyan.bgBlack(`\n-- El valor en binario: ` + chalk.greenBright(nBinario) + ` --\n`));
        console.log(chalk.cyan.bgBlack("\n--- Presione escape para volver al menu principal ---\n"));
    });
}

menu();