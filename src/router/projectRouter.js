import { createRouter, createWebHistory } from 'vue-router'
import Objective from '../components/projet/Objective.vue'
import Plus from '../components/projet/Plus.vue'
import Editer from '../components/projet/editer.vue'
import Essai from '../components/projet/essai.vue'
import Dashboard from '../components/projet/dashboard.vue'
import ProjectRouter from '../router/projectRouter.vue'
const routes =  [
        {path: '/', name: 'dashboard', component: Dashboard },
        {
            name: 'projectRouter',
            path: '/projectrouter/:id_projet',
            component: ProjectRouter,
            
            children: [
              {
                path: 'title',
                name: 'objective',
                component: Objective,
                props:true
              },
              { path:'plus',
                name: 'plus',
                component: Plus,
                props:true
              }, 
              { path:'editer',
                name: 'editer',
                component: Editer,
                props:true
              },  
              { path:'essai',
                name: 'essai',
                component:Essai,
                props:true
              },
            ]
          
        },
        
    ]


const router = createRouter({
    history: createWebHistory(),
    routes,
    
})
export default router