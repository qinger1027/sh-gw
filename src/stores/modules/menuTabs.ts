import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useMenuStore = defineStore('menu',{
    state:()=>{
        return {
            menuItems: [{
                path:'/home',
                fullPath:'',
                query:{},
                name:"工作台"
            }],
            router:useRouter()
        }
    },
    actions:{
        removeMenuItem(val:any){
            // const router = useRouter()
            for (let i = 0; i < this.menuItems.length; i++) {
                const element = this.menuItems[i];
                if(val === element.path && this.menuItems.length>1){
                    try {
                        this.menuItems.splice(i,1);
                        this.router.push({
                            path:this.menuItems[i-1] ? this.menuItems[i-1].path : this.menuItems[i].path
                        })
                    } catch (error) {
                     console.log(error);   
                    }
                }
            }
        }
    }
})