Vue.config.devtools = true;

const app =new Vue({
    el: '#root',
    data: {
        message:"",
        counter:0,
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
                    status: 'received',
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
    methods: {
       changeChat(index){
            this.counter=index;
            this.scrollToEnd()
       },
       sentmessage(){
           if(this.message.trim()!=""){
               this.contacts[this.counter].messages.push({message:this.message,status: 'sent',date:dayjs().format('DD/M/YYYY HH:mm:ss')});
               this.message="";
               this.scrollToEnd();
               this.autoReply();
           }
       },
       autoReply(){
           let c=this.counter
           let response=this.AIsend();
           setTimeout(()=>{
                this.contacts[c].messages.push({message:response,status: 'received',date:dayjs().format('DD/M/YYYY HH:mm:ss')});
                this.scrollToEnd();
            },1000);
       },
       filterlist(){
           this.save=[];
           this.contacts.forEach((contatto)=>{
               let f = this.filter.toLowerCase();
               console.log(f)
                let c = contatto.name.toLowerCase();
                if(c.includes(f.trim()) || f.trim()==""){
                    contatto.visible=true;
                }
                else{
                    contatto.visible=false;
                }
            });  
       },
       deleteMessage(index) {
           this.contacts[this.counter].messages[index].message="hai cancellato il messagio";
       },
       onArrowClick(message, e) {
            this.$set(message, 'showPopup', true);
            e.currentTarget.focus();
        },
        obtainTime(dateString) {
            let hour=dateString.split(' ')[1].split(":")[0];
            let minute=dateString.split(' ')[1].split(":")[1];
            return hour+":"+minute;
        },
        onFocusLost(message) {
            this.$set(message, 'showPopup', false);
        },
        onPopupClick(message) {
            message.showPopup = false;
        },
        scrollToEnd() {    	
            this.$nextTick(() => {
                const elementHtml = document.getElementById("message");
                elementHtml.scrollTop = elementHtml.scrollHeight;
            });
        },
        AIsend(){
            const answers=[
                "ok",
                "sure",
                "bho",
                "nein",
                "yes",
                "no",
                "Spatariu Hambareanu Rares constantin"
            ];
            return answers[this.random(0, answers.length)]
        },
        random(min,max){
            return Math.floor(Math.random()*(max-min)+min)
        }
    }
})
