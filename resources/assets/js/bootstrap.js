import Vue from 'vue';
import axios from 'axios';
import jquery from 'jquery';


// VUE
window.Vue = Vue;

// AXIOS
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// JQUERY
try {
    window.$ = window.jQuery = jquery;
} catch (e) { }

