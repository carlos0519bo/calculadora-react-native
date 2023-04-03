import {useState, useRef} from 'react';

enum Operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}

export const useCalculadora = () => {
  const [numero, setNumero] = useState('0');
  const [numeroAnterior, setNumeroAnterior] = useState('0');

  const ultimaOperacion = useRef<Operadores>();

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  };

  const armarNumero = (numTexto: string) => {
    if (numero.includes('.') && numTexto === '.') return;
    if (numero.startsWith('0') || numero.startsWith('-0')) {
      // Punto decimal
      if (numTexto === '.') {
        setNumero(numero + numTexto);
      } else if (numTexto === '0' && numero.includes('.')) {
        setNumero(numero + numTexto);
      } else if (numTexto !== '0' && !numero.includes('.')) {
        setNumero(numTexto);
      } else if (numTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + numTexto);
      }
    } else {
      setNumero(numero + numTexto);
    }
  };

  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const btnDelete = () => {
    let negativo = '';
    let numeroTemp = numero;

    if (numero.includes('-')) {
      negativo = '-';
      numeroTemp = numero.substring(1);
    }

    if (numeroTemp.length > 1) {
      setNumero(negativo + numeroTemp.slice(0, -1));
    } else {
      setNumero('0');
    }
  };

  const cambiarNumPorAnterior = () => {
    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0, -1));
    } else {
      setNumeroAnterior(numero);
    }
    setNumero('0');
  };

  const btnDividir = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.dividir;
  };
  const btnMultiplicar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.multiplicar;
  };
  const btnRestar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.restar;
  };
  const btnSumar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.sumar;
  };

  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    if (numero === '0' && numeroAnterior === '0') return;
    if (numero !== '0' && numeroAnterior === '0') return;
    if (numeroAnterior !== '0' && numero === '0') return;

    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setNumero(`${num1 + num2}`);
        break;
      case Operadores.restar:
        setNumero(`${num2 - num1}`);
        break;
      case Operadores.multiplicar:
        setNumero(`${num1 * num2}`);
        break;
      case Operadores.dividir:
        if (num1 === 0 && num2 === 0) {
          setNumero('Error');
        } else {
          setNumero(`${num2 / num1}`);
        }
        break;
    }
    setNumeroAnterior('0');
  };

  return {
    limpiar,
    armarNumero,
    positivoNegativo,
    btnDelete,
    btnDividir,
    btnMultiplicar,
    btnRestar,
    btnSumar,
    calcular,
    numero,
    numeroAnterior,
  };
};
