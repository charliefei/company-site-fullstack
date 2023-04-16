import { reactive, ref } from "vue";
import { loadFull } from "tsparticles";
import { ElMessage } from 'element-plus'
import axios from 'axios'

export const useParticles = () => {
    const options = reactive({
        background: {
            color: {
                value: '#207f4c'
            }
        },
        fpsLimit: 100,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: 'push'
                },
                onHover: {
                    enable: true,
                    mode: 'repulse'
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 40
                },
                push: {
                    quantity: 4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                }
            }
        },
        particles: {
            color: {
                value: '#c1ceb6'
            },
            links: {
                color: '#c1ceb6',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1
            },
            collisions: {
                enable: true
            },
            move: {
                direction: 'none',
                enable: true,
                outModes: {
                    default: 'bounce'
                },
                random: false,
                speed: 3,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 80
            },
            opacity: {
                value: 0.5
            },
            shape: {
                type: 'circle'
            },
            size: {
                value: { min: 1, max: 5 },
            }
        },
        detectRetina: true
    })

    const particlesInit = async engine => {
        await loadFull(engine);
    };

    return {
        options,
        particlesInit
    }
}

export const useInitForm = () => {
    const loginFormRef = ref()
    // 绑定表单数据的响应式对象
    const loginForm = reactive({
        username: '',
        password: ''
    })
    // 验证表单数据的规则
    const loginRules = reactive({
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
        ]
    })
    // 重置表单
    const resetForm = (formEl) => {
        if (!formEl) return
        formEl.resetFields()
    }

    return {
        loginFormRef,
        loginForm,
        loginRules,
        resetForm
    }
}

export const useSubmitForm = (loginForm, router) => {
    // 提交表单
    const submitForm = (formEl) => {
        if (!formEl) return
        // 1.校验表单
        formEl.validate(async (valid) => {
            if (valid) {
                // 2.拿到表单内容
                console.log("用户登录的用户名和密码", loginForm)
                const {data: res} = await axios({
                    method: 'post',
                    url: 'admin/user/login',
                    data: loginForm
                })

                if (res.code === 200) {
                    // 3. 本地持久化存储token --> axios响应拦截器中
                    // 4. 跳转页面
                    await router.push('/index')
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
                return false
            }
        })
    }

    return {
        submitForm
    }
}

