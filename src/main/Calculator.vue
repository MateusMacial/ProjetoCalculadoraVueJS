<template>
  <div class="calculator">
      <Display :value="displayValue" />
      <!-- Passar o valor da label e a classe CSS para o componente -->
      <Button :label="'AC'" triple @onClick="clearMemory"/> <!-- Por ser um componente filho temos que
                                                                            fazer ele chamar um evento que vai chamar a função         -->
      <Button :label="'/'" operation @onClick="setOperation"/>
      <Button :label="7" @onClick="addDigit"/>
      <Button :label="8" @onClick="addDigit"/>
      <Button :label="9" @onClick="addDigit"/>
      <Button :label="'*'" operation @onClick="setOperation"/>
      <Button :label="4" @onClick="addDigit"/>
      <Button :label="5" @onClick="addDigit"/>
      <Button :label="6" @onClick="addDigit"/>
      <Button :label="'-'" operation @onClick="setOperation"/>
      <Button :label="1" @onClick="addDigit"/>
      <Button :label="2" @onClick="addDigit"/>
      <Button :label="3" @onClick="addDigit"/>
      <Button :label="'+'" operation @onClick="setOperation"/>
      <Button :label="0" double @onClick="addDigit"/>
      <Button :label="'.'" @onClick="addDigit"/>
      <Button :label="'='" operation @onClick="setOperation"/>
  </div>
</template>

<script>
// Importar os componentes
import Display from "../components/Display.vue"
import Button from "../components/Button.vue"

export default {
    //O data de um componente é uma função que recebe os dados da instancia do componente
    data() {
        return {
            displayValue: "0",
            clearDisplay: false,
            operation: null,
            values: [0, 0],
            current: 0

        }
    },
    //Referenciar os componentes dentro do componente pai
    components: {Display, Button},
    methods: {
        //Criar os metodos aki
        clearMemory(){
            Object.assign(this.$data, this.$options.data())// o assing serve para setar um estado, o primeiro parametro é onde vai ser setado e o segundo é o estado(que no caso é o estado inicial de data)
        },
        setOperation(operation){
            if (this.current === 0) {
                this.operation = operation
                this.current = 1
                this.clearDisplay = true
            } else {
                const equals = operation === "="
                const currentOperation = this.operation
                try {
                    this.values[0] = eval(
                        `${this.values[0]} ${currentOperation} ${this.values[1]}`
                    )
                } catch (e) {
                    this.$emit('onError', e)
                }
                this.values[1] = 0
                this.displayValue = this.values[0]
                this.operation = equals ? null : operation
                this.current = equals ? 0 : 1
                this.clearDisplay = !equals
            }
        },
        addDigit(n){
            if (n === "." && this.displayValue.includes(".")) {
                return
            }
            const clearDisplay = this.displayValue === "0"
                || this.clearDisplay
            const currentValue = clearDisplay ? "" : this.displayValue
            const displayValue = currentValue + n
            this.displayValue = displayValue
            this.clearDisplay = false
            
            // Alternativa 1
            this.values[this.current] = displayValue
            
            // Alternativa 2
            // if (n !== ".") {
            //     const i = this.current
            //     const newValue = parseFloat(displayValue)
            //     this.values[i] = newValue
            // }
        }
    }
}
</script>

<style>
.calculator{
    height: 320px;
    width: 235px;
    border-radius: 5px;
    overflow: hidden;

    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: 1fr repeat(5, 48px);
}
</style>