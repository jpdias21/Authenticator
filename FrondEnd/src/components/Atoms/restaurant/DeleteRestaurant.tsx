import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SidebarMenu from '../SideBar'
import { PulseLoader } from 'react-spinners'

function DeleteRestaurant() {
    const [loading, SetLoading] = useState<boolean | null>(null)
    
    const [mensagem, SetMensagem] = useState<boolean | null>(null)

    useEffect(() => {
         async function restaurant () {
            SetLoading(true)
            const token = localStorage.getItem('token')
            console.log(token)
            
            if(token){
             try {
              const response = await axios.get('http://localhost:3000/readRestaurant', {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            response.data.read
            SetLoading(false)
             } catch (error) {
              
             }
        }


         }
         restaurant()

    }, [])

    const deleteRestaurant =async () => {
        SetLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await axios.delete(`http://localhost:3000/deleteRestaurant`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            if(response.status === 200){
                SetMensagem(response.data.mensagem)
            }
            if(response.status === 404){
                SetMensagem(response.data.mensagem)
            }
            SetLoading(false)
        } catch (error : any) {
            if(error.response && error.response.status === 500){
                SetMensagem(error.response.data.mensagem)
            }
        }
    }

  return (
    <>
    <SidebarMenu/>
        {loading ? <PulseLoader color="#1732e0ff" size={25} /> : <>
        <br />
        <p style={{color : 'red'}}>Tem certeza que voce deseja apagar o seu restaurante</p>
        <br />
        <button onClick={deleteRestaurant}>Deletar restaurante</button>
        <br />
        <br /></>}
        {mensagem && <h4 style={{color :'red'}}>{mensagem}</h4>}
    </>
  )
}

export default DeleteRestaurant