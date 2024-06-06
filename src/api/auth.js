import request from '@/utils/request'

export const userRegisterService = ({ email, password, repassword }) =>
  request.post('/api/register', { email, password, repassword })

export const userLoginService = ({ email, password }) =>
  request.post('/api/login', { email, password })
