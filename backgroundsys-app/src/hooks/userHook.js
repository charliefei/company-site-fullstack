import { ElMessage } from "element-plus"
import axios from "axios"

export const useUserAdd = (userForm, router) => {
  const submitForm = async (formEl) => {
      if (!formEl) return
      await formEl.validate(async (valid) => {
        if (valid) {
          const formData = new FormData()
          for (const key in userForm) {
              formData.append(key, userForm[key])
          }
          //console.log(userForm);          
          const {data: res} = await axios.post('/admin/user/add',formData,{
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })

          if(res.code === 200){
              router.push('/user-manage/userlist')
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
              message: '添加失败！',
              type: 'error',
          })
        }
      })
  }

  return submitForm
}

// 展示用户列表
export const useGetUserList = () => {
    return async (userList) => {
        const {data: res} = await axios.get('/admin/user/list')
        console.log('用户列表', res); // [{_id,...}]
        userList.value = res.data
    }
}

// 表单内置修改前数据
export const useHandleEdit = (dialogVisible,userForm) => {
    return async (user) => {
        const {data:res} = await axios.get(`/admin/user/list/${user._id}`)
        // console.log(res); 
        for (const key in userForm) {
            userForm[key] = res.data[key]
        }
        console.log(userForm);

        dialogVisible.value = true
    }
}

// 向后端提交修改完的数据
export const useHandleEditConfirm = (getUserList,userList,dialogVisible) => {
    const handleEditConfirm = async (formEl, userForm) => {
        if (!formEl) return
        await formEl.validate(async (valid) => {
          if (valid) {
            const {data: res} = await axios.put(
                `/admin/user/list/${userForm._id}`, 
                userForm
            )
            if(res.code) {
                dialogVisible.value = false
                ElMessage({
                    showClose: true,
                    message: res.msg,
                    type: 'success',
                })
                getUserList(userList)
            }else{
                ElMessage({
                    showClose: true,
                    message: res.msg,
                    type: 'error',
                })
            }
          }
        })
    }

    return handleEditConfirm
}

// 删除某个用户
export const useHandleDelete = (getUserList, userList) => {
    return async (user) => {
        const {data:res} = await axios.delete(`/admin/user/list/${user._id}`)
        console.log(res);

        if(res.code == 200) {
            ElMessage({
                showClose: true,
                message: res.msg,
                type: 'success',
            })
            getUserList(userList)
        }else{
            ElMessage({
                showClose: true,
                message: res.msg,
                type: 'error',
            })
        }
    }
}