<script setup>
import { ref } from 'vue'
import Alerta from './Alerta.vue'
import cerrarModal from '../assets/img/cerrar.svg'

const error = ref('')
const emit = defineEmits([
    'update:nombre',
    'update:cantidad',
    'update:categoria',
    'ocultar-modal',
    'guardar-gasto',
])

const props = defineProps({
    modal:{
        type: Object,
        required: true
    },
    disponible:{
            type:Number,
            required:true, 
   },
    nombre:{
        type:String,
        required:true
    },
    cantidad:{
        type:[String,Number],
        required:true
    },
    categoria:{
        type:String,
        required:true
    },
    id:{
        type:[String, Number],
        required:true
    },
    fecha:{
        type:String,
        required:true,
    }
})

const old =props.cantidad;

const agregarGasto=()=>{
    const {nombre, cantidad, categoria, disponible, id} = props;
    if([nombre,cantidad,categoria].includes('')){
        error.value='todos los campos son requeridos'
        setTimeout(()=>{
            error.value=''
        },2000)
        return
    }
    //Validar la cantidad
    if(cantidad <= 0){
        error.value='cantidad no válido'
        setTimeout(()=>{
            error.value=''
        },2000)
        return
    }
    //Validar la cantidad
    if(cantidad <= 0){
        error.value='cantidad no válido'
        setTimeout(()=>{
            error.value=''
        },2000)
        return
    }
    //validar que el usuario no gaste de lo disponible
    if(id){
        //tomar en cuenta el gasto ya realizado
        if(cantidad > old + disponible){
            error.value='Saldo insuficiente';
            setTimeout(()=>{
                error.value=''
            },2000)
        }else{
            emit('guardar-gasto');
        }
    }else{
        if(disponible >= cantidad ){
            emit('guardar-gasto');
        }else{
            
            error.value='Saldo insuficiente';
            setTimeout(()=>{
                error.value=''
            },2000)
        }
    }
        

}
const isEditing=computed(()=>{
    return props.id;
})
</script>
<template>
    <div class="modal">
        <div class="cerrar-modal">
            <img 
            :src="cerrarModal" 
            @click="$emit('ocultar-modal')"
            alt=""
            />
        </div>
        <div 
          class="contenedor contenedor-formulario"
          :class="[modal.animar?'animar':'cerrar']"
        >
           <form
             class="nuevo-gasto"
             @submit.prevent="agregarGasto"
            > 
                <legend>
                    {{ isEditing? 'Editar Gasto':'Añadir Gasto' }}
                </legend>
                            
                <Alerta v-if="error">
                  {{ error }}
                </Alerta>
                
                <div class="campo">
                    <label for="nombre">Nombre Gasto:</label>
                    <input 
                      type="text" 
                      name="nombre" 
                      id="nombre"
                      placeholder="Añade el nombre del gasto"
                      :value="nombre"
                      @input="$event => $emit('update:nombre',$event.target.value)"
                      >
                </div>

                <div class="campo">
                    <label for="cantidad">Cantidad:</label>
                    <input 
                      type="text" 
                      name="cantidad" 
                      id="cantidad"
                      placeholder="Añade la cantidad del gasto ejemplo. 399"
                      :value="cantidad"
                      @input="$event => $emit('update:cantidad',+$event.target.value)"
                      >
                </div>

                <div class="campo">
                    <label for="categoria">Categoria:</label>
                    <select
                     id="categoria"
                     :value="categoria"
                     @input="$event => $emit('update:categoria',$event.target.value)"
                    >
                        <option value="">--seleccion--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="transporte">transporte</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input type="submit"
                    :value="[isEditing?'Actualizar Gasto':'Registrar Gasto']"
                    class=""
                    />

           </form>
           <button
                type="button"
                class="btn-eliminar"
                v-if="isEditing"
            >
                Eliminat gasto
            </button>
        </div>
    </div>
</template>

<style scoped>
 .modal{
    position: absolute;
    background-color: rgb(0, 0, 0);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
 }
 .cerrar-modal{
  position: absolute;
  right: 3rem;
  top: 3rem;
 }
 .contenedor-formulario{
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in;
    opacity: 0;
 }
 .contenedor-formulario.animar{
    opacity: 1;
 }
 .contenedor-formulario.cerrar{
    opacity: 0;
 }
 .cerrar-modal img{
    width: 3rem;
    cursor: pointer;
 }
 .nuevo-gasto{
    margin: 10rem auto 0  auto;
    display: grid;
    gap: 2rem;
 }
 .nuevo-gasto legend{
    text-align: center;
    color: var(--blanco);
    font-size: 3rem;
    font-weight: 700;
 }
 .campo{
    display: grid;
    gap: 2rem;
 }
 .nuevo-gasto input,
 .nuevo-gasto select{
    background-color: var(--gris-claro);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
 }
 .nuevo-gasto label{
    color: var(--blanco);
    font-size: 3rem;
 }
 .nuevo-gasto input[type="submit"]{
    background-color: var(--azul);
    color: var(--blanco);
    font-weight: 700;
    cursor:pointer;
 }
 .btn-eliminar{
        border-radius: 1rem;
        border: none;
        padding: 1rem;
        width: 100%;
        background-color: #ef4444;
        font-weight: 700;
        font-size: 2rem;
        color: var(--blanco);
        margin-top: 10rem;
        cursor: pointer;
    }
</style>