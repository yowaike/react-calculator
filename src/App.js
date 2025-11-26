import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  // Функция для ввода цифр
  const inputNumber = (num) => {
    if (waitingForSecondValue) {
      setDisplay(String(num));
      setWaitingForSecondValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  // Функция для ввода точки
  const inputDecimal = () => {
    if (waitingForSecondValue) {
      setDisplay('0.');
      setWaitingForSecondValue(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  // Функция для очистки
  const clearDisplay = () => {
    setDisplay('0');
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  };

  // Функции для операций
  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstValue === null) {
      setFirstValue(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstValue(result);
    }

    setWaitingForSecondValue(true);
    setOperator(nextOperator);
  };

  // Выполнение расчета
  const performCalculation = () => {
    const inputValue = parseFloat(display);
    
    switch (operator) {
      case '+':
        return firstValue + inputValue;
      case '-':
        return firstValue - inputValue;
      case '*':
        return firstValue * inputValue;
      case '/':
        return firstValue / inputValue;
      default:
        return inputValue;
    }
  };

  // Функция равно
  const handleEquals = () => {
    if (operator && firstValue !== null) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstValue(null);
      setOperator(null);
      setWaitingForSecondValue(false);
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <h1>Калькулятор</h1>
        
        <div className="display">
          <div className="display-value">{display}</div>
        </div>
        
        <div className="keypad">
          <div className="keypad-row">
            <button className="btn clear" onClick={clearDisplay}>C</button>
            <button className="btn operator" onClick={() => handleOperator('/')}>/</button>
          </div>
          
          <div className="keypad-row">
            <button className="btn number" onClick={() => inputNumber(7)}>7</button>
            <button className="btn number" onClick={() => inputNumber(8)}>8</button>
            <button className="btn number" onClick={() => inputNumber(9)}>9</button>
            <button className="btn operator" onClick={() => handleOperator('*')}>×</button>
          </div>
          
          <div className="keypad-row">
            <button className="btn number" onClick={() => inputNumber(4)}>4</button>
            <button className="btn number" onClick={() => inputNumber(5)}>5</button>
            <button className="btn number" onClick={() => inputNumber(6)}>6</button>
            <button className="btn operator" onClick={() => handleOperator('-')}>-</button>
          </div>
          
          <div className="keypad-row">
            <button className="btn number" onClick={() => inputNumber(1)}>1</button>
            <button className="btn number" onClick={() => inputNumber(2)}>2</button>
            <button className="btn number" onClick={() => inputNumber(3)}>3</button>
            <button className="btn operator" onClick={() => handleOperator('+')}>+</button>
          </div>
          
          <div className="keypad-row">
            <button className="btn number zero" onClick={() => inputNumber(0)}>0</button>
            <button className="btn decimal" onClick={inputDecimal}>.</button>
            <button className="btn equals" onClick={handleEquals}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;