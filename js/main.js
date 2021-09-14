Vue.config.devtools = true;

const app =new Vue({
    el: '#root',
    data: {
        message:"",
        counter:0,
        save:[],
        filter:"",
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received',
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ]
    },
    mounted(){
        for (let i = 0; i <this.contacts.length;i++){
            this.save.push(i)
            document.getElementsByClassName("arrow")[i].addEventListener("click",(event)=>{
                if(event.path[0].nextElementSibling.classList.value.includes("displayNone")){
                    event.path[0].nextElementSibling.classList.replace("displayNone","displayBlock")
                }
                else if(event.path[0].nextElementSibling.classList.value.includes("displayBlock")){
                    event.path[0].nextElementSibling.classList.replace("displayBlock","displayNone")
                }
            });
        }
    },
    methods: {
       changeChat(index){
            this.counter=index;
       },
       sentmessage(){
           let today = new Date();
           this.contacts[this.counter].messages.push({message:this.message,status: 'sent',date:today.getDate()+"/"+today.getMonth()+"/"+ today.getFullYear()+" "+today.getHours()+":"+ today.getMinutes()+":"+ today.getSeconds()});
           this.message="";
           this.autoReply();
       },
       autoReply(){
           setTimeout(()=>{
                let today = new Date();
                this.contacts[this.counter].messages.push({message:"ok",status: 'received',date:today.getDate()+"/"+today.getMonth()+"/"+ today.getFullYear()+" "+today.getHours()+":"+ today.getMinutes()+":"+ today.getSeconds()});
           },1000);
       },
       filterlist(){
           this.save=[];
           this.contacts.forEach((contatto,index)=>{
               let f = this.filter.toLowerCase();
               console.log(f)
               if(f.replace(/\s+/g, '') =="" || f.replace(/\s+/g, '') ==''){
                   return this.save.push(index);
               }
               else{
                   let c = contatto.name.toLowerCase();
                   if(c.includes(f)){
                       return this.save.push(index)
                   }
               }
            });  
       },
       deleteMessage(index) {
           this.contacts[this.counter].messages[index].message="hai cancellato il messagio";
       },
    }
})
