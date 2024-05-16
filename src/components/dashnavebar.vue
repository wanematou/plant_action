<template>
    <div id="nav">  
      <div id="nav1">
      <router-link to="/" class="text-decoration-none text-white">Plans d'action</router-link>
      </div>
      <div  id="nav2">
      <router-link to="/newprojet" class="text-decoration-none text-white">Nouveau Plan d'Action</router-link>
      </div>
    </div>
  </template>
  
  <style scoped >
        #nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        margin-top: 0;
        padding: 30px;
        background: #050505;
        color:white;
        display: flex;
        align-items: center;
        border-bottom: 5px solid #4e6c71;
        z-index: 2;
        font-size: 15px;
        }
        
        #nav a {
        display: inline-block;
        margin-right: 20px;
        color: white;
        opacity: 0.7;
        transition: 0.2 ease color;
        }
        #nav a.router-link-active,
        #nav a:hover {
        opacity: 1;
        }
        #logo {
        font-weight: bold;
        font-size: 1.5rem;
        opacity: 1 !important;
        }
  
        a {
        text-decoration: none;
        font-weight: bold;
        }
        #nav2{
          margin-left: 890px;
        }
  </style>
  