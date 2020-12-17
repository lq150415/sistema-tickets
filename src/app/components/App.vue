<template>
   <div class="col-md-6 offset-md-3">
    <div class="card">
        <div class="card-header">
            <h1>Tickets</h1>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center" 
                    v-for="(ticket, index) in tickets"><b>{{ticket.tipo}}</b> {{ticket.fecha}} {{ticket.hora}} <button class="btn btn-danger" @click="deleteTicket( index )"> Atender/Eliminar</button></li>
            </ul>
        </div>
        <div class="card-footer">
            <form @submit.prevent="addTicket">
                <div class="form-group">
                    <select v-model="ticket.tipo"  name="tipo" class="form-control">
                        <option value="Cajas">Cajas</option>
                        <option value="Plataforma">Plataforma</option>
                    </select>
                </div>
                <button class="btn btn-primary btn-block">Registrar ticket</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>

export default {
    
    data(){
        return {
            ticket: {
                tipo: '',
                fecha: '',
                hora: ''
            },
            tickets: []
        }
    },
    created(){
        this.getTicket();
    },
    //Metodos de creacion visualizacion y eliminacion
    methods: {
        addTicket(){
            fetch('tickets',{
                method: 'POST',
                body: JSON.stringify(this.ticket),
                headers:{
                    'Accept': 'application/json',
                    'Content-type':'application/json'
                }
            })
            .then(res => res.json())
            .then(data =>{
                this.getTicket();
            })

            this.ticket.tipo= ''
        },
        getTicket(){
            fetch('tickets')
            .then(res=>res.json())
            .then(data => {
                this.tickets = data;
            })
        },
        deleteTicket(id){
            fetch('tickets/'+id ,{
                method:'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(data => {
                this.getTicket();
            })
        }
    },
}
</script>