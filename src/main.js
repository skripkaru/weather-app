import './assets/main.css'
import 'ant-design-vue/dist/reset.css';

import { createApp } from 'vue'
import App from './App.vue'
import { Typography, Layout, Form, Button, Card, List, Input, Skeleton } from 'ant-design-vue';

const app = createApp(App);
app.use(Typography);
app.use(Layout);
app.use(Form);
app.use(Button);
app.use(Card);
app.use(List);
app.use(Input);
app.use(Skeleton);

app.mount('#app')