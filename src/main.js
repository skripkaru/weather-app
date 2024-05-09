import './assets/main.css'
import 'ant-design-vue/dist/reset.css';

import { createApp } from 'vue'
import App from './App.vue'
import { Button, Card, List, Input } from 'ant-design-vue';

const app = createApp(App);
app.use(Button);
app.use(Card);
app.use(List);
app.use(Input);

app.mount('#app')