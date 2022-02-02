import Vue from 'vue'
import App from './App'

new Vue ({
    /* el: '#app',
    render(createElement){
        return createElement(App)
    } */
    /* Forma diferente de fazer, mais simples porem menos entendivel */
    render: h => h(App)
}).$mount("#app")

//Forma original quando se usar o create app