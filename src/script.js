class Calculadora {
    constructor(valorPrevioTextElement, valorActualTextElement) {
        this.valorPrevioTextElement = valorPrevioTextElement;
        this.valorActualTextElement = valorActualTextElement;
        this.borrarTodo();
       
    }

    borrarTodo() {
        this.valorActual = '';
        this.valorPrevio = '';
        this.operacion = undefined;
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0, -1);
    }

    agregarNumero(numero) {
        if (numero === '.' && this.valorActual.includes('.')) return;
        // Limitar la cantidad de dígitos
        if (this.valorActual.length < 10) {
            this.valorActual = this.valorActual.toString() + numero.toString();
        }
    }

    elejirOperacion(operacion) {
        if (this.valorActual === '') return;
        if (this.valorPrevio !== '') {
            this.calcular();
        }
        this.operacion = operacion;
        this.valorPrevio = this.valorActual;
        this.valorActual = '';
    }

    procentaje() {
        // Limitar la cantidad de dígitos
        if (this.valorActual.length > 10) {
            this.valorActual = this.valorActual.slice(0, 10);
        }
        this.valorActual = this.valorActual.toString() / 100;
    }

    calcular() {
        let resultado;
        const valor_1 = parseFloat(this.valorPrevio);
        const valor_2 = parseFloat(this.valorActual);
        if (isNaN(valor_1) || isNaN(valor_2)) return;
        switch (this.operacion) {
            case '+':
                resultado = valor_1 + valor_2;
                break;
            case '-':
                resultado = valor_1 - valor_2;
                break;
            case 'x':
                resultado = valor_1 * valor_2;
                break;
            case '÷':
                resultado = valor_1 / valor_2;
                break;
            default:
                return;
        }
        // Limitar la cantidad 
        this.valorActual = resultado.toString().slice(0, 10);
        this.operacion = undefined;
        this.valorPrevio = '';
    }

    obtenerNumero(numero) {
        const cadena = numero.toString();
        const enteros = parseFloat(cadena.split('.')[0]);
        const decimales = cadena.split('.')[1];
        let mostrarEnteros;
        if (isNaN(enteros)) {
            mostrarEnteros = '';
        } else {
            mostrarEnteros = enteros.toLocaleString('en', { maximumFractionDigits: 0 });
        }

        if (decimales != null) {
            return `${mostrarEnteros}.${decimales}`;
        } else {
            return mostrarEnteros;
        }
    }

    igual() {
        if (this.resultadoAnterior) {
            this.valorPrevio = '';
            this.operacion = undefined;
            this.resultadoAnterior = false;
        }
        this.calcular();
        this.resultadoAnterior = true;
    }

    actualizarPantalla() {
        this.valorActualTextElement.innerText = this.obtenerNumero(this.valorActual);
        if (this.operacion != null) {
            this.valorPrevioTextElement.innerText = `${this.obtenerNumero(this.valorPrevio)} ${this.operacion}`;
        } else {
            this.valorPrevioTextElement.innerText = '';
            if (this.valorPrevio != null) {
                this.valorPrevioTextElement.innerText = this.valorPrevio;
            } else {
                this.valorPrevioTextElement.innerText = '';
            }
        }
    }
}


const numeroButtons = document.querySelectorAll('[data-numero]');
const operacionButtons = document.querySelectorAll('[data-operacion]');
const igualButton = document.querySelector('[data-igual]');
const porcentajeButton = document.querySelector('[data-porcentaje]');
const borrarButton = document.querySelector('[data-borrar]');
const borrarTodoButton = document.querySelector('[data-borrar-todo]');
const valorPrevioTextElement = document.querySelector('[data-valor-previo]');
const valorActualTextElement = document.querySelector('[data-valor-actual]');

const calculator = new Calculadora(valorPrevioTextElement, valorActualTextElement);

numeroButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.agregarNumero(button.innerText);
        calculator.actualizarPantalla();
    });
});

operacionButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.elejirOperacion(button.innerText);
        calculator.actualizarPantalla();
    });
});

igualButton.addEventListener('click', _button => {
    calculator.igual();
    calculator.actualizarPantalla();
});

borrarTodoButton.addEventListener('click', _button => {
    calculator.borrarTodo();
    calculator.actualizarPantalla();
});

borrarButton.addEventListener('click', _button => {
    calculator.borrar();
    calculator.actualizarPantalla();
});

porcentajeButton.addEventListener('click', _button => {
    calculator.igual();
    calculator.procentaje();
    calculator.actualizarPantalla();
});

/*Parcial:
1. Arreglar bug que limite los numeros en pantalla
2. Funcionabilidad de boton de porcentaje
3. Si lo que se presiona despues de igual es un numero entonces que borre el resultado anterior e inicie una nueva operacion
4. Muestre la operacion completa en el display superior
*/