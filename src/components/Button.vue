<template>
  <button class="button"
    @click="$emit('onClick', label)" 
    :class="{double, triple, operation}">
    <!-- Tambem coloquei para ouvir o click e quando acontecer o evento chamar o onClick 
        o $emit() vai disparar o evento, no caso acima passando label como parametro
    -->
    <!-- Caso a classe CSS tenha o mesmo nome do atributo pode ser escrito dessa maneira, no casso o Vue vai verificar as propriedades do botão e colocar ou não as classes CSS -->
      {{label}}
  </button>
</template>

<script>
export default {
    //Criando as propriedades do botão, 
    //no caso um objeto para poder detalhar melhor as propriedade

    props: {
        label: {},
        operation: {type: Boolean},
        double: {type: Boolean},
        triple: {type: Boolean}
    }
}
</script>

<style>
:root {
    --bg-button: #f0f0f0;
    --border-button: solid 1px #888;
}
.button {
    font-size: 1.4em;
    background-color: var(--bg-button);
    border: none;
    border-right: var(--border-button);
    border-bottom: var(--border-button);
    outline: none;
}
.button:active {
    background-color: #ccc;
}
.button.double {
    grid-column: span 2;
}
.button.triple {
    grid-column: span 3;
}
.button.operation {
    background-color: #fa8231;
    color: #fff;
}
.button.operation:active {
    background-color: #fa8231cc;
}
</style>