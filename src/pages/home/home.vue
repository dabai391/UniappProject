<template>
 <CustomNavbar/>
</template>
<script setup>
import useUserStore  from "@/store/index.js"
import CustomNavbar from "./components/CustomNavbar.vue";
import {http } from "@/util/http.js"
const userStore = useUserStore();

</script>
<style scoped >

</style>