import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../theme/appTheme';
import {BotonCalc} from '../components/BotonCalc';
import {useCalculadora} from '../hooks/useCalculadora';

const colores = {
  gris: '#9B9B9B',
  naranja: '#FF9427',
};

export const CalculadoraScreen = () => {
  const {
    armarNumero,
    btnDelete,
    btnDividir,
    btnMultiplicar,
    btnRestar,
    btnSumar,
    calcular,
    limpiar,
    numero,
    numeroAnterior,
    positivoNegativo,
  } = useCalculadora();

  return (
    <View style={styles.calculadoraContainer}>
      <Text style={styles.resultadoPequeno}>
        {numeroAnterior === '0' ? '' : numeroAnterior}
      </Text>
      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
        {numero}
      </Text>

      <View style={styles.fila}>
        <BotonCalc texto="C" color={colores.gris} action={limpiar} />
        <BotonCalc texto="+/-" color={colores.gris} action={positivoNegativo} />
        <BotonCalc texto="del" color={colores.gris} action={btnDelete} />
        <BotonCalc texto="/ " color={colores.naranja} action={btnDividir} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="7" action={armarNumero} />
        <BotonCalc texto="8" action={armarNumero} />
        <BotonCalc texto="9" action={armarNumero} />
        <BotonCalc texto="x" color={colores.naranja} action={btnMultiplicar} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="4" action={armarNumero} />
        <BotonCalc texto="5" action={armarNumero} />
        <BotonCalc texto="6" action={armarNumero} />
        <BotonCalc texto="-" color={colores.naranja} action={btnRestar} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="1" action={armarNumero} />
        <BotonCalc texto="2" action={armarNumero} />
        <BotonCalc texto="3" action={armarNumero} />
        <BotonCalc texto="+" color={colores.naranja} action={btnSumar} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="0" ancho action={armarNumero} />
        <BotonCalc texto="." action={armarNumero} />
        <BotonCalc texto="=" color={colores.naranja} action={calcular} />
      </View>
    </View>
  );
};
