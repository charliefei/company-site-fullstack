import axios from "axios"
import { ElMessage } from 'element-plus'

export const useSubmitForm =  (userForm, store) => {
    const submitForm = async (formEl) => {
        if (!formEl) return
        await formEl.validate(async (valid, fields) => {
          if (valid) {
            const formData = new FormData()
            for (const key in userForm) {
                formData.append(key, userForm[key])
            }
            
            console.log('@@@', userForm);
            console.log('@@@', formData);
            const {data: res} = await axios.post('/admin/user/upload',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if(res.code === 200){
                store.commit('getUserInfo', res.data)
                ElMessage({
                    showClose: true,
                    message: res.msg,
                    type: 'success',
                })
            } else {
                ElMessage({
                    showClose: true,
                    message: res.msg,
                    type: 'error',
                })
            }
          } else {
            //console.log('error submit!', fields)
            ElMessage({
                showClose: true,
                message: '更新失败！',
                type: 'error',
            })
          }
        })
    }

    return submitForm
}