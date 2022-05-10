export function validate(input) {
  let errors = {};
  const numberExpresion = /^-?\d*(\.\d+)?$/;
  //   El método search() y test() ejecutan una búsqueda que encaje entre una expresión regular y el objeto desde el que se llama.

  //Name:

  if (!input.name) {
    errors.name = "Debes ingresar un nombre para el Pokemon.";
  } else if (input.name.search(/^[a-zA-Zñáéíóúü]*$/)) {
    //Valido el input con expresion regular.
    errors.name =
      "El nombre no puede contener numeros o caracteres especiales.";
  }
  if (input.name.length > 15) {
    errors.name = "El nombre no puede exceder los 15 caracteres";
  }


  //Hp

  if (input.hp < 1 || input.hp > 999) {
    errors.hp = "El valor de la vida no puede ser menor a 1 ni mayor a 999.";
  } else if (input.hp.search(numberExpresion)) {
    //Valido el input con expresion regular.
    errors.hp = "The entered value must be only a number. Try again!";
  }

  //Attack

  if (input.attack < 1 || input.attack > 999) {
    errors.attack = "Attack power cannot be less than 1 or greater than 999";
  } else if (input.attack.search(numberExpresion)) {
    errors.attack =
      "The entered value must be only a number. Try again!";
  }

  //Defense

  if (input.defense < 1 || input.defense > 999) {
    errors.defense = "Defense cannot be less than 1 or greater than 999";
  } else if (input.defense.search(numberExpresion)) {
    errors.defense =
      "The entered value must be only a number. Try again!";
  }

  //Speed:

  if (input.speed < 1 || input.speed > 999) {
    errors.speed = "Speed ​​cannot be less than 1 or greater than 999";
  } else if (input.speed.search(numberExpresion)) {
    errors.speed =
      "The entered value must be only a number. Try again!";
  }

  //Height

  if (input.height < 1 || input.height > 999) {
    errors.height = "Height cannot be less than 1 or greater than 999";
  } else if (input.height.search(numberExpresion)) {
    //Valido el input con expresion regular.
    errors.height =
      "The entered value must be only a number. Try again!";
  }

  //Weight

  if (input.weight < 1 || input.weight > 999) {
    errors.weight = "Weight cannot be less than 1 or greater than 999";
  } else if (input.weight.search(numberExpresion)) {
    //Valido el input con expresion regular.
    errors.weight =
      "The entered value must be only a number. Try again!";
  }

  //Types

  if (!input.types || input.types === "null") {
    errors.types = "You must select at least one type.";
  } else if (input.types.length > 2) {
    errors.types = "only maximum two types are allowed";
  }

  return errors;
}
