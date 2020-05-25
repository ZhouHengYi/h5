import { api } from 'maple-request';

export default {
    feedbackList: api.get('/1.0/user/feedback/list'), // 反馈-我的反馈
    login: api.post('/1.0/user/login'), //登录
}